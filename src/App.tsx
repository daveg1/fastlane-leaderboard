import { useFetchLeaderboard } from "./hooks";
import { Dropdown, Header, List, type DropdownOption } from "./components";

function App() {
  const { lapTimes, pending } = useFetchLeaderboard();

  const periodOptions: DropdownOption[] = [
    { value: "All", label: "All time" },
    { value: "Year", label: "This year" },
    { value: "Month", label: "This month" },
    { value: "Week", label: "This week" },
  ];

  const trackOptions: DropdownOption[] = [
    { value: "1218", label: "2025" },
    { value: "1678", label: "2026" },
  ];

  return (
    <>
      <Header text="FastLane Abz Leaderboard" />

      <main className="mx-auto max-w-xl">
        <menu className="flex items-center justify-between">
          <Dropdown
            options={periodOptions}
            onChange={(e) => console.log(e.target.value)}
          />

          <Dropdown
            label={"Track configuration:"}
            options={trackOptions}
            onChange={(e) => console.log(e.target.value)}
          />
        </menu>

        <List lapTimes={lapTimes} loading={pending} />
      </main>
    </>
  );
}

export default App;
