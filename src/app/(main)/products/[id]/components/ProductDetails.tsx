"use client";

import { useEffect, useState } from "react";
import { ProductsType } from "../../components/ProductsItem";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, PackageOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toRupiah } from "@/store/Currency";
import api from "@/lib/axios";
import useProduct from "../../service/useProduct";

function ProductDetails({ slug }: { slug: string }) {
  const [product, setProduct] = useState<ProductsType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { addToCart } = useProduct();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/product/${slug}`);
        setProduct(response.data.data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className='p-6 animate-pulse space-y-6'>
        <div className='h-5 w-16 rounded-lg bg-muted' />
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='relative aspect-square md:aspect-auto md:h-128 w-full md:w-1/2 rounded-xl bg-muted' />
          <div className='flex-1 space-y-4'>
            <div className='h-8 w-3/4 rounded-lg bg-muted' />
            <div className='h-5 w-1/4 rounded-lg bg-muted' />
            <div className='h-7 w-1/3 rounded-lg bg-muted' />
            <div className='h-10 w-full rounded-4xl bg-muted' />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-20 text-center p-6'>
        <div className='flex size-16 items-center justify-center rounded-full bg-muted'>
          <PackageOpen className='size-8 text-muted-foreground' />
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Produk Tidak Ditemukan</h3>
          <p className='text-sm text-muted-foreground mt-1'>
            Produk yang Anda cari tidak tersedia atau telah dihapus.
          </p>
        </div>
        <Button variant='outline' onClick={() => router.push("/products")}>
          Kembali ke Produk
        </Button>
      </div>
    );
  }

  return (
    <div className='p-6 flex flex-col gap-6'>
      <button
        onClick={() => router.back()}
        className='flex flex-row items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit'
      >
        <ArrowLeft size={18} />
        <span className='text-sm font-medium'>Kembali</span>
      </button>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='relative aspect-square md:aspect-auto md:h-128 w-full md:w-1/2 overflow-hidden rounded-xl bg-muted'>
          <Image
            fill
            src={product.image}
            alt={product.name}
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
        <div className='flex flex-col gap-4 flex-1'>
          <div>
            <span className='inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium'>
              {product.category}
            </span>
          </div>
          <h1 className='text-3xl font-bold tracking-tight'>{product.name}</h1>
          <p className='text-2xl font-bold text-primary'>
            {toRupiah(product.price)}
          </p>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-muted-foreground'>Stok:</span>
            {product.stock > 0 ? (
              <span className='font-medium text-green-600 dark:text-green-400'>
                {product.stock} tersedia
              </span>
            ) : (
              <span className='font-medium text-destructive'>Stok Habis</span>
            )}
          </div>
          <div className='pt-4'>
            <Button
              disabled={product.stock <= 0}
              className='w-full sm:w-auto gap-2'
              onClick={(e) => addToCart({ e, productId: product.id })}
              size='lg'
            >
              <ShoppingBag className='size-5' />
              {product.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
