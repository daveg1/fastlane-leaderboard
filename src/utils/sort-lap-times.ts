import type { LapDetails } from "../models/lap-time";

export function timeToMilliseconds(value: string) {
  const [min, sec, mil] = value.split(/:|\./);

  return parseInt(min) * 60_000 + parseInt(sec) * 1_000 + parseInt(mil);
}

export const sortLapTimes = (a: LapDetails, b: LapDetails): number => {
  const aTime = timeToMilliseconds(a.best_time);
  const bTime = timeToMilliseconds(b.best_time);

  return aTime > bTime ? 1 : aTime < bTime ? -1 : 0;
};
