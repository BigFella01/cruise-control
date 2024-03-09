import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { SiVisa } from "react-icons/si";
import { SiMastercard } from "react-icons/si";
import { SiAmericanexpress } from "react-icons/si";
import { SiJcb } from "react-icons/si";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getUserFullName,
  getUserPhoneNumber,
  resetUserState,
} from "../slices/userSlice";
import {
  getBeachBikes,
  getBikesInCart,
  getElectricBikes,
  getRoadBikes,
  resetBookingState,
  getIsDaily,
  getTotalPrice,
  getHourlyBookingInfo,
  getDailyBookingInfo,
} from "../slices/bookingSlice";
import { formatCurrency, formatDateRange } from "../utilities/helpers";
import { createBooking } from "../services/apiBookings";
import styled from "styled-components";

import Form from "./Form";
import Label from "./Label";
import FlexContainer from "./FlexContainer";
import { FormRow, FormRowSplit } from "./FormRow";
import Input from "./Input";
import FormError from "./FormError";
import Button from "./Button";
import { Title } from "./Title";
import ConfirmationBike from "./ConfirmationInfoBike";

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
  > * {
    font-size: 3rem;
    color: var(--color-cyan-800);
  }
`;

const ConfirmationInfoContainer = styled.div`
  padding: 1rem;
  margin: 4rem auto;
  width: 100%;
  border-radius: 10px;
  background-color: var(--color-grey-100);

  display: grid;
  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ConfirmationBikePreviewContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

const LeftSide = styled.div`
  padding: 1rem;
`;
const RightSide = styled.div`
  padding: 1rem;
`;

const EmptyCart = styled.div`
  display: flex;
  gap: 2rem;
`;

const OrderSummaryDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoPiece = styled.p`
  font-size: small;
  color: var(--color-cyan-800);
  margin: ${(props) => props.margin};
`;

