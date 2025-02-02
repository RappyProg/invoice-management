'use client';
import LoginForm from '@/components/personnel/LoginForm';
import TokenlessWrapper from '@/components/wrapper/tokenlessWrapper';
import Wrapper from '@/components/wrapper/wrapper';

export default function Home() {
  return (
    <Wrapper>
      <TokenlessWrapper>
        <LoginForm />
      </TokenlessWrapper>
    </Wrapper>
  );
}
