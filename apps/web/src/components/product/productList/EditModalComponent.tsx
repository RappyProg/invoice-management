import { IProduct, IProductEdit } from '@/types/product';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';

const EditSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  price: yup.number(),
  stock: yup.number(),
});

interface EditProductProps {
  product: IProduct | null;
  onClose: () => void;
  onSubmit: (data: IProductEdit) => void;
}

export default function EditModal({
  product,
  onClose,
  onSubmit,
}: EditProductProps) {
  if (!product) return null;
  return (
    <Dialog
      open={!!product}
      onClose={() => onClose()}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <DialogTitle
                as="h3"
                className="text-base text-center font-semibold text-gray-900"
              >
                Editing Client
              </DialogTitle>
              <Formik
                initialValues={{
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  stock: product.stock,
                }}
                validationSchema={EditSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <div className="mt-4">
                      <label>Name:</label>
                      <Field
                        name="name"
                        type="text"
                        className="block w-full rounded-lg border-2 p-3"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                    <div className="mt-4">
                      <label>Description:</label>
                      <Field
                        name="description"
                        as="textarea"
                        className="block w-full rounded-lg border-2 p-3"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                    <div className="mt-4">
                      <label>Price:</label>
                      <Field
                        name="price"
                        type="number"
                        className="block w-full rounded-lg border-2 p-3"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                    <div className="mt-4">
                      <label>Stock:</label>
                      <Field
                        name="stock"
                        type="number"
                        className="block w-full rounded-lg border-2 p-3"
                      />
                      <ErrorMessage
                        name="stock"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                    <div className="mt-4 flex justify-evenly">
                      <button
                        type="submit"
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => onClose()}
                        className="bg-gray-300 px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
