'use client'

import { editProduct, getProducts } from "@/lib/product"
import { IProduct, IProductEdit } from "@/types/product"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ProductTable from "./TableComponent"
import EditModal from "./EditModalComponent"

export default function ProductList(){
    const [products, setProducts] = useState<IProduct[]>([])
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)
    const router = useRouter()
    const fetchProducts = async()=>{
        const {result, ok} = await getProducts();
        if(ok) setProducts(result.products)
    }

    useEffect(()=>{
        fetchProducts()
    }, [])

    const handleEdit = async (data: IProductEdit)=>{
        const {ok} = await editProduct(data)
        const param = new URLSearchParams(window.location.search)
        if(ok){
            toast.success('Product edited successfully')
            param.delete('edit')
            router.push(`?${param.toString()}`)
            setEditingProduct(null)
            fetchProducts()

        }
    }
    const openEditModal = (product: IProduct)=>{
        const param = new URLSearchParams(window.location.search)
        param.set('edit', product.id.toString())
        setEditingProduct(product)
        router.push(`?${param.toString()}`)
    }
    const closeEditModal = () =>{
        const param = new URLSearchParams(window.location.search)
        param.delete('edit')
        setEditingProduct(null)
        router.push(`?${param.toString()}`)
    }
    return(
        <div className="m-5 p-7 bg-white w-full min-h-[81vh] rounded-xl">
            <ProductTable products={products} onEdit={openEditModal}/>
            <EditModal product={editingProduct} onSubmit={handleEdit} onClose={closeEditModal}/>
        </div>
    )
}