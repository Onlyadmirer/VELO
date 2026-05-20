import api from "@/lib/axios";
import { LoginForm, AuthResponse, registForm } from "@/types/auth";
import axios from "axios";

export async function registerUser(data: registForm) {

  try {
    const response = await api.post<AuthResponse>("/users/register", data)
    return response.data.message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    }

    throw new Error("Unexpected Error")
  }
}

export async function loginUser(data: LoginForm) {
  try {
    const response = await api.post<AuthResponse>("/users/login", data)
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
    const response = await api.get<AuthResponse>(`/users/verify?token=${token}`)
    return response.data.message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    }

    throw new Error("Unexpected Error")
  }
}

