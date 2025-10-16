/**
 * Format number as ordinal
 *
 * i.e. 1st, 2nd, 3rd, nth
 */
export function formatOrdinal(num: number) {
  if (num === 1) return "1st";
  if (num === 2) return "2nd";
  if (num === 3) return "3rd";
  return `${num}th`;
}
