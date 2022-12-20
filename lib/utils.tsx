import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const stringToNumber = (value: string) => {
  if (isNaN(Number(value))) {
    return value;
  }
  return Number(value);
};
