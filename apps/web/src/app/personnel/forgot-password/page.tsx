import ForgotPasswordForm from "@/components/personnel/ForgotPasswordForm";
import TokenlessWrapper from "@/components/wrapper/tokenlessWrapper";


export default function ForgotPassword(){
    return(
        <TokenlessWrapper>
            <ForgotPasswordForm />
        </TokenlessWrapper>
    )
}