'use client';
import { IClient } from '@/types/client';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ClientTableProps {
  clients: IClient[];
  onEditModal: (client: IClient) => void;
  onDeleteModal: (client: IClient) => void;
}

export default function ClientTable({
  clients,
  onEditModal,
  onDeleteModal,
}: ClientTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageLimit = 15;

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialSearchQuery = searchParams.get('search') || '';

  const [page, setPage] = useState<number>(initialPage);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const filteredClients = searchQuery
    ? clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : clients;

  const lastClient = page * pageLimit;
  const firstClient = lastClient - pageLimit;
  const currentClients = filteredClients.slice(firstClient, lastClient);

  const totalPages = Math.ceil(filteredClients.length / pageLimit) || 1;

  useEffect(() => {
    router.push(`?page=${page}&search=${encodeURIComponent(searchQuery)}`, {
      scroll: false,
    });

    if(searchQuery === ''){
      router.push(`?page=${page}`)
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
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="p-4">
            {currentClients.length > 0 ? (
              currentClients.map((client) => (
                <tr
                  key={client.id}
                  className="space-y-2 border-y-2 border-black"
                >
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.address}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.paymentMethod}</td>
                  <td>{client.status}</td>
                  <td className="flex justify-evenly">
                    <button
                      onClick={() => onEditModal(client)}
                      className="text-yellow-500"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      onClick={() => onDeleteModal(client)}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No clients found.
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
