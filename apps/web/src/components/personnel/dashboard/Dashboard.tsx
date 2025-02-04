'use client';
import { dashboardClients } from "@/lib/client";
import { IClient } from "@/types/client";
import { useEffect, useState } from "react";



export default function DashboardComponent() {
  const [clients, setClients] = useState<IClient[]>([]);
  
  const fetchClients = async () => {
    const {result, ok} = await dashboardClients()
    if(ok){
      setClients(result.clients)
    }
  }
  useEffect(() => {
    fetchClients()

  }, [])
  console.log(clients)
  return (
    <div className="flex flex-col w-full p-4 m-4 rounded-lg">
      <h1 className="w-full text-center text-4xl mb-5">New clients for today</h1>
      <div className="grid grid-cols-3 grid-flow-row gap-4 max-h-[700px] overflow-y-auto">
        {clients.map((client) => (
          <div key={client.id} className="flex flex-col p-4 border-2 border-black bg-white rounded-lg my-2">
            <div className="flex justify-between">
              <h1>{client.name}</h1>
              <h1>{client.email}</h1>
            </div>
            <div className="flex justify-between">
              <h1>{client.phone}</h1>
              <h1>{client.paymentMethod}</h1>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
}
