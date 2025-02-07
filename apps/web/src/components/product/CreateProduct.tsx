'use client';
import { createProduct } from '@/lib/product';
import { IProductCreate } from '@/types/product';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const ProductSchema = yup.object().shape({
  name: yup.string().required('Name cannot be empty'),
  description: yup.string(),
  price: yup.number().required('Price needs to be defined'),
  stock: yup.number(),
});

export default function CreateProductForm() {
  const onCreateProduct = async (
    data: IProductCreate,
    action: FormikHelpers<IProductCreate>,
  ) => {
    const { result, ok } = await createProduct(data);
    if (ok) {
      toast.success('Product created successfully');
      action.resetForm();
    } else {
      toast.error('Failed to create product. Please try again');
    }
  };
  return (
    <Formik
      initialValues={{ name: '', description: '', price: 0, stock: 0 }}
      validationSchema={ProductSchema}
      onSubmit={(values, actions) => onCreateProduct(values, actions)}
    >
      {() => (
        <Form>
          <div className="lg:min-w-[35vw] sm:min-w-[90vw] mx-auto my-28 p-5 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold leading-7 text-gray-900 text-center">
              Create New Product
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
              Enter product details to create a new record.
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name:
              </label>
              <Field
                name="name"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
              </Field>
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Description:
              </label>
              <Field
                name="description"
                as="textarea"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
              </Field>
              <ErrorMessage
                name="description"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Price:
              </label>
              <Field
                name="price"
                type="number"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
              </Field>
              <ErrorMessage
                name="price"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Stock
              </label>
              <Field
                name="stock"
                type="number"
                className="block w-full rounded-lg border-2 border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
              </Field>
              <ErrorMessage
                name="stock"
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
