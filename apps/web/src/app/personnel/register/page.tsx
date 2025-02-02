import RegisterForm from '@/components/personnel/RegisterForm';
import AuthWrapper from '@/components/wrapper/tokenlessWrapper';
import Wrapper from '@/components/wrapper/wrapper';

export default function Register() {
  return (
    <Wrapper>
      <AuthWrapper>
        <RegisterForm />
      </AuthWrapper>
    </Wrapper>
  );
}
