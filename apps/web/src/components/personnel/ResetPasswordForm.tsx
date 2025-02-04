'use client';
import { clearProfile } from '@/app/store/slices/personnelSlice';
import { resetPassword } from '@/lib/personnel';
import { IResetPassword } from '@/types/personnel';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const ResetPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  newPassword: yup.string().required('Password is required'),
});
export default function ResetPasswordForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const onReset = async (
    data: IResetPassword,
    action: FormikHelpers<IResetPassword>,
  ) => {
    const { result, ok } = await resetPassword(data);
    if (ok) {
      toast.success('Password reset successful');
      action.resetForm();
      dispatch(clearProfile());
      router.push('/');
    }
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={ResetPasswordSchema}
      onSubmit={(values, actions) => {
        onReset(values, actions);
      }}
    >
      {() => (
        <Form className='min-h-screen w-full flex justify-center items-center'>
          <div className="lg:min-w-[35vw] sm:min-w-[90vw] mx-auto my-28 p-5 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center">
              Reset Password
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
              Enter email and new password
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email:
              </label>
              <Field
                name="email"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              ></Field>
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                New Password:
              </label>
              <Field
                name="newPassword"
                type="password"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              ></Field>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>
            <div className="flex w-full justify-end items-center mt-6">
              <button
                type="submit"
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
