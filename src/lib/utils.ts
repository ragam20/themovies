import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isProduction(env: string) {
  if (env === "prod" || env === "production") {
    return true;
  }
  return false;
}

export function addDate(
  date: Date,
  {
    days = 0,
    weeks = 0,
  }: {
    days?: number;
    weeks?: number;
  },
): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days + weeks * 7);
  return result;
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