function Payment() {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const [cardNum, setCardNum] = useState("");

  const { orderId } = useParams();
  const fullName = useSelector(getUserFullName);
  const phoneNumber = useSelector(getUserPhoneNumber);

  const beachBikes = useSelector(getBeachBikes);
  const roadBikes = useSelector(getRoadBikes);
  const electricBikes = useSelector(getElectricBikes);
  const userFullName = useSelector(getUserFullName);
  const bikesInCart = useSelector(getBikesInCart);
  const totalPrice = useSelector(getTotalPrice);
  const isDaily = useSelector(getIsDaily);
  const hourlyBookingInfo = useSelector(getHourlyBookingInfo);
  const dailyBookingInfo = useSelector(getDailyBookingInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (newBooking) => createBooking(newBooking),
    onSuccess: () => {
      toast.success("New booking successfully created");
      queryClient.invalidateQueries({ queryKey: ["bikes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  function onFormSubmit() {
    const newBooking = {
      idNative: orderId,
      fullName: fullName,
      phoneNumber: Number(phoneNumber),
      numBeachBikes: beachBikes.length,
      numRoadBikes: roadBikes.length,
      numElectricBikes: electricBikes.length,
      isDaily,
      hourlyBookingDate: hourlyBookingInfo.date,
      hourStart: hourlyBookingInfo.hourStart,
      hourEnd: hourlyBookingInfo.hourEnd,
      numHours: hourlyBookingInfo.numHours,
      dateStart: dailyBookingInfo.dateStart,
      dateEnd: dailyBookingInfo.dateEnd,
      numDays: dailyBookingInfo.numDays,
      totalPrice,
      paymentLastFour: cardNum.substring(cardNum.length - 4),
    };
    // console.log(newBooking);
    mutate(newBooking);
    navigate(`/book/confirmation/${orderId}`);
    dispatch(resetBookingState());
    dispatch(resetUserState());
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <FormRow>
          <FlexContainer justifycontent="space-between">
            <Label>Card number</Label>
            <IconContainer>
              <SiVisa />
              <SiMastercard />
              <SiJcb />
              <SiAmericanexpress />
            </IconContainer>
          </FlexContainer>
          <Input
            width="100%"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            {...register("cardNumber", {
              required: "Card number must be entered",
              onChange: (e) => setCardNum(e.target.value),
            })}
          />
          {errors?.cardNumber && (
            <FormError>{errors.cardNumber.message}</FormError>
          )}
        </FormRow>
        <FormRow>
          <Label>Name on card</Label>
          <Input
            width="100%"
            name="cardName"
            placeholder="Ex. Dwayne Johnson"
            {...register("cardName", {
              required: "Name on card must be entered",
            })}
          />
          {errors?.cardName && <FormError>{errors.cardName.message}</FormError>}
        </FormRow>
        <FormRowSplit>
          <div>
            <Label>Expiry date</Label>
            <Input
              width="100%"
              name="expiryDate"
              placeholder="11/27"
              {...register("expiryDate", {
                required: "Card expiry date must be entered",
              })}
            />
            {errors?.expiryDate && (
              <FormError>{errors.expiryDate.message}</FormError>
            )}
          </div>
          <div>
            <Label>Security code</Label>
            <Input
              width="100%"
              name="securityCode"
              placeholder="Ex. 112"
              type="password"
              {...register("securityCode", {
                required: "Security code must be entered",
              })}
            />
            {errors?.securityCode && (
              <FormError>{errors.securityCode.message}</FormError>
            )}
          </div>
        </FormRowSplit>
        <Title margin="3rem 0 0 4rem">{`${
          userFullName.split(" ")[0]
        }'s Cart`}</Title>
        <ConfirmationInfoContainer>
          {bikesInCart.length > 0 ? (
            <>
              <LeftSide>
                <ConfirmationBikePreviewContainer>
                  {bikesInCart.map((bike) => {
                    return (
                      <ConfirmationBike
                        bike={bike}
                        key={bike.category}
                        each={true}
                        counter={true}
                        total={true}
                      />
                    );
                  })}
                </ConfirmationBikePreviewContainer>
              </LeftSide>
              <RightSide>
                <Title margin="0 0 2rem 0">Order summary</Title>
                <FlexContainer flexdirection="column" gap="1rem">
                  {bikesInCart.map((bike) => {
                    return (
                      <OrderSummaryDiv>
                        <InfoPiece>
                          {bike.quantity}X {bike.model}
                        </InfoPiece>
                        <InfoPiece>{formatCurrency(bike.totalPrice)}</InfoPiece>
                      </OrderSummaryDiv>
                    );
                  })}

                  <InfoPiece margin="3rem 0 0 0">
                    Rental period:{" "}
                    {isDaily
                      ? `${dailyBookingInfo?.dateStart} - ${dailyBookingInfo?.dateEnd}`
                      : `${hourlyBookingInfo?.date} from ${hourlyBookingInfo.hourStart} - ${hourlyBookingInfo.hourEnd}`}{" "}
                    (
                    {isDaily
                      ? `${dailyBookingInfo?.numDays} days`
                      : `${hourlyBookingInfo?.numHours} hours`}
                    )
                  </InfoPiece>
                </FlexContainer>
                <OrderSummaryDiv>
                  <Title fontSize="1.5rem" margin="2rem 0 0 0">
                    Total price:
                  </Title>
                  <InfoPiece margin="2rem 0 0 0">
                    {formatCurrency(totalPrice)}
                  </InfoPiece>
                </OrderSummaryDiv>
                <Button margin="5rem 0 0 auto">
                  Pay {formatCurrency(totalPrice)} now
                </Button>
              </RightSide>
            </>
          ) : (
            <EmptyCart>
              <Button size="small" onClick={() => navigate(-1)}>
                Go back
              </Button>
              <p>Your cart is empty. Start adding some bikes!</p>
            </EmptyCart>
          )}
        </ConfirmationInfoContainer>
      </Form>
    </>
  );
}

export default Payment;

// Information needed: rental period, total price
