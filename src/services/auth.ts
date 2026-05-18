import { registForm } from "@/types/auth";

export async function registerUser(data: registForm) {
  const response = await fetch("https://api-velo.onrender.com/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.Message)
  }

  return result
}