"use client";

import api from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
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
    const fetchCart = async () => {
      setLoading(true);
      setError(null)
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
    }

    fetchCart()
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

  return { cartItems, loading, error, deletingId, handleDeleteItem, handleClearCart };
}
