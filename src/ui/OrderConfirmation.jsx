import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../services/apiBookings";
import { FaSpinner } from "react-icons/fa";
import { Title } from "./Title";
import styled from "styled-components";
import ConfirmationBike from "./ConfirmationInfoBike";
import { useParams } from "react-router-dom";
import Label from "./Label";
import { formatCurrency } from "../utilities/helpers";

const MainContainer = styled.div`
  padding: 4rem;
`;

const BikesContainer = styled.div`
  width: 100%;

  display: grid;
  @media (min-width: 475px) {
    grid-template-columns: repeat(auto-fit, 25%);
  }
  gap: 1rem;
`;

const Text = styled.p`
  font-size: small;
  font-weight: light;
  color: var(--color-cyan-800);
  margin-bottom: 2rem;
`;

function OrderConfirmation() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  const booking = bookings?.find(
    (booking) => booking?.idNative === Number(orderId)
  );

  const bikes = {
    beach: {
      model: "Chatham Beach Cruiser Bike",
      image: "/beach-bike.jpeg",
      quantity: booking?.numBeachBikes,
    },
    road: {
      model: "Polygon Strattos S5 Road",
      image: "/road-bike.webp",
      quantity: booking?.numRoadBikes,
    },
    electric: {
      model: "Spirit Electric Road Bike",
      image: "/electric-bike.webp",
      quantity: booking?.numElectricBikes,
    },
  };

  if (isLoading) return <FaSpinner />;

  if (booking)
    return (
      <MainContainer>
        <Title margin="0 0 2rem 0">
          Order Identification #{booking?.idNative}
        </Title>
        <Text>
          Thank you for your order! You will receive a text message as soon as
          your equipment is ready!
        </Text>
        <Text>
          <Label>Name: </Label>
          {booking?.fullName}
        </Text>
        <Text>
          <Label>Phone number: </Label>
          {booking?.phoneNumber}
        </Text>
        <Text>
          <Label>Rental period: </Label>
          {booking?.isDaily
            ? `${booking?.dateStart} - ${booking?.dateEnd}`
            : `${booking?.hourlyBookingDate} from ${booking?.hourStart} - ${booking?.hourEnd}`}{" "}
          (
          {booking?.isDaily
            ? `${booking?.numDays} days`
            : `${booking?.numHours} hours`}
          )
        </Text>
        <Text>
          Paid with card ending in {booking?.paymentLastFour} (
          {formatCurrency(booking?.totalPrice)})
        </Text>
        <BikesContainer>
          {Array.from({ length: booking?.numBeachBikes }, () => {
            return <ConfirmationBike bike={bikes["beach"]} />;
          })}
          {Array.from({ length: booking?.numRoadBikes }, () => {
            return <ConfirmationBike bike={bikes["road"]} />;
          })}
          {Array.from({ length: booking?.numElectricBikes }, () => {
            return <ConfirmationBike bike={bikes["electric"]} />;
          })}
        </BikesContainer>
      </MainContainer>
    );
}

export default OrderConfirmation;


