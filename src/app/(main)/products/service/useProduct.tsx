"use client";

import api from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface ButtonAddToCart {
  e: React.MouseEvent;
  productId: number;
}

export default function useProduct() {
  const { user } = useAuth();
  const router = useRouter();
  const addToCart = async ({ e, productId }: ButtonAddToCart) => {
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

  return { addToCart };
}
