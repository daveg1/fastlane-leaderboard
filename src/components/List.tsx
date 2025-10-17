import clsx from "clsx";
import type { LapTime } from "../models/lap-time";
import { userIds } from "../user-ids";
import { ListItem } from "./ListItem";

type Props = {
  lapTimes: LapTime[];
  loading: boolean;
};

export function List({ lapTimes, loading }: Readonly<Props>) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 text-white md:gap-2">
      {(loading || !lapTimes) &&
        userIds.map((id) => (
          <div
            key={id}
            className="shimmer mx-auto h-10 w-full max-w-xl -skew-x-6 bg-slate-600 shadow-md"
          ></div>
        ))}

      {!loading &&
        lapTimes.map((entry, index) => (
          <div className={clsx("flip-in w-full", `flip-delay-${index}`)}>
            <ListItem key={entry.name} {...entry} place={index} />
          </div>
        ))}

      {!loading && !lapTimes?.length && (
        <div>Couldn't fetch lap times, try refreshing.</div>
      )}
    </div>
  );
}
