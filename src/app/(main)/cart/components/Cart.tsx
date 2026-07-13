"use client";

import { useAuth } from "@/providers/AuthProvider";
import { redirect } from "next/navigation";

function Cart() {
  const { user, loading } = useAuth();

  if (!user) {
    redirect("/login");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>sudah login</div>;
}

export default Cart;
