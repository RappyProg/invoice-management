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

export const payInvoice = async (invoice_id: string) => {
  const res = await axios.post(`${link}/invoice/payment/${invoice_id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return {
    result: res.data,
    ok: true
  };
}

export const getInvoiceById = async (invoice_id: string) => {
  const res = await axios.post(`${link}/invoice/invoice`, {invoice_id},{
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return {
    result: res.data,
    ok: true
  };
}

export const softDeleteInvoice = async (invoice_id: string) => {
  const res = await axios.post(`${link}/invoice/delete`, {invoice_id} , {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return {
    result: res.data,
    ok: true
  };
}