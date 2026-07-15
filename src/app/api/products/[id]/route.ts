import api from "@/lib/axios"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const result = await api.get(`/product/${id}`)

    return NextResponse.json(result.data.data, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "failed get data" }, { status: 500 })

  }

}