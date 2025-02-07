import { IInvoiceItems } from "./invoiceItems";

export interface IInvoice{
    id?: string;
    client_id: number;
    personnel_id: number;
    status: string;
    createdAt?: string;
    dueDate?: string
    total: number;
    invoiceItems: IInvoiceItems[];
    pdfPath?: string;
}