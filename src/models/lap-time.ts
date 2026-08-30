export interface ApiResponse {
  success: boolean;
  error: boolean;
  total: number;
  html: string;
}

export interface LapTime {
  label: string; // readable time e.g. 01:21:785
  value: number; // time in milliseconds, e.g. 81785
}

export interface LapDetails {
  place: number;
  name: string;
  best_time: string;
  date: string;
  avatarUrl: string;
  laps: LapTime[];
}

export const mockLeaderboard: LapDetails[] = [
  {
    name: "Person A",
    best_time: "00:19.500",
    date: "",
    place: -1,
    avatarUrl: "",
    laps: [],
  },
  {
    name: "Person E",
    best_time: "00:21.760",
    date: "",
    place: -1,
    avatarUrl: "",
    laps: [],
  },
  {
    name: "Person B",
    best_time: "00:21.500",
    date: "",
    place: -1,
    avatarUrl: "",
    laps: [],
  },
  {
    name: "Person C",
    best_time: "00:20.500",
    date: "",
    place: -1,
    avatarUrl: "",
    laps: [],
  },
  {
    name: "Person D",
    best_time: "00:20.490",
    date: "",
    place: -1,
    avatarUrl: "",
    laps: [],
  },
];
