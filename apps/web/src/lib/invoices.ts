import { IInvoice } from "@/types/invoices";
import axios from "axios";

const link = process.env.NEXT_PUBLIC_BASE_API_URL;

export const createInvoice = async (data: IInvoice) => {
  const res = await axios.post(`${link}/invoice/create`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return {
    result: res.data,
    ok: true
  };
}

export const getInvoices = async (personnel_id: string) => {
  const res = await axios.get(`${link}/invoice/list/${personnel_id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return {
    result: res.data,
    ok: true
  };
}

export const getInvoiceById = async (id: string) => {
  const res = await axios.get(`${link}/invoice/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return {
    result: res.data,
    ok: true
  };
}