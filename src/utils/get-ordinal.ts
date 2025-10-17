/**
 * Get the ordinal for a number
 *
 * i.e. 1st, 2nd, 3rd, nth
 */
export function getOrdinal(num: number) {
  if (num === 1) return "st";
  if (num === 2) return "nd";
  if (num === 3) return "rd";
  return "th";
}
