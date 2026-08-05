import ReactConfetti from "react-confetti";
import { useCountdown } from "../hooks/use-delay";

export function Confetti() {
  const hasFinished = useCountdown(7_000);

  return <ReactConfetti recycle={!hasFinished} />;
}
