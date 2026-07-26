export interface Users {
  id: number
  name: string
  email: string
  is_verified?: boolean
  oauth_id?: string | null
  oauth_provider?: string | null
  avatar_url?: string | null
}