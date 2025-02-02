'use client';
import { useAppSelector } from '@/app/store/hooks';
import UserDropdowns from './personnel/dashboard/UserDropdowns';



export default function Header() {
  const token = useAppSelector((state) => state.token.token);
  const active = useAppSelector((state) => state.personnel.logs?.active);
  const personnel = useAppSelector((state) => state.personnel.profile);

  if (!token && !active) {
    return <div className="hidden translate-x-full"></div>;
  }

  return (
    <div className="m-5 p-7 rounded-full bg-white shadow-md flex flex-row justify-between duration-100 slideIn">
      <p className="delius-regular text-2xl">Welcome back, {personnel?.name}</p>
      <div className='mr-10'>
        <UserDropdowns />
        
      </div>
    </div>
  );
}
