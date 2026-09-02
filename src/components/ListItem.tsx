import clsx from "clsx";
import {
  formatName,
  getAverageLapTime,
  getFastestLapTime,
  getOrdinal,
  getSlowestLapTime,
  millisecondsToTime,
} from "../utils";
import type { LapDetails } from "../models/lap-time";
import config from "../config";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  ActiveDotProps,
  DotItemDotProps,
} from "recharts/types/util/types";

const LAP_TIME_CUTOFF_MS = 25_000;

export function ListItem(data: Readonly<LapDetails>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article>
      <ListItemMain
        data={data}
        isOpen={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      />

      <ListItemStats data={data} isOpen={isOpen} />
    </article>
  );
}

interface ListItemOptions {
  data: Readonly<LapDetails>;
  isOpen: boolean;
  onClick?(): void;
}

function ListItemMain({ data, isOpen, onClick }: ListItemOptions) {
  const [imageSrc, setImageSrc] = useState(data.avatarUrl);

  return (
    <main
      key={data.name}
      className="punch-out carbon relative grid w-full -skew-x-6 cursor-pointer grid-cols-3 items-center border-2 border-red-600/50 bg-repeat-x p-2 text-center shadow-lg"
      onClick={() => onClick?.()}
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
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
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
        )}
      </span>
    </main>
  );
}

function ListItemStats({ data, isOpen }: ListItemOptions) {
  const stats = useMemo(() => {
    const chartData = data.laps
      .filter((lap) => lap.value < LAP_TIME_CUTOFF_MS)
      .map((lap, index) => ({
        lapNumber: index + 1,
        label: lap.label,
        value: lap.value,
      }));

    const totalLaps = data.laps.length;
    const chartLaps = chartData.length;

    return { chartData, totalLaps, chartLaps };
  }, [data]);

  const customDot = ({ cx, cy, payload }: DotItemDotProps | ActiveDotProps) => {
    const isBestLap = payload.label === data.best_time;

    return (
      <circle
        key={`custom-dot-${payload.lapNumber}`}
        className={
          isBestLap
            ? "fill-green-700 stroke-green-500"
            : "fill-blue-500 stroke-white"
        }
        cx={cx}
        cy={cy}
        r={isBestLap ? 6 : 4}
        strokeWidth={2}
      />
    );
  };

  return (
    <aside
      className={clsx(
        "-ml-0.5 w-full overflow-hidden rounded-b-lg bg-black/80 p-2 py-4 transition-all",
        isOpen ? "block" : "hidden",
      )}
    >
      <section className="px-8 pb-4 max-sm:px-4">
        <h2 className="text-xl">Lap progression</h2>

        <div className="grid grid-cols-2 text-gray-300 max-sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col">
            <p>
              showing <strong>{stats.chartData.length}</strong> of{" "}
              <strong>{data.laps.length}</strong> total laps
            </p>

            <p className="text-gray-400">slow laps excluded ({">"}25s)</p>
          </div>

          <div className="flex flex-col max-sm:text-right">
            <p>
              Slowest:{" "}
              <strong>
                {millisecondsToTime(getSlowestLapTime(stats.chartData))}
              </strong>
            </p>

            <p>
              Fastest:{" "}
              <strong>
                {millisecondsToTime(getFastestLapTime(stats.chartData))}
              </strong>
            </p>

            <p>
              Average:{" "}
              <strong>
                {millisecondsToTime(getAverageLapTime(stats.chartData))}
              </strong>
            </p>
          </div>
        </div>
      </section>

      <AreaChart
        responsive
        data={stats.chartData}
        height={300}
        margin={{ bottom: 16, right: 16, left: 4 }}
      >
        <CartesianGrid stroke="var(--color-slate-500)" strokeOpacity={0.4} />

        <XAxis
          label={{ value: "Laps", position: "insideBottom", dy: 16 }}
          dataKey="lapNumber"
          name="Lap"
          interval={0}
          ticks={stats.chartData
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
          domain={[19000, 25000]}
          allowDataOverflow={true}
          tickFormatter={(milliseconds) => `${Math.floor(milliseconds / 1000)}`}
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
          dot={customDot}
          activeDot={customDot}
        />
      </AreaChart>
    </aside>
  );
}
