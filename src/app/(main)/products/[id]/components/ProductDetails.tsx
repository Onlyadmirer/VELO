"use client";

import { useEffect, useState } from "react";
import { ProductsType } from "../../components/ProductsItem";
import Image from "next/image";

function ProductDetails({ slug }: { slug: string }) {
  const [product, setProduct] = useState<ProductsType>();

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`/api/products/${slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      setProduct(result);
    };
    getProduct();
  }, [slug]);

  const toRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className='flex h-96 gap-4 flex-row p-4'>
      <div className='relative rounded-md flex-1 w-full h-full overflow-hidden'>
        <Image
          fill
          src={product?.image || "/placeholder.png"}
          alt={product?.name || "product-image"}
          className='w-full h-full object-cover'
        ></Image>
      </div>
      <div className='flex-col flex-1'>
        <p className='text-2xl font-semibold'>{product?.name}</p>
        <p className='text-sm font-light'>{product?.category}</p>
        <p>{toRupiah(product?.price ?? 0)}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
