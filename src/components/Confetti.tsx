import ReactConfetti from "react-confetti";
import { useCountdown } from "../hooks/use-delay";

export function Confetti() {
  const hasFinished = useCountdown(20_000);

  return <ReactConfetti recycle={!hasFinished} />;
}
