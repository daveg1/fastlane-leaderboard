export interface ApiResponse {
  success: boolean;
  error: boolean;
  total: number;
  html: string;
}

export interface RaceTime {
  place: number;
  name: string;
  time: string;
  date: string;
}

export const mockLeaderboard: RaceTime[] = [
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
