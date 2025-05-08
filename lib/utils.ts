import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date consistently for both server and client rendering
 * @param date Date to format
 * @returns Formatted date string in YYYY/MM/DD format
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0].replace(/-/g, '/')
}
