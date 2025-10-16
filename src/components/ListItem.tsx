import clsx from "clsx";
import { formatOrdinal } from "../utils";
import type { RaceTime } from "../models/race-time";

export function ListItem(data: Readonly<RaceTime>) {
  return (
    <div
      key={data.name}
      className="carbon relative grid w-full -skew-x-6 grid-cols-3 items-center border-2 border-red-600/80 bg-repeat-x p-2"
    >
      <span
        className={clsx(
          "absolute -left-2 w-10 bg-red-600 px-2 text-sm font-semibold",
          data.place === 0 && "gold",
          data.place === 1 && "silver",
          data.place === 2 && "bronze",
        )}
      >
        {formatOrdinal(data.place + 1)}
      </span>
      <span className="ps-10 text-left font-semibold text-slate-200">
        {data.name}
      </span>
      <span>{data.time}</span>
      <span className="text-xs text-slate-200">14.10.2025 At 19:30 h</span>
    </div>
  );
}
