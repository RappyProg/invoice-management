'use client';

import { IInvoice } from '@/types/invoices';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface InvoiceTableProps {
  invoices: IInvoice[];
  onDeleteModal: (invoice: IInvoice) => void;
}

export default function InvoiceTable({
  invoices,
  onDeleteModal,
}: InvoiceTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageLimit = 15;

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialSearchQuery = searchParams.get('search') || '';

  const [page, setPage] = useState<number>(initialPage);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const filteredInvoices = searchQuery
    ? invoices.filter((invoice) =>
        invoice.id?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : invoices;

  const lastInvoice = page * pageLimit;
  const firstInvoice = lastInvoice - pageLimit;
  const currentInvoices = filteredInvoices.slice(firstInvoice, lastInvoice);

  const totalPages = Math.ceil(filteredInvoices.length / pageLimit) || 1;

  useEffect(() => {
    router.push(`?page=${page}&search=${encodeURIComponent(searchQuery)}`, {
      scroll: false,
    });

    if (searchQuery === '') {
      router.push(`?page=${page}`);
    }
  }, [page, searchQuery, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  return (
    <div className="flex flex-col min-h-[39vw] justify-between">
      <div>
        <div className="flex p-4">
          <input
            type="text"
            placeholder="Search by name or email"
            className="p-2 border-2 border-black rounded-md"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <table className="table-auto w-full border-2 border-black">
          <thead className="bg-gray-300 p-4 text-left">
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Created At</th>
              <th>Due Date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="p-4">
            {currentInvoices.length > 0 ? (
              currentInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="space-y-2 border-y-2 border-black"
                >
                  <td>{invoice.id}</td>
                  <td>{invoice.total}</td>
                  <td>
                    {invoice.createdAt
                      ? new Date(invoice.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                          },
                        )
                      : 'N/A'}
                  </td>
                  <td>
                    {invoice.dueDate
                      ? new Date(invoice.dueDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'N/A'}
                  </td>

                  <td
                    className={
                      invoice.status === 'PAID'
                        ? 'text-green-500'
                        : invoice.status === 'PENDING'
                          ? 'text-yellow-500'
                          : invoice.status === 'OVERDUE'
                            ? 'text-red-500'
                            : ''
                    }
                  >
                    {invoice.status}
                  </td>
                  <button
                    onClick={() => onDeleteModal(invoice)}
                    className="text-red-500 ml-10"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-evenly p-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="bg-gray-300 p-2 rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="bg-gray-300 p-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
