import jwt from 'jsonwebtoken'
import type { ValidateResponse } from '~/types'

export const generateToken = (params = {}) : string => {
  return jwt.sign(params, process.env.PRIVATE_KEY ?? 'test-key', {
    expiresIn: 86400
  })
}

export const validateToken = (token: string) => {
  return jwt.verify(token, process.env.PRIVATE_KEY ?? 'test-key') as ValidateResponse
}
