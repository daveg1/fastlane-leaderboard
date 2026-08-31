import clsx from "clsx";
import { formatName, getOrdinal } from "../utils";
import type { LapDetails } from "../models/lap-time";
import config from "../config";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function ListItem(data: Readonly<LapDetails>) {
  const [imageSrc, setImageSrc] = useState(data.avatarUrl);

  const [isOpen, setIsOpen] = useState(false);

  const chartData = data.laps
    .filter((lap) => lap.value < 23_000)
    .map((lap, index) => ({
      lapNumber: index + 1,
      label: lap.label,
      value: lap.value,
    }));

  const totalLaps = data.laps.length;
  const removedLaps = totalLaps - chartData.length;

  return (
    <div>
      <div
        key={data.name}
        className="punch-out carbon relative grid w-full -skew-x-6 cursor-pointer grid-cols-3 items-center border-2 border-red-600/50 bg-repeat-x p-2 text-center shadow-lg"
        onClick={() => setIsOpen((v) => !v)}
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

        <span className="font-semibold">{data.best_time}</span>
        <span className="text-xs text-slate-200">{data.date}</span>

        <span className="absolute right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      <div
        className={clsx(
          "-ml-0.5 w-full rounded-b-lg bg-black/80 p-2 py-4 transition-all",
          isOpen ? "block" : "hidden",
        )}
      >
        <section className="px-8 pb-4">
          <h2 className="text-xl">Lap progression</h2>

          <main className="text-gray-300">
            <p>
              <strong>{totalLaps}</strong> total laps (
              <strong>{removedLaps}</strong> slow lap
              {removedLaps > 1 ? "s" : ""} removed)
            </p>

            <p></p>
          </main>
        </section>

        <AreaChart
          responsive
          data={chartData}
          height={300}
          margin={{ bottom: 16, right: 16, left: 4 }}
        >
          <CartesianGrid stroke="var(--color-slate-500)" strokeOpacity={0.4} />

          <XAxis
            label={{ value: "Laps", position: "insideBottom", dy: 16 }}
            dataKey="lapNumber"
            name="Lap"
            interval={0}
            ticks={chartData
              .filter((_, index) => index % 2 === 0)
              .map((d) => d.lapNumber)}
            stroke="var(--color-slate-300)"
          />

          <YAxis
            label={{
              value: "Lap time (sec)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
            dataKey="value"
            domain={["dataMin - 200", "dataMax + 200"]}
            allowDataOverflow={true}
            tickFormatter={(milliseconds) =>
              `${Math.floor(milliseconds / 1000)}`
            }
            unit="s"
            stroke="var(--color-slate-300)"
          />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <span className="rounded-xs bg-red-700 px-2 py-1 text-white">
                    {payload[0].payload.label}
                  </span>
                );
              }
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#006dff"
            strokeWidth={2}
            fill="#006dff"
            fillOpacity={0.2}
            dot={{
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#006dff",
              r: 4,
              visibility: "visible",
            }}
          />
        </AreaChart>
      </div>
    </div>
  );
}
