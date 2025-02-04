import { IInvoiceItems } from "./invoiceItems";

export interface IInvoice{
    id?: string;
    client_id: string;
    personnel_id: string;
    status: string;
    createdAt?: string;
    dueDate?: string
    total: number;
    invoiceItems: IInvoiceItems[];
    pdfPath?: string;
}