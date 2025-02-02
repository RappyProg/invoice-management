'use client';
import { deleteCookie } from '@/lib/cookie';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { clearProfile, loggingOut } from '@/app/store/slices/personnelSlice';
import { clearToken } from '@/app/store/slices/tokenSlice';
import { useAppSelector } from '@/app/store/hooks';
import { useState } from 'react';

export const Sidebar = () => {
  const token = useAppSelector((state) => state.token.token);
  const active = useAppSelector((state) => state.personnel.logs?.active);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const isActive = (path: string) => pathname.startsWith(path);

  const logout = async () => {
    await deleteCookie('token');
    dispatch(clearProfile());
    dispatch(clearToken());
    dispatch(loggingOut());
    router.push('/');
  };

  if (!token && !active) {
    return <div className="hidden"></div>;
  }
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col sidebarIn">
      <div className="p-6 border-b border-gray-700">
        <Link href="/personnel/dashboard" className="pacifico-regular text-2xl">
          Fees2Pay
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-4">
        <Link
          href="/client"
          className={`block p-3 rounded-lg ${
            isActive('/client')
              ? 'bg-gray-700 font-bold pointer-events-none'
              : 'hover:bg-gray-700'
          }`}
        >
          Clients
        </Link>
        <ul className="ml-3 w-full list-disc">
          <Link
            href={'/client'}
            className={`block p-3 rounded-lg ${isActive('/client') ? 'clientOptionsIn' : 'hidden'}`}
          >
            Client List
          </Link>
          <Link
            href={'/client/create'}
            className={`block p-3 rounded-lg cursor-pointer ${isActive('/client') ? 'clientOptionsIn' : 'hidden'}`}
          >
            Create Client
          </Link>
        </ul>

        <Link
          href="/product"
          className={`block p-3 rounded-lg ${
            isActive('/product') ? 'bg-gray-700 font-bold pointer-events-none' : 'hover:bg-gray-700'
          }`}
        >
          Products
        </Link>
        <ul className="ml-3 w-full list-disc">
          <Link
            href={'/product'}
            className={`block p-3 rounded-lg ${isActive('/product') ? 'productOptionsIn' : 'hidden'}`}
          >
            Product List
          </Link>
          <Link
            href={'/product/create'}
            className={`block p-3 rounded-lg cursor-pointer ${isActive('/product') ? 'productOptionsIn' : 'hidden'}`}
          >
            Create Product
          </Link>
        </ul>
        <Link
          href="/invoice"
          className={`block p-3 rounded-lg ${
            isActive('/invoice') ? 'bg-gray-700 font-bold pointer-events-none' : 'hover:bg-gray-700'
          }`}
        >
          Invoices
        </Link>
        <ul className="ml-3 w-full list-disc">
          <Link
            href={'/invoice'}
            className={`block p-3 rounded-lg ${isActive('/invoice') ? 'invoiceOptionsIn' : 'hidden'}`}
          >
            Invoice List
          </Link>
          <Link
            href={'/invoice/create'}
            className={`block p-3 rounded-lg cursor-pointer ${isActive('/invoice') ? 'invoiceOptionsIn' : 'hidden'}`}
          >
            Create Invoice
          </Link>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
