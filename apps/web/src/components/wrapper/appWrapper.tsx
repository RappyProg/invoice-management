import { ReactNode } from "react";

export default function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col">
      {children}
    </div>
  );
}