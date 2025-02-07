import { IProductCreate, IProductEdit } from '@/types/product';
import axios from 'axios';

const link = process.env.NEXT_PUBLIC_BASE_API_URL;

export const createProduct = async (data: IProductCreate) => {
  const res = await axios.post(`${link}/product/create`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return {
    result: res.data,
    ok: true,
  };
};

export const editProduct = async (data: IProductEdit) => {
  const res = await axios.post(`${link}/product/edit/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return {
    result: res.data,
    ok: true,
  };
};

export const softDeleteProduct = async (id: number) => {
  const res = await axios.delete(`${link}/product/delete/${id}`);
  return {
    result: res.data,
    ok: true,
  };
};

export const getProducts = async () => {
  const res = await axios.get(`${link}/product/list`);
  return {
    result: res.data,
    ok: true,
  };
};
