import type { LapTime } from "../models/lap-time";
import { userIds } from "../user-ids";
import { ListItem } from "./ListItem";

type Props = {
  lapTimes: LapTime[];
  loading: boolean;
};

export function List({ lapTimes, loading }: Readonly<Props>) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-2 text-white">
      {loading &&
        userIds.map(() => (
          <div className="shimmer mx-auto h-10 w-full max-w-xl -skew-x-6 bg-slate-600 shadow-md"></div>
        ))}

      {!loading &&
        lapTimes.map((entry, index) => (
          <ListItem key={entry.name} {...entry} place={index} />
        ))}
    </div>
  );
}
