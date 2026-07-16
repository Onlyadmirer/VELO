"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type ProductsType = {
  id: number;
  name: string;
  stock: number;
  category: string;
  price: number;
  image: string;
};

function ProductsItem() {
  const [datas, setDatas] = useState<ProductsType[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        });
        const result = await response.json();
        setDatas(result);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const toRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className='grid grid-cols-3 gap-8 p-6'>
      {datas.map((data) => (
        <Link
          key={data.id}
          href={`/products/${data.id}`}
          className='flex flex-col dark:bg-neutral-800 h-96 w-70 gap-2 justify-between overflow-hidden rounded-lg'
        >
          <div className='relative h-full'>
            <Image
              src={data.image}
              alt='product-img'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover w-full h-full '
            />
          </div>
          <div className='flex-1 flex flex-col gap-2 p-4'>
            <p className='text-lg font-semibold'>{data.name}</p>
            <p className='text-sm font-light'>{data.category}</p>
            <p>{toRupiah(data.price)}</p>
            <Button
              onClick={(e) => handleButtonClick(e)}
              className='flex flex-row gap-2 rounded-md'
            >
              <ShoppingBag />
              Add to cart
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductsItem;
