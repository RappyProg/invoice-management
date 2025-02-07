export interface IClient{
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    paymentMethod: string;
}

export interface IClientCreate{
    name: string;
    address: string;
    email: string;
    phone: string;
    paymentMethod: string;
}

export interface IClientEdit{
    id?: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    paymentMethod: string;
}