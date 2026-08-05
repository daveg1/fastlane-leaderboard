import type { PropsWithChildren } from "react";

export function SiteBanner({ children }: PropsWithChildren) {
  return (
    <div className="bg-yellow-300 py-2 text-center font-semibold text-black">
      {children}
    </div>
  );
}
