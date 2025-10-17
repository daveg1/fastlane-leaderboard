import { useFetchLeaderboard } from "./hooks";
import { Header, List } from "./components";

function App() {
  const { lapTimes, pending } = useFetchLeaderboard();

  return (
    <>
      <Header text="FastLane Abz Leaderboard" />

      <List lapTimes={lapTimes} loading={pending} />
    </>
  );
}

export default App;
