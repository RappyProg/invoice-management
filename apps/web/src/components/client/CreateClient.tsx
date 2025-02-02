'use client';
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { createClient } from '@/lib/client';
import { IClientCreate } from '@/types/client';

const ClientSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  paymentMethod: Yup.string().required('Payment method is required'),
});

export default function CreateClientForm() {
  const onCreateClient = async (data: IClientCreate, actions: FormikHelpers<IClientCreate>) => {
    const { result, ok } = await createClient(data);
    if (ok) {
      toast.success('Client created successfully');
      actions.resetForm();
    } else {
      toast.error('Failed to create client. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        address: '',
        email: '',
        phone: '',
        paymentMethod: 'CREDIT_CARD',
      }}
      validationSchema={ClientSchema}
      onSubmit={(values, actions) => onCreateClient(values, actions)}
    >
      {() => (
        <Form>
          <div className="lg:min-w-[35vw] sm:min-w-[90vw] mx-auto my-28 p-5 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center">
              Create New Client
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
              Enter client details to create a new record.
            </p>
            <div className="mt-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name:
              </label>
              <Field
                name="name"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Address:
              </label>
              <Field
                name="address"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-sm text-red-500 mt-1"
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
                className="text-sm text-red-500 mt-1"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Phone:
              </label>
              <Field
                name="phone"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Payment Method:
              </label>
              <Field
                as="select"
                name="paymentMethod"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="DEBIT_CARD">Debit Card</option>
                <option value="PAYPAL">PayPal</option>
              </Field>
              <ErrorMessage
                name="paymentMethod"
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
