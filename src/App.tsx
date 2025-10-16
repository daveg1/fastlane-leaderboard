import { useFetchLeaderboard } from "./hooks";
import "./App.css";
import { List } from "./components";

function App() {
  const { lapTimes, pending } = useFetchLeaderboard();

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold text-white">
        FastLane Abz Leaderboard
      </h2>

      <List lapTimes={lapTimes} loading={pending} />
    </>
  );
}

export default App;
