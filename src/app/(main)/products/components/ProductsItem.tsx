"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toRupiah } from "@/store/Currency";
import { ShoppingBag, PackageOpen, AlertCircle, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SkeletonCard from "./SkeletonCard";
import { useAuth } from "@/providers/AuthProvider";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/products");
        setDatas(response.data.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleButtonClick = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      toast.error("Silahkan login terlebih dahulu");
      return;
    }
    try {
      const res = await api.post("/cart", {
        product_id: productId,
        quantity: 1,
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Gagal menambahkan ke keranjang");
    }
  };

  if (loading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-20 text-center'>
        <div className='flex size-16 items-center justify-center rounded-full bg-destructive/10'>
          <AlertCircle className='size-8 text-destructive' />
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Gagal Memuat Produk</h3>
          <p className='text-sm text-muted-foreground mt-1'>{error}</p>
        </div>
        <Button onClick={router.refresh} variant='outline' className='gap-2'>
          <RefreshCw className='size-4' />
          Coba Lagi
        </Button>
      </div>
    );
  }

  if (datas.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-20 text-center'>
        <div className='flex size-16 items-center justify-center rounded-full bg-muted'>
          <PackageOpen className='size-8 text-muted-foreground' />
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Belum Ada Produk</h3>
          <p className='text-sm text-muted-foreground mt-1'>
            Produk akan segera tersedia. Silakan kembali lagi nanti.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {datas.map((data) => (
        <div
          key={data.id}
          className='group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-black/5 dark:ring-white/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'
        >
          <Link href={`/products/${data.id}`} className='flex flex-col flex-1'>
            <div className='relative aspect-4/5 overflow-hidden'>
              <Image
                src={data.image}
                alt={data.name}
                fill
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
                className='object-cover group-hover:scale-105 transition-transform duration-500'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <span className='absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground'>
                {data.category}
              </span>
              {data.stock <= 0 && (
                <span className='absolute top-3 right-3 rounded-full bg-destructive/90 px-3 py-1 text-xs font-medium text-destructive-foreground'>
                  Habis
                </span>
              )}
            </div>
            <div className='flex flex-col gap-1.5 p-4 flex-1'>
              <p className='text-base font-semibold leading-tight line-clamp-2'>
                {data.name}
              </p>
              <p className='text-sm text-muted-foreground'>{data.category}</p>
              <p className='text-lg font-bold text-primary'>
                {toRupiah(data.price)}
              </p>
            </div>
          </Link>
          <div className='px-4 pb-4'>
            <Button
              onClick={(e) => handleButtonClick(e, data.id)}
              disabled={data.stock <= 0}
              className='w-full mb-4 rounded-lg gap-2'
              size='sm'
            >
              <ShoppingBag className='size-4' />
              {data.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsItem;
