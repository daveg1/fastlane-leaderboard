import clsx from "clsx";
import type { LapTime } from "../models/lap-time";
import config from "../config";
import { ListItem } from "./ListItem";

type Props = {
  lapTimes: LapTime[];
  loading: boolean;
};

export function List({ lapTimes, loading }: Readonly<Props>) {
  return (
    <div className="flex flex-col items-center gap-4 px-4 text-white md:gap-2">
      {(loading || !lapTimes) &&
        config.userIds.map((id) => (
          <div
            key={id}
            className="shimmer mx-auto h-13 w-full -skew-x-6 bg-slate-600 shadow-md"
          ></div>
        ))}

      {!loading &&
        lapTimes.map((entry, index) => (
          <div
            key={entry.name}
            className={clsx("flip-in w-full", `flip-delay-${index}`)}
          >
            <ListItem {...entry} place={index} />
          </div>
        ))}

      {!loading && !lapTimes?.length && (
        <div>
          Couldn't fetch lap times, try refreshing or use a different filter.
        </div>
      )}
    </div>
  );
}
