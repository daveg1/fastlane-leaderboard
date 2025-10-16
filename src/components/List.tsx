import type { RaceTime } from "../models/race-time";
import { ListItem } from "./ListItem";

export function List({ raceTimes }: { raceTimes: RaceTime[] }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-2 text-white">
      {raceTimes.map((entry, index) => (
        <ListItem {...entry} place={index} />
      ))}
    </div>
  );
}
