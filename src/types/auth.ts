
type registForm = {
  name: string
  email: string
  password: string
}

type AuthResponse = {
  message: string
  status: number
}

type LoginForm = {
  email: string
  password: string
}


export type { registForm, AuthResponse, LoginForm }