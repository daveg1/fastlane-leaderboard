import { useFetchLeaderboard } from "./hooks";
import { Dropdown, Header, List, type DropdownOption } from "./components";
import { useMemo, useState } from "react";
import { SiteBanner } from "./components/SiteBanner";
import config from "./config";
import { Confetti } from "./components/Confetti";

function App() {
  const periodOptions: DropdownOption[] = useMemo(
    () => [
      { value: "all", label: "All time" },
      { value: "year", label: "This year" },
      { value: "month", label: "This month" },
      { value: "week", label: "This week" },
    ],
    [],
  );

  const trackOptions: DropdownOption[] = useMemo(
    () => [
      { value: "1678", label: "2026" },
      { value: "1218", label: "2025" },
    ],
    [],
  );

  const [period, setPeriod] = useState(periodOptions[0].value);
  const [track, setTrack] = useState(trackOptions[0].value);
  const { lapTimes, pending } = useFetchLeaderboard({ period, track });

  return (
    <>
      {config.siteBanner && <SiteBanner>{config.siteBanner}</SiteBanner>}
      {config.hasConfetti && <Confetti />}

      <Header text="FastLane Abz Leaderboard" />

      <main className="mx-auto max-w-2xl">
        <menu className="flex items-center justify-between">
          <Dropdown
            options={periodOptions}
            onChange={(e) => setPeriod(e.target.value)}
          />

          <Dropdown
            label={"Track configuration:"}
            options={trackOptions}
            onChange={(e) => setTrack(e.target.value)}
          />
        </menu>

        <List lapTimes={lapTimes} loading={pending} />

        <footer className="flex items-center justify-center gap-1 py-4 text-white opacity-90">
          <a
            className="border-b border-b-white/50 hover:border-b-white"
            href="https://www.racefacer.com/dashboard"
            target="_blank"
          >
            racefacer dashboard
          </a>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="mb-1 size-4"
          >
            <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
            <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
          </svg>
        </footer>
      </main>
    </>
  );
}

export default App;
