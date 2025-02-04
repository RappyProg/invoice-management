'use client';
import { getClients } from "@/lib/client";
import { getProducts } from "@/lib/product";
import { IClient } from "@/types/client";
import { IInvoice } from "@/types/invoices";
import { IProduct } from "@/types/product";
import { useState } from "react";



export default function DashboardComponent() {
  const [clients, setClients] = useState<IClient | null>(null);
  const [products, setProducts] = useState<IProduct | null>(null);
  const [invoices, setInvoices] = useState<IInvoice | null>(null);
  
  const fetchClients = async () => {
    const {result, ok} = await getClients()
    if(ok){
      setClients(result)
    }
  }
  const fetchProducts = async () => {
    const {result, ok} = await getProducts()
    if(ok){
      setProducts(result)
    }
  }

  return (
    <div></div>
  );
}
