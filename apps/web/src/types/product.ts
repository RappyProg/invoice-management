export interface IProduct{
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface IProductCreate {
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface IProductEdit {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}