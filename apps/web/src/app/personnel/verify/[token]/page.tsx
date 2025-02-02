'use client';
import Loading from "@/components/miscellaneous/Loading";
import Wrapper from "@/components/wrapper/wrapper";
import { verifyPersonnel } from "@/lib/personnel";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Verify(){
    const params = useParams();
    const token = params?.token as string
    console.log(token)
    const router = useRouter();
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const verify = async () =>{
        if(!token) return;
        const {result, ok} = await verifyPersonnel(token);
        if(ok){
            toast.success('Account verified, redirecting...');
            await delay(5000)
            router.push('/')
        }
    }

    useEffect(()=>{
        verify();
    })
    return(
        <Wrapper>
            <Loading />
        </Wrapper>
    )
}