'use client';

import TokenlessWrapper from '@/components/wrapper/tokenlessWrapper';
import { getInvoiceById, payInvoice } from '@/lib/invoices';
import { IInvoice } from '@/types/invoices';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Payment() {
  const params = useParams();
  const invoiceId = params?.invoiceId as string;
  const [invoice, setInvoice] = useState<IInvoice | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      const { result, ok } = await getInvoiceById(invoiceId);
      if (ok) {
        setInvoice(result.invoice);
      }
    };
    if (invoiceId) fetchInvoice();
  }, [invoiceId]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onPayment = async () => {
    const { result, ok } = await payInvoice(invoiceId);
    if (ok) {
      toast.success('Payment successful, closing window...');
      await delay(5000);
      window.close();
    }
  };

  return (
    <TokenlessWrapper>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Invoice Payment
          </h2>
          {invoice ? (
            <>
              <p className="text-lg mb-6 text-gray-700">
                Total:{' '}
                <span className="font-bold text-gray-900">
                  Rp.{invoice.total}
                </span>
              </p>

              {/* Payment Options */}
              <button
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg mb-3 text-lg font-medium hover:bg-blue-700 transition"
                onClick={onPayment}
              >
                Pay Now
              </button>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Or pay using:</p>
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-500 transition">
                    Pay with PayPal
                  </button>
                  <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
                    Pay with Debit Card
                  </button>
                  <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
                    Pay with Credit Card
                  </button>
                </div>
              </div>

              <div id="paypal-button-container" className="mt-6"></div>
            </>
          ) : (
            <p className="text-gray-700">Loading invoice...</p>
          )}
        </div>
      </div>
    </TokenlessWrapper>
  );
}
