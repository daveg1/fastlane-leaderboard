import { useQueries } from "@tanstack/react-query";
import { sortRaceTimes } from "../utils";
import { useMemo } from "react";
import type { ApiResponse, RaceTime } from "../models/race-time";
import { userIds } from "../user-ids";

function extractData(data: ApiResponse) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data.html, "text/html");
  const name = doc.querySelector(".minified-name")?.textContent;
  const time = doc.querySelector(
    ".minified-stat.time .minified-stat-value",
  )?.textContent;
  const date = doc.querySelector(".minified-stat.date .date")?.textContent;

  return { name, time, date } as RaceTime;
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

  return fetch(`/api/sessions-boxes?${params}`)
    .then((res) => res.json())
    .then((res) => res as ApiResponse);
}

export function useFetchLeaderboard() {
  const { data } = useQueries({
    queries: userIds.map((userId) => {
      return {
        queryKey: ["user", userId],
        queryFn: async () => {
          const data = await fetchUserById(userId);
          return extractData(data);
        },
      };
    }),
    combine: (results) => ({
      data: results.map((res) => res.data),
      pending: results.some((res) => res.isPending),
    }),
  });

  // combine already memoizes, but to be safe
  const raceTimes = useMemo<RaceTime[]>(
    () => (data ?? []).filter((r) => !!r).sort(sortRaceTimes),
    [data],
  );

  return [raceTimes] as const;
}
