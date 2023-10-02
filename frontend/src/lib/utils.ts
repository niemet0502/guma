import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

export const getHours = (date?: Date, separator = ":") => {
  if (!date) return;
  const d = new Date(date);
  return `${addZero(d.getHours())}${separator}${addZero(d.getMinutes())}`;
};

export const transformDate = (dateStr?: Date, hours = false) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${addZero(date.getDate())}/${addZero(
    date.getMonth() + 1
  )}/${date.getFullYear()} ${hours ? getHours(date) : ""}`;
};

export const transformDateToYYYMMDDFormat = (dateStr?: Date) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
    date.getDate()
  )}`;
};

export const transformDateFullText = (dateString: string): string => {
  try {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Check if the Date object is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Define the months in full text
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the components of the date
    const day = date.getDate();
    const month = date.getMonth(); // 0-based index
    const year = date.getFullYear();

    // Format the date in "Month Day, Year" format
    const formattedDate = `${months[month]} ${day}, ${year}`;

    return formattedDate;
  } catch (error) {
    // Handle any errors, such as an invalid date format
    console.error("Error transforming date:", error);
    return "Invalid Date";
  }
};

export const transformDateToMonthDay = (dateString: string): string => {
  try {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Check if the Date object is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Define the months in full text
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get the components of the date
    const day = date.getDate();
    const month = date.getMonth(); // 0-based index

    // Format the date in "Month Day, Year" format
    const formattedDate = ` ${day} ${months[month]}`;

    return formattedDate;
  } catch (error) {
    // Handle any errors, such as an invalid date format
    console.error("Error transforming date:", error);
    return "Invalid Date";
  }
};
