import { ReactNode, Suspense } from "react";
import Loading from "../miscellaneous/Loading";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full flex items-center">
      <div className="flex flex-wrap justify-center w-full">
        <Suspense fallback={<Loading />}>
        {children}
        </Suspense>
        </div>
    </div>
  );
}
