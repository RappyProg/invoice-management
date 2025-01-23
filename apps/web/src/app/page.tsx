'use client'
import LoginForm from "@/components/personnel/LoginForm";
import Wrapper from "@/components/wrapper/wrapper";
import { fetchCookie } from "@/lib/cookie"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
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
  if (!token) {
    return (
      <Wrapper>
        <LoginForm />
      </Wrapper>
    )
  }else{
    router.push('/dashboard');
  }

  
}
