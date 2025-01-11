import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import Counter from "./Counter";
import FormError from "./FormError";
import Form from "./Form";
import { FormRow } from "./FormRow";
import Input from "./Input";
import Label from "./Label";
import Image from "./Image";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBikes } from "../services/apiBikes";
import FlexContainer from "./FlexContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  addBike,
  decreaseItemQuantity,
  getBeachBikes,
  getElectricBikes,
  getRoadBikes,
  increaseItemQuantity,
  setBookingId,
  getNumBikesInCart,
  getIsDaily,
  setIsDaily,
  setHourlyBookingInfo,
  setDailyBookingInfo,
  getBookingState,
  getHourlyBookingInfo,
  getDailyBookingInfo,
} from "../slices/bookingSlice";
import { getUserState } from "../slices/userSlice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { setFullName, setPhoneNumber } from "../slices/userSlice";
import { useState } from "react";
import { daysBetweenDates, hoursBetweenTimes } from "../utilities/helpers";
import toast from "react-hot-toast";

const StyledFormRowBike = styled(FormRow)`
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;
  background-color: var(--color-grey-0);
  border-radius: 15px;
  margin-top: 1rem;

  @media (min-width: 500px) {
    grid-template-columns: 40% 30% 30%;
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: center;
  }
`;

const BikeInfo = styled.div`
  overflow-y: scroll;
  background: var(--color-grey-100);
  padding: 1.5rem;
  font-size: clamp(1rem, 1.5rem, 2rem);
  color: var(--color-cyan-900);
`;

const BikeInfoLabel = styled.span`
  font-weight: bold;
`;

const RightSideInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (min-width: 500px) {
    display: block;
  }
