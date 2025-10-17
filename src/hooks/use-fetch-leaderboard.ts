import { useQueries } from "@tanstack/react-query";
import { sortLapTimes } from "../utils";
import { useMemo } from "react";
import type { ApiResponse, LapTime } from "../models/lap-time";
import { userIds } from "../user-ids";

const BASE_URL = "/api";

function extractData(data: ApiResponse) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data.html, "text/html");
  const name = doc.querySelector(".minified-name")?.textContent;
  const time = doc.querySelector(
    ".minified-stat.time .minified-stat-value",
  )?.textContent;
  const calendar = doc.querySelector(".minified-stat.date .date")?.textContent;
  const clock = doc
    .querySelector(".minified-stat.date .clock")
    ?.textContent?.match(/\d\d:\d\d/);

  const date = `${calendar} @ ${clock}`;

  return { name, time, date } as LapTime;
}

async function fetchUserById(user_id: string) {
  const params = new URLSearchParams({
    user_id,
    track_configuration_id: "0",
    period: "all",
    kart_id: "0",
    start_from: "0",
    only_victories: "0",
    only_best_time_sessions: "1",
  });

  return fetch(`${BASE_URL}/sessions-boxes?${params}`)
    .then((res) => res.json())
    .then((res) => res as ApiResponse);
}

export function useFetchLeaderboard() {
  const { data, ...props } = useQueries({
    queries: userIds.map((userId) => {
      return {
        queryKey: ["user", userId],
        queryFn: async () => {
          const data = await fetchUserById(userId);
          return extractData(data);
        },
        retry: 3,
        retryDelay: (attemptIndex: number) =>
          Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
      };
    }),
    combine: (results) => ({
      data: results.map((res) => res.data),
      pending: results.some((res) => res.isPending),
    }),
  });

  // combine already memoizes, but to be safe
  const lapTimes = useMemo<LapTime[]>(
    () => (data ?? []).filter((r) => !!r).sort(sortLapTimes),
    [data],
  );

  return { lapTimes, ...props };
}
