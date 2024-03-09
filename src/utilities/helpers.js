export function formatCurrency(value) {
  return new Intl.NumberFormat("us", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export function formatDateRange(daysLater, dateOne) {
  const laterDate = new Date(
    new Date().setDate(new Date().getDate() + Number(daysLater))
  ).toLocaleDateString();
  return `${new Date(dateOne).toLocaleDateString()} - ${laterDate}`;
}

export function formatHourRange(startTime, hoursLater) {
  const [startHour, startMinute] = startTime.split(":").map(Number);

  const endHour = (startHour + hoursLater) % 24;
  const endMinute = startMinute;

  const formattedStartTime = `${startHour
    .toString()
    .padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`;
  const formattedEndTime = `${endHour.toString().padStart(2, "0")}:${endMinute
    .toString()
    .padStart(2, "0")}`;

  return `${formattedStartTime}-${formattedEndTime}`;
}

export function isCurrentTimeBetweenDates(startDate, endDate) {
  const currentDate = new Date().toISOString().slice(0, 10);

  return startDate <= currentDate && currentDate <= endDate;
}
// ^Invoke this function with dates of the same format as 'currentDate'.
// This function will be used to present a message to the user when they
// look up their order.

export function hoursBetweenTimes(startTime, endTime) {
  // Parse the time strings into Date objects
  const startDate = new Date(`2000-01-01T${startTime}`);
  const endDate = new Date(`2000-01-01T${endTime}`);

  // Calculate the time difference in milliseconds
  const timeDifference = endDate - startDate;

  // Convert milliseconds to hours
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  return hoursDifference;
}

export function daysBetweenDates(startDate, endDate) {
  // Calculate the time difference in milliseconds
  const timeDifference = endDate - startDate;

  // Convert milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  // Round to the nearest whole number
  return Math.round(daysDifference);
}
