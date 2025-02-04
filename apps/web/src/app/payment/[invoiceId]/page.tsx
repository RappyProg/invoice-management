'use client'
import Wrapper from '@/components/wrapper/wrapper';
import { payInvoice } from '@/lib/invoices';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Payment() {
  const params = useParams();
  const invoiceId = params?.invoiceId as string;
  console.log(invoiceId);
  const router = useRouter();
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const onPayment = async () => {
    const { result, ok } = await payInvoice(invoiceId);
    if (ok) {
      toast.success('Payment successful, closing windows.....');
      await delay(5000);
      window.close();
    }
  };
  return (
    <Wrapper>
      <button onClick={onPayment}>Pay</button>
    </Wrapper>
  );
}
