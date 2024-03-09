import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  bikes: [],
  isDaily: false,
  hourlyBookingInfo: {},
  dailyBookingInfo: {},
  bookingId: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBike(state, action) {
      state.bikes.push(action.payload);
    },

    deleteBike(state, action) {
      state.bikes = state.bikes.filter(
        (bike) => bike.category !== action.payload
      );
    },

    increaseItemQuantity(state, action) {
      const bike = state.bikes.find((bike) => bike.category === action.payload);
      bike.quantity++;
      if (state.isDaily) {
        bike.totalPrice = bike.quantity * bike.dailyRate;
      } else bike.totalPrice = bike.quantity * bike.hourlyRate;
    },
    decreaseItemQuantity(state, action) {
      const bike = state.bikes.find((bike) => bike.category === action.payload);
      if (bike.quantity === 0) return;
      bike.quantity--;
      if (state.isDaily) {
        bike.totalPrice = bike.quantity * bike.dailyRate;
      } else bike.totalPrice = bike.quantity * bike.hourlyRate;

      if (bike.quantity === 0)
        bookingSlice.caseReducers.deleteBike(state, action);
    },
    setHourlyBookingInfo(state, action) {
      state.hourlyBookingInfo = action.payload;
    },
    setDailyBookingInfo(state, action) {
      state.dailyBookingInfo = action.payload;
    },
    setIsDaily(state, action) {
      state.isDaily = action.payload;
      if (state.isDaily === true) {
        state.bikes.map((bike) => {
          return (bike.totalPrice = bike.quantity * bike.dailyRate);
        });
      } else {
        state.bikes.map((bike) => {
          return (bike.totalPrice = bike.quantity * bike.hourlyRate);
        });
      }
    },
    setBookingId(state, action) {
      state.bookingId = action.payload;
    },
    resetBookingState() {
      return initialState;
    },
  },
});

export const {
  addBike,
  deleteBike,
  increaseItemQuantity,
  decreaseItemQuantity,
  setHourlyBookingInfo,
  setDailyBookingInfo,
  setIsDaily,
  setBookingId,
  resetBookingState,
} = bookingSlice.actions;

export default bookingSlice.reducer;

export const getBookingState = (state) => state.booking;
export const getBikesInCart = (state) => state.booking.bikes;
export const getIsDaily = (state) => state.booking.isDaily;
export const getBookingId = (state) => state.booking.bookingId;
export const getNumBikesInCart = (state) =>
  state.booking.bikes.reduce((sum, bike) => sum + bike.quantity, 0);
export const getHourlyBookingInfo = (state) => state.booking.hourlyBookingInfo;
export const getDailyBookingInfo = (state) => state.booking.dailyBookingInfo;

export const getTotalPrice = createSelector(
  [
    (state) => state.booking.hourlyBookingInfo?.numHours,
    (state) => state.booking.dailyBookingInfo?.numDays,
    (state) => state.booking.bikes,
    (state) => state.booking.isDaily,
  ],
  (numHours, numDays, bikes, isDaily) => {
    const multiplier = isDaily ? numDays : numHours;
    return bikes.reduce((sum, bike) => sum + bike.totalPrice, 0) * multiplier;
  }
);

export const getBeachBikes = createSelector(
  [(state) => state.booking.bikes],
  (bikes) => {
    return bikes.filter((bike) => bike.category === "beach");
  }
);
export const getRoadBikes = createSelector(
  [(state) => state.booking.bikes],
  (bikes) => {
    return bikes.filter((bike) => bike.category === "road");
  }
);
export const getElectricBikes = createSelector(
  [(state) => state.booking.bikes],
  (bikes) => {
    return bikes.filter((bike) => bike.category === "electric");
  }
);
