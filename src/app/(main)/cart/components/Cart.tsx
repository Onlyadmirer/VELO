"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import { toRupiah } from "@/store/Currency";
import {
  AlertCircle,
  Loader2,
  PackageOpen,
  RefreshCw,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CartItem = {
  id: number;
  cart_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  total_amount: number;
};

function CartSkeleton() {
  return (
    <div className='space-y-4 animate-pulse'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className='flex gap-4 rounded-xl bg-card ring-1 ring-black/5 dark:ring-white/10 p-4'
        >
          <div className='size-24 rounded-lg bg-muted shrink-0' />
          <div className='flex-1 space-y-3'>
            <div className='h-5 w-1/2 rounded-lg bg-muted' />
            <div className='h-4 w-1/4 rounded-lg bg-muted' />
            <div className='h-5 w-1/3 rounded-lg bg-muted' />
          </div>
          <div className='h-9 w-20 rounded-lg bg-muted shrink-0' />
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const router = useRouter();

  const handleDeleteItem = async (itemId: number) => {
    setDeletingId(itemId);
    try {
      await api.delete(`/cart/${itemId}`);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success("Item berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus item");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/cart");
        setCartItems(res.data.data || []);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Gagal memuat keranjang";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCart();
    }
  }, [user]);

  if (!user) return null;

  const totalBelanja = cartItems.reduce(
    (sum, item) => sum + item.total_amount,
    0,
  );

  if (loading) {
    return (
      <div className='space-y-6 p-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Keranjang</h1>
          <p className='text-muted-foreground mt-1'>
            Kelola item di keranjang Anda
          </p>
        </div>
        <CartSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-6 p-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Keranjang</h1>
          <p className='text-muted-foreground mt-1'>
            Kelola item di keranjang Anda
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-4 py-20 text-center'>
          <div className='flex size-16 items-center justify-center rounded-full bg-destructive/10'>
            <AlertCircle className='size-8 text-destructive' />
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Gagal Memuat Keranjang</h3>
            <p className='text-sm text-muted-foreground mt-1'>{error}</p>
          </div>
          <Button onClick={router.refresh} variant='outline' className='gap-2'>
            <RefreshCw className='size-4' />
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className='space-y-6 p-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Keranjang</h1>
          <p className='text-muted-foreground mt-1'>
            Kelola item di keranjang Anda
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-4 py-20 text-center'>
          <div className='flex size-16 items-center justify-center rounded-full bg-muted'>
            <PackageOpen className='size-8 text-muted-foreground' />
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Keranjang Masih Kosong</h3>
            <p className='text-sm text-muted-foreground mt-1'>
              Tambahkan produk favorit Anda ke keranjang
            </p>
          </div>
          <Link href='/products'>
            <Button variant='outline' className='gap-2'>
              <ShoppingCart className='size-4' />
              Belanja Sekarang
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6 p-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Keranjang</h1>
        <p className='text-muted-foreground mt-1'>
          Kelola item di keranjang Anda
        </p>
      </div>

      <div className='space-y-4'>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className='flex gap-4 rounded-xl bg-card ring-1 ring-black/5 dark:ring-white/10 p-4'
          >
            <div className='relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted'>
              <Image
                fill
                src={item.product.image}
                alt={item.product.name}
                className='object-cover'
                sizes='96px'
              />
            </div>
            <div className='flex-1 min-w-0 flex flex-col justify-between'>
              <div>
                <p className='font-semibold leading-tight truncate'>
                  {item.product.name}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {item.product.category}
                </p>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <span className='text-muted-foreground'>Qty:</span>
                <span className='font-medium'>{item.quantity}</span>
              </div>
            </div>
            <div className='flex flex-col items-end justify-between shrink-0'>
              <p className='font-bold text-primary'>
                {toRupiah(item.total_amount)}
              </p>
              <p className='text-xs text-muted-foreground'>
                {toRupiah(item.product.price)} / item
              </p>
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-destructive'
                disabled={deletingId === item.id}
                onClick={() => handleDeleteItem(item.id)}
              >
                {deletingId === item.id ? (
                  <Loader2 className='size-4 animate-spin' />
                ) : (
                  <Trash2 className='size-4' />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className='rounded-xl bg-card ring-1 ring-black/5 dark:ring-white/10 p-6'>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>Total Belanja</p>
          <p className='text-2xl font-bold text-primary'>
            {toRupiah(totalBelanja)}
          </p>
        </div>
        <div className='flex gap-3 mt-6'>
          <Button variant='outline' className='flex-1 gap-2' disabled>
            <Trash2 className='size-4' />
            Hapus Semua
          </Button>
          <Button className='flex-1 gap-2' disabled>
            <ShoppingCart className='size-4' />
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
