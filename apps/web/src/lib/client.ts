import { IClientCreate, IClientEdit } from "@/types/client";
import axios from "axios";

const link = process.env.NEXT_PUBLIC_BASE_API_URL;

export const createClient = async(data: IClientCreate) => {
    const res = await axios.post(`${link}/client/create`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return {result: res.data, ok: true};
}

export const editClient = async(data: IClientEdit) => {
    const res = await axios.post(`${link}/client/edit/${data.id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return {result: res.data, ok: true};
}

export const deleteClient = async(id: number) => {
    const res = await axios.delete(`${link}/client/delete/${id}`);
    return {result: res.data, ok: true};
}

export const getClients = async() => {
    const res = await axios.get(`${link}/client/list`);
    return {result: res.data, ok: true};
}