`;

function BookBikesForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let currentDate = new Date();

  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");
  const [hourlyBookingDate, setHourlyBookingDate] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const bookingState = useSelector(getBookingState);
  const userState = useSelector(getUserState);
  const numBikesInCart = useSelector(getNumBikesInCart);
  const isDaily = useSelector(getIsDaily);
  const beachBikes = useSelector(getBeachBikes);
  const roadBikes = useSelector(getRoadBikes);
  const electricBikes = useSelector(getElectricBikes);
  const hourlyBookingInfo = useSelector(getHourlyBookingInfo);
  const dailyBookingInfo = useSelector(getDailyBookingInfo);

  const { data: bikes } = useQuery({
    queryKey: ["bikes"],
    queryFn: getBikes,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function checkAvailability(bikeCategory) {
    const numAvailableBikes = bikes
      ?.filter((bike) => bike.category === bikeCategory)
      .filter((bike) => bike.status === "available").length;

    return numAvailableBikes;
  }

  const bikeObjects = {
    beach: {
      category: "beach",
      model: "Chatham Beach Cruiser Bike",
      image: "/beach-bike.jpeg",
      quantity: 1,
      hourlyRate: 5,
      dailyRate: 20,
      totalPrice: 5,
    },
    road: {
      category: "road",
      model: "Polygon Strattos S5 Road",
      image: "/road-bike.webp",
      quantity: 1,
      hourlyRate: 7,
      dailyRate: 28,
      totalPrice: 7,
    },
    electric: {
      category: "electric",
      model: "Spirit Electric Road Bike",
      image: "/electric-bike.webp",
      quantity: 1,
      hourlyRate: 10,
      dailyRate: 40,
      totalPrice: 10,
    },
  };

  function onFormSubmit(data) {
    const numHours =
      hourlyBookingInfo?.numHours || hoursBetweenTimes(hourStart, hourEnd);
    const numDays =
      dailyBookingInfo?.numDays ||
      daysBetweenDates(new Date(dateStart), new Date(dateEnd));
    if (!isDaily && numHours > 6) {
      toast.error("Bikes can be rented for a maximum of six hours");
      return;
    }

    if (!isDaily && (!numHours || numHours < 0 || isNaN(numHours))) {
      toast.error("Bikes must be rented for at least one hour");
      return;
    }

    if (isDaily && numDays > 6) {
      toast.error("Bikes can be rented for a maximum of six days");
      return;
    }

    if (isDaily && (!numDays || numDays < 0 || isNaN(numDays))) {
      toast.error("Bikes must be rented for at least one day");
      return;
    }
    dispatch(
      setHourlyBookingInfo({
        date: hourlyBookingDate,
        hourStart,
        hourEnd,
        numHours,
      })
    );
    dispatch(
      setDailyBookingInfo({
        dateStart,
        dateEnd,
        numDays,
      })
    );
    const orderId = Math.floor(Math.random() * 1000);
    dispatch(setBookingId(orderId));
    navigate(`/book/payment/${orderId}`);
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormRow>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          type="text"
          name="fullName"
          id="fullName"
          autoComplete="off"
          defaultValue={userState.fullName}
          {...register("fullName", {
            required: "Name is required",
            onChange: (e) => dispatch(setFullName(e.target.value)),
          })}
        ></Input>
        {errors?.fullName && <FormError>{errors.fullName.message}</FormError>}
      </FormRow>
      <FormRow>
        <Label htmlFor="phoneNumber">Phone number</Label>
        <Input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          autoComplete="off"
          defaultValue={userState.phoneNumber}
          {...register("phoneNumber", {
            required: "Phone number is required",
            onChange: (e) => dispatch(setPhoneNumber(e.target.value)),
          })}
        ></Input>
        {errors?.fullName && (
          <FormError>{errors.phoneNumber.message}</FormError>
        )}
      </FormRow>
      <Label>Beach Bike</Label>
      <StyledFormRowBike>
        <Image
          src="/beach-bike.jpeg"
          alt="beach bike"
          borderradius="10px"
        ></Image>
        <BikeInfo>
          <p>
            <BikeInfoLabel>Model:</BikeInfoLabel> Chatham Beach Cruiser Bike
          </p>
          <p>
            <BikeInfoLabel>Best for:</BikeInfoLabel> Cruising alongside a beach
            or boardwalk
          </p>
          <p>
            <BikeInfoLabel>Price:</BikeInfoLabel> $5.00 hourly | $20.00 daily
          </p>
        </BikeInfo>
        <RightSideInfo>
          <FlexContainer>
            {beachBikes[0]?.quantity > 0 ? (
              <Counter>
                <Button
                  size="small"
                  variation="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(decreaseItemQuantity("beach"));
                  }}
                >
                  <FaAngleLeft />
                </Button>
                <span>{beachBikes[0]?.quantity}</span>
                <Button
                  size="small"
                  variation="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(increaseItemQuantity("beach"));
                  }}
                >
                  <FaAngleRight />
                </Button>
              </Counter>
            ) : (
              <Button
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addBike(bikeObjects["beach"]));
                }}
              >
                Add to cart
              </Button>
            )}
          </FlexContainer>
          <Label>Available: {checkAvailability("road")}</Label>
        </RightSideInfo>
      </StyledFormRowBike>
      <Label>Road Bike</Label>
      <StyledFormRowBike>
        <Image
          src="/road-bike.webp"
          alt="road bike"
          borderradius="10px"
        ></Image>
        <BikeInfo>
          <p>
            <BikeInfoLabel>Model:</BikeInfoLabel> Polygon Strattos S5 Road Bike
          </p>
          <p>
            <BikeInfoLabel>Best for:</BikeInfoLabel> Riding fast on smooth
            pavement
          </p>
          <p>
            <BikeInfoLabel>Price:</BikeInfoLabel> $7.00 hourly | $28.00 daily
          </p>
        </BikeInfo>
        <RightSideInfo>
          {roadBikes[0]?.quantity > 0 ? (
            <Counter>
              <Button
                size="small"
                variation="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(decreaseItemQuantity("road"));
                }}
              >
                <FaAngleLeft />
              </Button>
              <span>{roadBikes[0]?.quantity}</span>
              <Button
                size="small"
                variation="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(increaseItemQuantity("road"));
                }}
              >
                <FaAngleRight />
              </Button>
            </Counter>
          ) : (
            <Button
              size="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(addBike(bikeObjects["road"]));
              }}
            >
              Add to cart
            </Button>
          )}

          <Label>Available: 24</Label>
        </RightSideInfo>
      </StyledFormRowBike>
      <Label>Electric Bike</Label>
      <StyledFormRowBike>
        <Image
          src="/electric-bike.webp"
          alt="eletric bike"
          borderradius="10px"
        ></Image>
        <BikeInfo>
          <p>
            <BikeInfoLabel>Model:</BikeInfoLabel> Spirit Electric Road Bike
          </p>
          <p>
            <BikeInfoLabel>Best for:</BikeInfoLabel> Like road bikes, riding
            fast on smooth pavement. Easier to maintain high speed with electric
            motor
          </p>
          <p>
            <BikeInfoLabel>Price:</BikeInfoLabel> $10.00 hourly | $40.00 daily
          </p>
        </BikeInfo>

        <RightSideInfo>
          <FlexContainer>
            {electricBikes[0]?.quantity > 0 ? (
              <Counter>
                <Button
                  size="small"
                  variation="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(decreaseItemQuantity("electric"));
                  }}
                >
                  <FaAngleLeft />
                </Button>
                <span>{electricBikes[0]?.quantity}</span>
                <Button
                  size="small"
                  variation="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(increaseItemQuantity("electric"));
                  }}
                >
                  <FaAngleRight />
                </Button>
              </Counter>
            ) : (
              <Button
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addBike(bikeObjects["electric"]));
                }}
              >
                Add to cart
              </Button>
            )}
          </FlexContainer>
          <Label>Available: 27</Label>
        </RightSideInfo>
      </StyledFormRowBike>
      <input
        name="numBikesInCart"
        type="number"
        value={numBikesInCart}
        {...register("numBikesInCart", { required: true, min: 1 })}
        hidden
      />
      {errors?.numBikesInCart && (
        <FormError>You must select at least one bike</FormError>
      )}
      <FlexContainer justifycontent="space-between" margin="0 0 2rem 0">
        <Label htmlFor="rentalLengthRadio">
          Will this rental be hourly or daily?
        </Label>
        <FlexContainer gap="1rem">
          <FlexContainer gap="0.5rem">
            <Label>Hourly</Label>
            <Input
              type="radio"
              name="rentalLengthRadio"
              value=""
              id="hourly"
              checked={!isDaily}
              onChange={(e) => {
                dispatch(setIsDaily(Boolean(e.target.value)));
                setDateStart();
                setDateEnd();
              }}
            />
          </FlexContainer>
          <FlexContainer gap="0.5rem">
            <Label>Daily</Label>
            <Input
              type="radio"
              name="rentalLengthRadio"
              value="1"
              id="daily"
              checked={isDaily}
              onChange={(e) => {
                dispatch(setIsDaily(Boolean(e.target.value)));
                setHourStart();
                setHourEnd();
                setHourlyBookingDate();
              }}
            />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer
        flexdirection="column"
        justifycontent="space-between"
        margin="0 0 2rem 0"
      >
        {isDaily && (
          <Label margin="0.35rem 0 1.5rem 0">
            Please select dates for this booking:
          </Label>
        )}
        {isDaily ? (
          <FlexContainer justifycontent="space-between" gap="2rem">
            <FlexContainer flexdirection="column" gap="1rem">
              <Label htmlFor="setDateStart">Start date: </Label>
              <Input
                type="date"
                id="setDateStart"
                name="setDateStart"
                value={dateStart}
                {...register("setDateStart", {
                  required: true,
                  message: "Please select a beginning date for your rental",
                  min: new Date(currentDate.setDate(currentDate.getDate() + 1))
                    .toISOString()
                    .slice(0, 10),
                  onChange: (e) => setDateStart(e.target.value),
                })}
              />
              {errors?.setDateStart && (
                <FormError>Please select a start date</FormError>
              )}
            </FlexContainer>
            <FlexContainer flexdirection="column" gap="1rem">
              <Label htmlFor="setDateEnd">End date: </Label>
              <Input
                type="date"
                id="setDateEnd"
                name="setDateEnd"
                value={dateEnd}
                {...register("setDateEnd", {
                  required: true,
                  message: "Please select an end date for your rental",
                  min: new Date(currentDate.setDate(currentDate.getDate() + 1))
                    .toISOString()
                    .slice(0, 10),
                  onChange: (e) => setDateEnd(e.target.value),
                })}
              />
              {errors?.setDateEnd && (
                <FormError>Please select an end date</FormError>
              )}
            </FlexContainer>
          </FlexContainer>
        ) : (
          <>
            <FlexContainer justifycontent="space-between" alignitems="center">
              <Label htmlFor="setHourlyBookingDate">
                Please select a date for this hourly rental:
              </Label>
              <Input
                type="date"
                id="setHourlyBookingDate"
                name="setHourlyBookingDate"
                // value={hourlyBookingDate}
                defaultValue={hourlyBookingInfo?.date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setHourlyBookingDate(e.target.value)}
                {...register("setHourlyBookingDate", {
                  required: true,
                  message: "Please select a date for your hourly rental",
                  onChange: (e) => setHourlyBookingDate(e.target.value),
                })}
              />
            </FlexContainer>
            {errors?.setHourlyBookingDate && (
              <FormError>Please select a date for your hourly rental</FormError>
            )}
            <FlexContainer justifycontent="space-between" margin="1rem 0">
              <FlexContainer gap="1rem" alignitems="center">
                <Label htmlFor="hourStartTimes">Start time:</Label>

                <select
                  id="setHourStart"
                  name="setHourStart"
                  defaultValue={hourlyBookingInfo?.hourStart}
                  {...register("setHourStart", {
                    required: true,
                    message:
                      "Please select a start time for your hourly rental",
                    onChange: (e) => setHourStart(e.target.value),
                  })}
                >
                  <option></option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">01:00</option>
                  <option value="14:00">02:00</option>
                  <option value="15:00">03:00</option>
                  <option value="16:00">04:00</option>
                  <option value="17:00">05:00</option>
                  <option value="18:00">06:00</option>
                </select>
              </FlexContainer>
              {errors?.setHourStart && (
                <FormError>
                  Please select a start time for your hourly rental
                </FormError>
              )}
            </FlexContainer>
            <FlexContainer justifycontent="space-between" margin="1rem 0">
              <FlexContainer gap="1rem" alignitems="center">
                <Label htmlFor="hourEndTimes">End time:</Label>
                <select
                  id="setHourEnd"
                  name="setHourEnd"
                  defaultValue={hourlyBookingInfo?.hourEnd}
                  {...register("setHourEnd", {
                    required: true,
                    message: "Please select an end time for your hourly rental",
                    onChange: (e) => setHourEnd(e.target.value),
                  })}
                >
                  <option></option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">01:00</option>
                  <option value="14:00">02:00</option>
                  <option value="15:00">03:00</option>
                  <option value="16:00">04:00</option>
                  <option value="17:00">05:00</option>
                  <option value="18:00">06:00</option>
                  <option value="19:00">07:00</option>
                </select>
              </FlexContainer>
              {errors?.setHourEnd && (
                <FormError>
                  Please select an end time for your hourly rental
                </FormError>
              )}
            </FlexContainer>
          </>
        )}
      </FlexContainer>

      <Button type="submit" margin="4rem 0 0 auto">
        Submit
      </Button>
    </Form>
  );
}
export default BookBikesForm;

// Rules for hourly rentals:

// The number of hours rented must be between 0.5 and 6
// starting hour must be before ending hour

// Rules for daily rentals

// The number of days rented must be between 1 and 6
// starting date must be the day after the current date
// ending date

// When the user sets daily to false, all daily info is reset.
// When the user sets daily to true, all hourly info is reset.

// The problem is that once we submit daily or hourly booking
// state, if we never fulfill that order, i
