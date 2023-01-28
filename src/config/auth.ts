import 'dotenv/config'

interface IJwt {
  secret: string
  expiresIn: string
}
const secretPass = process.env.JWT_PASS as string

export const jwt: IJwt = {
  secret: secretPass,
  expiresIn: '24h',
}
