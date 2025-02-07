'use client'
import { getInvoices, softDeleteInvoice } from "@/lib/invoices";
import { IInvoice } from "@/types/invoices";
import { useEffect, useState } from "react";
import InvoiceTable from "./TableComp";
import { useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";
import DeleteModal from "./DeleteModalComponent";
import { toast } from "react-toastify";

export default function InvoiceList(){
    const [invoices, setInvoices] = useState<IInvoice[]>([]);
    const [deletingInvoice, setdeletingInvoice] = useState<IInvoice | null>(null);
    const personnel = useAppSelector(state => state.personnel.profile);
    const router = useRouter();

    useEffect(() =>{
        fetchInvoices();
    }, [])

    if(!personnel){
        router.push('/');
        return null;
    }

    const fetchInvoices = async () => {
        const { result, ok } = await getInvoices(personnel.id.toString());
        if(ok) setInvoices(result.invoices);
    }

    const handleDelete = async (id: string) => {
        const param = new URLSearchParams(window.location.search);
        await softDeleteInvoice(id);
        setdeletingInvoice(null);
        param.delete('delete');
        toast.success('Invoice deleted successfully');
        await fetchInvoices();
      };
      const openDeleteModal = (invoice: IInvoice) => {
        const param = new URLSearchParams(window.location.search);
        console.log(param);
        param.set('delete', invoice.id || '');
        console.log(param);
        setdeletingInvoice(invoice);
        router.push(`?${param.toString()}`);
      }
      const closeDeleteModal = () => {
        const param = new URLSearchParams(window.location.search);
        setdeletingInvoice(null);
        param.delete('delete');
        router.push(`?${param.toString()}`);
      }
    
    return(
        <div className="m-5 p-7 bg-white w-full min-h-[81vh] rounded-xl">
            <InvoiceTable invoices={invoices} onDeleteModal={openDeleteModal}/>
            <DeleteModal deletingInvoice={deletingInvoice} onClose={closeDeleteModal} onDelete={handleDelete} />
        </div>
    )
}