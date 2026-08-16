export interface ApiResponse {
  success: boolean;
  error: boolean;
  total: number;
  html: string;
}

export interface LapTime {
  place: number;
  name: string;
  time: string;
  date: string;
  avatarUrl: string;
}

export const mockLeaderboard: LapTime[] = [
  {
    name: "Person A",
    time: "00:19.500",
    date: "",
    place: -1,
    avatarUrl: "",
  },
  {
    name: "Person E",
    time: "00:21.760",
    date: "",
    place: -1,
    avatarUrl: "",
  },
  {
    name: "Person B",
    time: "00:21.500",
    date: "",
    place: -1,
    avatarUrl: "",
  },
  {
    name: "Person C",
    time: "00:20.500",
    date: "",
    place: -1,
    avatarUrl: "",
  },
  {
    name: "Person D",
    time: "00:20.490",
    date: "",
    place: -1,
    avatarUrl: "",
  },
];
