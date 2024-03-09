import styled from "styled-components";
import Image from "./Image";
import { useDispatch, useSelector } from "react-redux";
import Label from "./Label";
import { formatCurrency } from "../utilities/helpers";
import { Title } from "./Title";
import Counter from "./Counter";
import Button from "./Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  decreaseItemQuantity,
  getIsDaily,
  increaseItemQuantity,
} from "../slices/bookingSlice";
import FlexContainer from "./FlexContainer";

const StyledConfirmationBike = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 2rem;
  background-color: var(--color-grey-0);
  width: ${props => props.width};
`;

const BottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

function ConfirmationBike({ bike, each, counter, total }) {
  const dispatch = useDispatch();
  const isDaily = useSelector(getIsDaily)

  return (
    <StyledConfirmationBike>
      <Label>
        <Title>Model</Title>: {bike.model}
      </Label>
      <Image src={bike.image} alt={bike.model}></Image>

      {each && (
        <Label>
          <Title>Each</Title>: {formatCurrency(isDaily ? bike.dailyRate : bike.hourlyRate)}
        </Label>
      )}
      <FlexContainer>
        <Label>
          <Title>Quantity</Title>
        </Label>
        :
        {counter ? (
          <Counter>
            <Button
              size="small"
              variation="secondary"
              onClick={(e) => {
                e.preventDefault();
                dispatch(decreaseItemQuantity(`${bike.category}`));
              }}
            >
              <FaAngleLeft />
            </Button>
            <span>{bike.quantity}</span>
            <Button
              size="small"
              variation="secondary"
              onClick={(e) => {
                e.preventDefault();
                dispatch(increaseItemQuantity(`${bike.category}`));
              }}
            >
              <FaAngleRight />
            </Button>
          </Counter>
        ) : (
          <span>{bike.quantity}</span>
        )}
      </FlexContainer>
      {total && (
        <Label>
          <Title>Total</Title>: {formatCurrency(bike.totalPrice)}
        </Label>
      )}
    </StyledConfirmationBike>
  );
}

export default ConfirmationBike;
