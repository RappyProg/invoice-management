export interface IInvoice{
    id: string;
    client_id: string;
    personnel_id: string;
    status: string;
    total: number;
    dueDate: Date;
}