
type registForm = {
  name: string
  email: string
  password: string
}

type RegisterResponse = {
  message: string
  status: number
}


export type { registForm, RegisterResponse }