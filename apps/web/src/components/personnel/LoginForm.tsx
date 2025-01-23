'use client';
import { createCookie } from '@/lib/cookie';
import { login } from '@/lib/personnel';
import { ILogin } from '@/types/personnel';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
});

export default function LoginForm() {
  const [token, setToken] = useState('');
  const router = useRouter();
  const onLogin = async (data: ILogin, action: FormikHelpers<ILogin>) => {
    const { result, ok } = await login(data);
    if (ok && result.token) {
      createCookie('token', result.token);
      setToken(result.token);
      toast.success('Login successfull, redirecting...');
      action.resetForm();
      router.refresh();
    }
    toast.error('Login failed');
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => onLogin(values, actions)}
    >
      {() => {
        return (
          <Form>
            <div className="min-w-[90%] sm:min-w-[50%] lg:min-w-[30%] mx-auto my-32 p-5 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center">
                Login
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
                Welcome back! Log in to access your account.
              </p>
              <div className="mt-5">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email:
                </label>
                <Field
                  name="email"
                  type="email"
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password:
                </label>
                <Field
                  name="password"
                  type="password"
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center font-semibold h-14 px-6 mt-6 text-xl text-white transition-all duration-300 bg-orange-500 rounded-lg hover:bg-orange-600"
              >
                Login
              </button>
              <Link
                href="/user/check-email"
                className="underline text-blue-600"
              >
                Forgot password? Click here...
              </Link>
              <div className="flex items-center my-6 min-w-[480px]">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-sm text-gray-600">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
