import { IClient, IClientEdit } from "@/types/client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

const EditSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
  paymentMethod: yup.string().required(),
  status: yup.string().required(),
});

interface EditModalProps{
    editingClient: IClient | null;
    onClose: () => void;
    onSubmit: (data: IClientEdit) => void;
}

export default function EditModal({editingClient, onClose, onSubmit}: EditModalProps){
    if(!editingClient) return null;
    return(
        <Dialog open={!!editingClient} onClose={() => onClose()} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <DialogTitle as="h3" className="text-base text-center font-semibold text-gray-900">
                    Editing Client
                  </DialogTitle>
                  <Formik
                    initialValues={{
                      id: editingClient.id,
                      name: editingClient.name,
                      address: editingClient.address,
                      email: editingClient.email,
                      phone: editingClient.phone,
                      paymentMethod: editingClient.paymentMethod,
                      status: editingClient.status,
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
                          <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                        <div className="mt-4">
                          <label>Address:</label>
                          <Field
                            name="address"
                            type="text"
                            className="block w-full rounded-lg border-2 p-3"
                          />
                          <ErrorMessage name="address" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                        <div className="mt-4">
                          <label>Email:</label>
                          <Field
                            name="email"
                            type="email"
                            className="block w-full rounded-lg border-2 p-3"
                          />
                          <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                        <div className="mt-4">
                          <label>Phone:</label>
                          <Field
                            name="phone"
                            type="text"
                            className="block w-full rounded-lg border-2 p-3"
                          />
                          <ErrorMessage name="phone" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                        <div className="mt-4">
                          <label>Payment Method:</label>
                          <Field
                            as="select"
                            name="paymentMethod"
                            className="block w-full rounded-lg border-2 p-3"
                          >
                            <option value='' className='text-gray-500 opacity-50' defaultChecked>Select Payment Method</option>
                            <option value="CREDIT_CARD">Credit Card</option>
                            <option value="DEBIT_CARD">Debit Card</option>
                            <option value="PAYPAL">PayPal</option>
                          </Field>
                          <ErrorMessage name="paymentMethod" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                        <div className="mt-4">
                          <label>Status:</label>
                          <Field
                            as="select"
                            name="status"
                            className="block w-full rounded-lg border-2 p-3"
                          >
                            <option value='' className='text-gray-500 opacity-50' defaultChecked>Select Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                          </Field>
                          <ErrorMessage name="status" component="div" className="text-sm text-red-500 mt-1" />
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
    )
}