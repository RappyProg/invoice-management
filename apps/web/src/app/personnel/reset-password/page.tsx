'use client'
import { useAppSelector } from "@/app/store/hooks";
import ResetPasswordForm from "@/components/personnel/ResetPasswordForm";
import TokenlessWrapper from "@/components/wrapper/tokenlessWrapper";
import Wrapper from "@/components/wrapper/wrapper";

export default function ResetPassword(){
    const active = useAppSelector((state) => state.personnel.logs?.active);
    if(!active){
        return (
            <TokenlessWrapper>
                <ResetPasswordForm />
            </TokenlessWrapper>
        )
    }
    return (
        <Wrapper>
            <ResetPasswordForm />
        </Wrapper>
    )
}