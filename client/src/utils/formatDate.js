import React from "react";

export default function formatDate(dateInBadFormat) {
  const date = new Date(dateInBadFormat);
  if (date.getTime() !== date.getTime()) {
    return dateInBadFormat;
  }

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let monthName = monthNames[monthIndex];
  let year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
}
