import { useEffect } from "react";
import BookBikesForm from "../ui/BookBikesForm";

function Book() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <BookBikesForm />;
}

export default Book;

// Booking specifics:
// 1. requires no user accounts and no login:
//   users just input their names when booking bikes

// 2. booking requires the user's name and phone number

// 3. orders are made my sending a POST request with the
//   order data (user data + selected bikes) to the API

// 4. payment processing in app

// 5. each order will get a unique ID that shoud be displayed,
//  so the user can later look up their order based on the ID

// USER STORIES:
// user clicks on 'book' page. There will be a nice graphical
// design that allows the user to select the quantity of each
// type of bike they want to rent, and for how many days. There
// will be information about each bike type so the user knows
// which one is best for them. Once the user has all the info
// filled out, the information will be saved to Redux. The user
// will then be asked to input their name, number and payment info.
// Once their payment has been accepted, a new component will be
// rendered with the booking ID number, thanking them for their
// service and detailing good spots to ride their bikes based on
// their selection.
