'use client';
import { fetchCookie } from "@/lib/cookie";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Header = () => {
  const [token, setToken] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await fetchCookie("token");
        setToken(storedToken!);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  const isActive = (path: string) => pathname.startsWith(path);

  if (!token) {
    return <div className="hidden"></div>;
  }

  return (
    <div className="flex flex-row justify-between items-center w-full h-16 bg-gray-800 text-white">
      <div>
        <p>Fees2Pay</p>
      </div>
      <div className="flex space-x-4">
        <div>Clients</div>
        <div>Products</div>
        <div>Invoices</div>
      </div>
      <div className="flex space-x-4">
        <div>Profile</div>
        <div>Logout</div>
      </div>
    </div>
  );
};
