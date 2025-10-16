import { useFetchLeaderboard } from "./hooks";
import "./App.css";
import { List } from "./components";

function App() {
  const [leaderboard] = useFetchLeaderboard();

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold text-white">
        FastLane Abz Leaderboard
      </h2>
      <List raceTimes={leaderboard} />
    </>
  );
}

export default App;
