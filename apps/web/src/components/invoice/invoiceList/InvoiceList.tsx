'use client'
import { getInvoices } from "@/lib/invoices";
import { IInvoice } from "@/types/invoices";
import { useEffect, useState } from "react";
import InvoiceTable from "./TableComp";
import { useAppSelector } from "@/app/store/hooks";

export default function InvoiceList(){
    const [invoices, setInvoices] = useState<IInvoice[]>([]);
    const personnel = useAppSelector(state => state.personnel.profile);
    if(!personnel) throw new Error("Personnel not found");

    const fetchInvoices = async () => {
        const { result, ok } = await getInvoices(personnel.id.toString());
        if(ok) setInvoices(result.invoices);
    }

    useEffect(() =>{
        fetchInvoices();
    }, [])
    return(
        <div className="m-5 p-7 bg-white w-full min-h-[81vh] rounded-xl">
            <InvoiceTable invoices={invoices}/>
        </div>
    )
}