import { ReactNode } from "react";

export default function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen">
      {children}
    </div>
  );
}