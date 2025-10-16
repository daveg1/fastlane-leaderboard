import type { LapTime } from "../models/lap-time";
import { ListItem } from "./ListItem";

export function List({ lapTimes }: { lapTimes: LapTime[] }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-2 text-white">
      {lapTimes.map((entry, index) => (
        <ListItem key={entry.name} {...entry} place={index} />
      ))}
    </div>
  );
}
