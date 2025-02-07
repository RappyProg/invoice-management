'use client';
import { forgotPassword } from '@/lib/personnel';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  const clickSubmit = async (email: string) => {
    const { ok } = await forgotPassword(email);
    if (ok) {
      toast.success('Password reset link sent to your email');
      router.push('/');
    } else {
      toast.error('An error occured');
    }
  };
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={(values) => clickSubmit(values.email)}
    >
      {() => (
        <Form className="min-h-screen w-full flex justify-center items-center">
          <div className="lg:min-w-[35vw] sm:min-w-[90vw] p-5 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center">
              Forgot Password
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
              Enter your email to receive a password reset link.
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email:
              </label>
              <Field
                name="email"
                type="email"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-lg"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
