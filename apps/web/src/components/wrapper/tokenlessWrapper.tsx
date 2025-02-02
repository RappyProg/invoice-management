import { ReactNode } from "react";

export default function TokenlessWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="-ml-64">
            {children}
        </div>
    );
}