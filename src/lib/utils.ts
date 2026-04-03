import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-EU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}
