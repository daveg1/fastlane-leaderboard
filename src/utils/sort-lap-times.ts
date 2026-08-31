import type { LapChartData, LapDetails } from "../models/lap-time";

export function timeToMilliseconds(value: string): number {
  const [min, sec, mil] = value.split(/:|\./);

  return parseInt(min) * 60_000 + parseInt(sec) * 1_000 + parseInt(mil);
}

export function millisecondsToTime(ms: number): string {
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1_000);
  const milliseconds = ms % 1_000;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
}

export function sortLapTimes(a: LapDetails, b: LapDetails): number {
  const aTime = timeToMilliseconds(a.best_time);
  const bTime = timeToMilliseconds(b.best_time);

  return aTime > bTime ? 1 : aTime < bTime ? -1 : 0;
}

export function getAverageLapTime(data: LapChartData[]): number {
  return Math.floor(data.reduce((t, lap) => t + lap.value, 0) / data.length);
}

export function getSlowestLapTime(data: LapChartData[]): number {
  return Math.floor(
    data.reduce((t, lap) => (lap.value > t ? lap.value : t), 0),
  );
}
