'use client';
import { softDeleteClient, editClient, getClients } from '@/lib/client';
import { IClient, IClientEdit } from '@/types/client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ClientTable from './TableComp';
import EditModal from './EditModalComponent';
import DeleteModal from './DeleteModalComponent';

export default function ClientLists() {
  const [clients, setClients] = useState<IClient[]>([]);
  const [editingClient, seteditingClient] = useState<IClient | null>(null);
  const [deletingClient, setdeletingClient] = useState<IClient | null>(null);
  const router = useRouter()
  const fetchClients = async () => {
    const { result, ok } = await getClients();
    if (ok) setClients(result.clients);
  };
  useEffect(() => {
    fetchClients();
  }, []);


  const handleEdit = async (data: IClientEdit) => {
    const { ok } = await editClient(data);
    const param = new URLSearchParams(window.location.search);
    if (ok) {
      toast.success('Client updated successfully');
      param.delete('edit');
      router.push(`?${param.toString()}`);
      seteditingClient(null);
      fetchClients();
    }
  };
  const openEditModal = (client: IClient) => {
    const param = new URLSearchParams(window.location.search);
    param.set('edit', client.id.toString());
    seteditingClient(client);
    router.push(`?${param.toString()}`);
  };

  const closeEditModal = () => {
    const param = new URLSearchParams(window.location.search);
    seteditingClient(null);
    param.delete('edit');
    router.push(`?${param.toString()}`);
  };
  const handleDelete = async (id: number) => {
    const param = new URLSearchParams(window.location.search);
    await softDeleteClient(id);
    setdeletingClient(null);
    param.delete('delete');
    toast.success('Client deleted successfully');
    await fetchClients();
  };
  const openDeleteModal = (client: IClient) => {
    const param = new URLSearchParams(window.location.search);
    console.log(param);
    param.set('delete', client.id.toString());
    console.log(param);
    setdeletingClient(client);
    router.push(`?${param.toString()}`);
  }
  const closeDeleteModal = () => {
    const param = new URLSearchParams(window.location.search);
    setdeletingClient(null);
    param.delete('delete');
    router.push(`?${param.toString()}`);
  }

  return (
    <div className="m-5 p-7 bg-white w-full min-h-[81vh] rounded-xl">
      <ClientTable
        clients={clients}
        onEditModal={openEditModal}
        onDeleteModal={openDeleteModal}
      />
      <EditModal
        editingClient={editingClient}
        onClose={closeEditModal}
        onSubmit={handleEdit}
      />
      <DeleteModal deletingClient={deletingClient} onClose={closeDeleteModal} onDelete={handleDelete} />
    </div>
  );
}
