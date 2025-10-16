import type { RaceTime } from "../models/race-time";

const mockLeaderboard: RaceTime[] = [
  {
    name: "Person A",
    time: "00:19.500",
    date: "",
    place: -1,
  },
  {
    name: "Person E",
    time: "00:21.760",
    date: "",
    place: -1,
  },
  {
    name: "Person B",
    time: "00:21.500",
    date: "",
    place: -1,
  },
  {
    name: "Person C",
    time: "00:20.500",
    date: "",
    place: -1,
  },
  {
    name: "Person D",
    time: "00:20.490",
    date: "",
    place: -1,
  },
];

export function useFetchLeaderboard() {
  // TODO: fetch actual results

  const sorted = mockLeaderboard.sort((a, b) => {
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
  });

  return [sorted] as const;
}
