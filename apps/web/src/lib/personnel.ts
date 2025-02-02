import { ILogin, IRegister } from "@/types/personnel";
import axios from "axios";

const link = process.env.NEXT_PUBLIC_BASE_API_URL;

export const register = async (data: IRegister) =>{
    const res = await axios.post(`${link}/personnel/register`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return {result: res.data, ok: true};
}

export const verifyPersonnel = async (token: string) =>{
    const res = await axios.get(`${link}/personnel/verify/${token}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return {result: res.data, ok: true};
}

export const login = async (data: ILogin) =>{
    const res = await axios.post(`${link}/personnel/login`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return {result: res.data, ok: true};
}

