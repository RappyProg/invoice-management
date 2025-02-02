//'use client';
//import { fetchCookie } from "@/lib/cookie";
//import { useEffect, useState } from "react";
//import { usePathname } from "next/navigation";

//export const Footer = () => {
//  const [token, setToken] = useState<string | null>(null);
//  const pathname = usePathname();

//  useEffect(() => {
//    const fetchToken = async () => {
//      try {
//        const storedToken = await fetchCookie("token");
//        setToken(storedToken!);
//      } catch (error) {
//        console.error("Error fetching token:", error);
//      }
//    };

//    fetchToken();
//  }, []);

//  const isActive = (path: string) => pathname.startsWith(path);

//  if (!token) {
//    return <div className="hidden"></div>;
//  }

//  return (
//    <div className="">Footer</div>
//  );
//};
