import api from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await api.get("/products")
    return NextResponse.json(data.data.data, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "failed to get datas" }, { status: 500 })
  }
}