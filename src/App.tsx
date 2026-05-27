import { useFetchLeaderboard } from "./hooks";
import { Dropdown, Header, List, type DropdownOption } from "./components";
import { useMemo, useState } from "react";

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
      <Header text="FastLane Abz Leaderboard" />

      <main className="mx-auto max-w-xl">
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
      </main>
    </>
  );
}

export default App;
