import type { RaceTime } from "../models/race-time";

export const sortRaceTimes = (a: RaceTime, b: RaceTime): number => {
  const minuteA = +a.time.slice(0, 2);
  const minuteB = +b.time.slice(0, 2);
  if (minuteA > minuteB) return 1;
  if (minuteA < minuteB) return -1;

  const secondA = +a.time.slice(3, 5);
  const secondB = +b.time.slice(3, 5);
  if (secondA > secondB) return 1;
  if (secondA < secondB) return -1;

  const milliA = +a.time.slice(6, 9);
  const milliB = +b.time.slice(6, 9);
  if (milliA > milliB) return 1;
  if (milliA < milliB) return -1;

  return 0;
};
