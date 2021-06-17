import * as jsonwebtoken from 'jsonwebtoken'
import config from '@local/config'

type ValidateResponse = {
  id: string
  robotname: string
  iat: number
  exp: number
}

export const validateToken = (token: string): ValidateResponse => {
  return jsonwebtoken.verify(token, config.jwtSecret) as ValidateResponse
}
