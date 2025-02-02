import { IProduct } from "@/types/product";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductTableProps{
    products: IProduct[],
    onEdit: (product: IProduct) => void
}

export default function ProductTable({products, onEdit}: ProductTableProps){
    const router = useRouter();
      const searchParams = useSearchParams();
      const pageLimit = 15;
    
      const initialPage = Number(searchParams.get('page')) || 1;
      const initialSearchQuery = searchParams.get('search') || '';
    
      const [page, setPage] = useState<number>(initialPage);
      const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
    
      const filteredProducts = searchQuery
        ? products.filter(
            (product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : products;
    
      const lastProduct = page * pageLimit;
      const firstProduct = lastProduct - pageLimit;
      const currentProducts = filteredProducts.slice(firstProduct, lastProduct);
    
      const totalPages = Math.ceil(filteredProducts.length / pageLimit) || 1;
    
      useEffect(() => {
        router.push(`?page=${page}&search=${encodeURIComponent(searchQuery)}`, {
          scroll: false,
        });
    
        if(searchQuery === ''){
          router.push(`?page=${page}`)
        }
      }, [page, searchQuery, router]);
    
      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1);
      };
    
      const nextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
      };
    
      const prevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
      };
    return(
        <div className="flex flex-col min-h-[39vw] justify-between">
              <div>
                <div className="flex p-4">
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="p-2 border-2 border-black rounded-md"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <table className="table-auto w-full border-2 border-black">
                  <thead className="bg-gray-300 p-4 text-left">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="p-4">
                    {currentProducts.length > 0 ? (
                      currentProducts.map((product) => (
                        <tr
                          key={product.id}
                          className="space-y-2 border-y-2 border-black"
                        >
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td className="flex justify-evenly">
                            <button
                              onClick={() => onEdit(product)}
                              className="text-yellow-500"
                            >
                              <FontAwesomeIcon icon={faPenToSquare
                              } />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center py-4">
                          No Products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
        
              <div className="flex justify-evenly p-4">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="bg-gray-300 p-2 rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={page === totalPages}
                  className="bg-gray-300 p-2 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
    )
}