import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../ui/Form";
import Label from "../ui/Label";
import Input from "../ui/Input";
import FlexContainer from "../ui/FlexContainer";
import FormError from "../ui/FormError";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function FindBooking() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bookingId, setBookingId] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onFormSubmit() {
    navigate(`/findbooking/${bookingId}`);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <FlexContainer flexdirection="column" gap="2rem">
          <Label>Enter your Order Identification Number</Label>
          <Input
            type="text"
            name="orderIdNum"
            id="orderIdNum"
            {...register("orderIdNum", {
              required: "Please enter your Order ID number",
              onChange: (e) => setBookingId(Number(e.target.value)),
            })}
          />
          {errors.orderIdNum && (
            <FormError>{errors.orderIdNum.message}</FormError>
          )}
        </FlexContainer>
        <Button margin="2rem 0 0 auto">Look up</Button>
      </Form>
    </>
  );
}

export default FindBooking;
