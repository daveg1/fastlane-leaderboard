import { useQueries } from "@tanstack/react-query";
import { sortLapTimes, timeToMilliseconds } from "../utils";
import { useMemo } from "react";
import type { ApiResponse, LapDetails } from "../models/lap-time";
import config from "../config";

const BASE_URL = "/api";

function extractData(data: ApiResponse) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data.html, "text/html");

  const name = doc.querySelector(".minified-name")?.textContent;
  const best_time = doc.querySelector(
    ".minified-stat.time .minified-stat-value",
  )?.textContent;
  const avatarElem = doc.querySelector(
    ".minified-content .avatar.inline",
  ) as HTMLElement;
  const avatarUrl = avatarElem.style.backgroundImage.slice(5, -2);

  const laps = [
    ...doc.querySelectorAll(".table_content a.time_laps.first"),
  ].map((entry) => ({
    value: timeToMilliseconds(entry.textContent.trim()),
    label: entry.textContent.trim(),
  }));

  const calendar = doc
    .querySelector(".minified-stat.date .date")
    ?.textContent?.replaceAll(/\./g, "/");
  const clock = doc
    .querySelector(".minified-stat.date .clock")
    ?.textContent?.match(/\d\d:\d\d/);

  const date = `${calendar} @ ${clock}`;

  return { name, best_time, date, avatarUrl, laps } as LapDetails;
}

export interface FilterOptions {
  track: string;
  period: string;
}

async function fetchUserById(
  user_id: string,
  options?: Partial<FilterOptions>,
) {
  const params = new URLSearchParams({
    user_id,
    track_configuration_id: options?.track ?? "0",
    period: options?.period ?? "all",
    kart_id: "0",
    start_from: "0",
    only_victories: "0",
    only_best_time_sessions: "1",
  });

  return fetch(`${BASE_URL}/sessions-boxes?${params}`)
    .then((res) => res.json())
    .then((res) => res as ApiResponse);
}

export function useFetchLeaderboard(options?: FilterOptions) {
  const { data, ...props } = useQueries({
    queries: config.userIds.map((userId) => {
      return {
        queryKey: ["user", userId, options?.period, options?.track],
        queryFn: async () => {
          const data = await fetchUserById(userId, options);
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
  const lapTimes = useMemo<LapDetails[]>(() => {
    try {
      return (data ?? ([] as LapDetails[]))
        .filter((r): r is LapDetails => !!r?.name && !!r?.best_time)
        .sort(sortLapTimes);
    } catch {
      return data as LapDetails[];
    }
  }, [data]);

  return { lapTimes, ...props };
}
