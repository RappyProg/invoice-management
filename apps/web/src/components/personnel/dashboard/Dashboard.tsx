import { useAppSelector } from '@/app/store/hooks';
import Link from 'next/link';


export default function Dashboard() {
  const token = useAppSelector((state) => state.token.token);
  const active = useAppSelector((state) => state.personnel.logs?.active);
  const personnel = useAppSelector((state) => state.personnel.profile);

  if (!token && !active) {
    return <div className="hidden"></div>;
  }

  return (
    <div></div>
  );
}
