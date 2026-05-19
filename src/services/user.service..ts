import api from "@/lib/axios";
import { RegisterResponse, registForm } from "@/types/auth";
import axios from "axios";

export async function registerUser(data: registForm) {

  try {
    const response = await api.post<RegisterResponse>("/users/register", data)
    return response.data.message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    }

    throw new Error("Unexpected Error")
  }
}

export async function verifyEmail(token: string) {
  try {
    const response = await api.get<RegisterResponse>(`/users/verify?token=${token}`)
    return response.data.message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    }

    throw new Error("Unexpected Error")
  }
}

