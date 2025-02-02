'use client'
import { useRouter } from "next/navigation";
import Wrapper from "../wrapper/wrapper";
import Loading from "./Loading";
import { useEffect } from "react";

export default function TransitionElement(){
    const router = useRouter();
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    useEffect(()=>{
        delay(2000)
        router.push("/personnel/dashboard")
    })
    return(
        <Wrapper>
            <Loading />
        </Wrapper>
    )
}