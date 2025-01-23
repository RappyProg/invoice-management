type Personnel = {
    id: number;
    email: string;
}

declare namespace Express{
    export interface Request{
        personnel?: Personnel;
    }
}