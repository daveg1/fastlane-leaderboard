import clsx from "clsx";
import { formatName, getOrdinal } from "../utils";
import type { LapTime } from "../models/lap-time";
import config from "../config";
import { useState } from "react";

export function ListItem(data: Readonly<LapTime>) {
  const [imageSrc, setImageSrc] = useState(data.avatarUrl);

  return (
    <div
      key={data.name}
      className="punch-out carbon relative grid w-full -skew-x-6 grid-cols-3 items-center border-2 border-red-600/50 bg-repeat-x p-2 text-center shadow-lg"
    >
      <span
        className={clsx(
          "absolute w-10 px-2 pr-4 leading-5 font-semibold",
          data.place === 0 && "gold",
          data.place === 1 && "silver",
          data.place === 2 && "bronze",
          data.place < 3 && "-left-2",
        )}
      >
        {data.place + 1}
        <span className="absolute top-[1px] text-xs">
          {getOrdinal(data.place + 1)}
        </span>
      </span>

      <div className="flex items-center gap-3 ps-10">
        <img
          className="rounded-xs shadow-sm"
          src={imageSrc}
          alt={data.name}
          height={32}
          width={32}
          onError={() => setImageSrc(config.defaultAvatarUrl)}
        />

        <span className="text-left text-sm font-semibold text-slate-200">
          {formatName(data.name)}
        </span>
      </div>

      <span className="font-semibold">{data.time}</span>
      <span className="text-xs text-slate-200">{data.date}</span>
    </div>
  );
}
