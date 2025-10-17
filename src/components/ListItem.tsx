import clsx from "clsx";
import { getOrdinal } from "../utils";
import type { LapTime } from "../models/lap-time";

export function ListItem(data: Readonly<LapTime>) {
  return (
    <div
      key={data.name}
      className="punch-out carbon relative grid w-full -skew-x-6 grid-cols-3 items-center border-2 border-red-600/50 bg-repeat-x p-2 text-center shadow-lg"
    >
      <span
        className={clsx(
          "absolute -left-2 w-10 px-2 pr-4 leading-5 font-semibold",
          data.place === 0 && "gold",
          data.place === 1 && "silver",
          data.place === 2 && "bronze",
        )}
      >
        {data.place + 1}
        <span className="absolute top-[1px] text-xs">
          {getOrdinal(data.place + 1)}
        </span>
      </span>

      <span className="ps-10 text-left text-sm font-semibold text-slate-200">
        {data.name}
      </span>

      <span className="font-semibold">{data.time}</span>
      <span className="text-xs text-slate-200">{data.date}</span>
    </div>
  );
}
