'use client';
import { useAppSelector } from '@/app/store/hooks';
import { getClients } from '@/lib/client';
import { createInvoice } from '@/lib/invoices';
import { getProducts } from '@/lib/product';
import { IClient } from '@/types/client';
import { IInvoiceItems } from '@/types/invoiceItems';
import { IInvoice } from '@/types/invoices';
import { IProduct } from '@/types/product';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateInvoiceForm() {
  const [clients, setClients] = useState<IClient[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<IInvoiceItems[]>([]);
  const personnel = useAppSelector((state) => state.personnel.profile);
  if (!personnel) throw new Error();
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [searchProductQuery, setSearchProductQuery] = useState<string[]>([]);

  const filteredClients = searchQuery
    ? clients.filter((client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : clients;

  const filteredProducts = (query: string) =>
    query
      ? products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase()),
        )
      : products;

  const fetchClients = async () => {
    const { result, ok } = await getClients();
    if (ok) {
      setClients(result.clients);
    }
  };
  const fetchProducts = async () => {
    const { result, ok } = await getProducts();
    if (ok) {
      setProducts(result.products);
    }
  };
  const submitInvoiceData = async (
    data: IInvoice,
    action: FormikHelpers<IInvoice>,
  ) => {
    const { result, ok } = await createInvoice(data);
    if (ok) {
      toast.success('Invoice successfully created');
      action.resetForm();
    } else {
      toast.error('Invoice creation failed, please try again');
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleProductSearchChange = (index: number, value: string) => {
    setSearchProductQuery((prevQuery) => {
      const newQuery = [...prevQuery];
      newQuery[index] = value;
      return newQuery;
    });
  };
  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  return (
    <Formik
      initialValues={{
        client_id: '',
        personnel_id: personnel.id.toString(),
        status: 'PENDING',
        total: 0,
        invoiceItems: invoiceItems,
      }}
      onSubmit={(values, action) => submitInvoiceData(values, action)}
    >
      {({ values, setFieldValue }) => {
        const addInvoiceItem = () => {
          if (products.length === 0) return;

          const defaultProduct = products[0];

          setFieldValue('invoiceItems', [
            ...values.invoiceItems,
            {
              product_id: defaultProduct.id,
              quantity: 1,
              price: defaultProduct.price,
            },
          ]);
        };

        const removeInvoiceItem = (index: number) => {
          const newItems = values.invoiceItems.filter((_, i) => i !== index);
          setFieldValue('invoiceItems', newItems);
        };

        return (
          <Form>
            <div className="p-2 m-2 flex flex-col space-y-2 spacex-3 min-h-[80vh] min-w-[80vw] bg-white rounded-lg">
              <div className="p-8 flex flex-row justify-evenly w-full border-y-8 border-black border-dotted">
                <div className="p-5 w-full flex flex-col justify-center items-center space-y-5 border-x-4 border-black">
                  <label className="text-lg font-bold underline text-center">
                    Client
                  </label>
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="p-2 border-2 border-black rounded-md"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  ></input>
                  <Field
                    name="client_id"
                    as="select"
                    className="min-w-[300px] text-center p-2"
                  >
                    <option value="" className='text-gray-500'>Select a client</option>
                    {filteredClients.map((client) => (
                      <option
                        key={client.id}
                        value={client.id}
                      >{`${client.name}`}</option>
                    ))}
                  </Field>
                </div>
                <div className="p-5 w-full flex flex-col justify-between items-center space-y-5 border-x-4 border-black">
                  <label className="text-lg font-bold underline text-center">
                    Personnel
                  </label>
                  <div className="flex flex-row justify-center space-x-5 text-xl">
                    <span>{personnel.name}</span>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="p-2 w-full border-b-8 border-black border-dotted">
                <button
                  type="button"
                  onClick={addInvoiceItem}
                  className="p-4 w-full text-end"
                >
                  Add Item{' '}
                  <FontAwesomeIcon icon={faPlus} className="text-green-500" />
                </button>
                <div className="max-h-[300px] overflow-y-auto border border-gray-300 rounded-md">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="sticky top-0 bg-gray-100 z-10">
                      <tr>
                        <th className="border border-gray-300 p-2">Product</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">
                          Price per Unit
                        </th>
                        <th className="border border-gray-300 p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="overflow-y-auto">
                      {values.invoiceItems.map((item, index) => (
                        <tr key={index}>
                          <td className="p-2 flex flex-row justify-evenly">
                            <input
                              type="text"
                              placeholder="Search by name"
                              className="p-2 border-2 border-black rounded-md"
                              value={searchProductQuery[index] || ''}
                              onChange={(e) =>
                                handleProductSearchChange(index, e.target.value)
                              }
                            />
                            <Field
                              as="select"
                              name={`invoiceItems[${index}].product_id`}
                              onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>,
                              ) => {
                                const selectedProduct = products.find(
                                  (p) => p.id === Number(e.target.value),
                                );
                                setFieldValue(
                                  `invoiceItems[${index}].product_id`,
                                  e.target.value,
                                );
                                setFieldValue(
                                  `invoiceItems[${index}].price`,
                                  selectedProduct ? selectedProduct.price : 0,
                                );
                              }}
                              className="w-full text-center"
                            >
                              {filteredProducts(
                                searchProductQuery[index] || '',
                              ).map((product) => (
                                <option key={product.id} value={product.id}>
                                  {product.name}
                                </option>
                              ))}
                            </Field>
                          </td>
                          <td className="border border-gray-300 p-2">
                            <Field
                              type="number"
                              name={`invoiceItems[${index}].quantity`}
                              min="1"
                              className="w-full text-center"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <Field
                              type="number"
                              name={`invoiceItems[${index}].price`}
                              className="w-full text-center"
                              disabled
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <button
                              type="button"
                              onClick={() => removeInvoiceItem(index)}
                              className="w-full text-center"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-red-500"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-full flex flex-row justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
