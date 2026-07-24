"use client";

import api from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export type CartItem = {
  id: number;
  cart_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number
  };
  total_amount: number;
};

export default function useCart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCart = async () => {
      setLoading(true);
      setError(null)
      if (!user) {
        setError("Silahkan login terlebih dahulu")
        return
      }
      try {
        const res = await api.get("/cart", {
          signal: abortController.signal
        });
        setCartItems(res.data.data || []);
      } catch (err: unknown) {
        if (abortController.signal.aborted) return;
        let message = "Gagal memuat keranjang";
        if (err && typeof err === "object" && "response" in err) {
          const axiosErr = err as { response?: { data?: { message?: string } } };
          message = axiosErr.response?.data?.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchCart()
    return () => abortController.abort();
  }, [user])


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

  const handleClearCart = async () => {
    try {
      await api.delete("/cart")
      setCartItems([])
      toast.success("Berhasil hapus semau isi cart")
    } catch {
      toast.error("Gagal menghapus item");
    }
  }

  const idempotencyKey = useRef(uuidv4())

  const checkOut = async () => {
    try {
      const response = await api.post("/checkout", {}, {
        headers: { 'X-Idempotency-Key': idempotencyKey.current }
      })
      idempotencyKey.current = uuidv4();
      setCartItems([])
      console.log(response.data.data.redirect_url)
      window.location.href = response.data.data.redirect_url
    } catch (error) {
      console.log(error)
      toast.error("silahkan coba lagi nanti")
    }
  }


  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const handleUpdateQtyItem = (id: number, newQty: number) => {

    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty, total_amount: item.product.price * newQty } : item))

    debounceTimer.current = setTimeout(async () => {
      try {
        await api.patch(`/cart/${id}`, {
          quantity: newQty
        })
      } catch {
        toast.error("gagal memperbarui jumbalh item")
      }
    }, 500);


  }

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return { cartItems, loading, error, deletingId, handleDeleteItem, handleClearCart, checkOut, user, handleUpdateQtyItem };
}
