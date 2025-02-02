import { ReactNode } from 'react';

export default function ContentWrapper({ children }: { children: ReactNode }) {
  return <div className="flex-grow ml-64">{children}</div>;
}
