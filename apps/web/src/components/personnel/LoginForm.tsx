'use client';
import { useAppSelector } from '@/app/store/hooks';
import { loggingIn, setProfile } from '@/app/store/slices/personnelSlice';
import { dispatchToken } from '@/app/store/slices/tokenSlice';
import { createCookie } from '@/lib/cookie';
import { login } from '@/lib/personnel';
import { ILogin } from '@/types/personnel';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
});

export default function LoginForm() {
  const [token, setToken] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const active = useAppSelector((state) => state.personnel.logs?.active);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const onLogin = async (data: ILogin, action: FormikHelpers<ILogin>) => {
    const { result, ok } = await login(data);
    if (ok && result.token) {
      await createCookie('token', result.token);
      setToken(result.token);
      dispatch(setProfile(result.personnel));
      dispatch(dispatchToken(result.token));
      dispatch(loggingIn());
      toast.success('Login successfull, redirecting...');
      action.resetForm();
      await delay(2000);
      router.push('/personnel/dashboard');
    } else {
      toast.error('Login failed');
    }
  };

  if(token && active){
    return <div className='hidden'></div>
  }


  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => onLogin(values, actions)}
    >
      {() => {
        return (
          <Form>
            <h1 className="text-6xl text-indigo-600 text-center mt-40 pacifico-regular">
              Fees2Pay
            </h1>
            <div className="lg:min-w-[35vw] sm:min-w-[90vw] mx-auto my-28 p-5 bg-white shadow-md rounded-lg">
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
                href="/personnel/forgot-password"
                className="underline text-blue-600"
              >
                Forgot password? Click here...
              </Link>
              <div className="flex items-center my-6 min-w-[480px]">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-sm text-gray-600">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <button className="w-full flex justify-center items-center font-semibold h-14 px-6 mt-6 text-xl text-white transition-all duration-300 bg-emerald-600 rounded-lg hover:bg-emerald-700">
                <Link
                  href="/personnel/register"
                  className="underline text-white"
                >
                  Register
                </Link>
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
