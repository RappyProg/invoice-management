'use client';
import { register } from '@/lib/personnel';
import { IRegister } from '@/types/personnel';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  name: yup.string().required('Cannot be empty'),
  email: yup.string().email('Invalid email').required('Cannot be empty'),
  password: yup
    .string()
    .required('Cannot be empty')
    .min(8, 'Password must be at least 8 characters'),
});

export default function RegisterForm() {
  const router = useRouter();
  const onRegister = async (
    data: IRegister,
    action: FormikHelpers<IRegister>,
  ) => {
    const { result, ok } = await register(data);
    if (ok) {
      toast.success(
        'Registration successfull, please check your email to verify your account',
      );
      action.resetForm();
      router.push('/');
    } 
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={(values, actions) => onRegister(values, actions)}
    >
      {() => {
        return (
          <Form>
            <h1 className="text-6xl text-indigo-600 text-center mt-40 pacifico-regular">
              Fees2Pay
            </h1>
            <div className="lg:min-w-[35vw] sm:min-w-[90vw] mx-auto my-28 p-5 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center">
                Register
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
                Wwelcome to Fees2Pay, please register to continue
              </p>
              <div className="mt-5">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  name:
                </label>
                <Field
                  name="name"
                  type="name"
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mt-4">
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
                  className="text-red-500 text-sm"
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
                  className="text-red-500 text-sm"
                />
              </div>
              <button className="w-full flex justify-center items-center font-semibold h-14 px-6 mt-6 text-xl text-white transition-all duration-300 bg-emerald-600 rounded-lg hover:bg-emerald-700">
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
