import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { jwt } from '@config/auth'
import AppError from '@shared/errors/AppError'

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers

  if (!authorization) {
    throw new AppError('Unauthorized access', 401)
    // return res.status(401).json({ Unauthorized: 'Unauthorized access' })
  }

  const [, token] = authorization.split(' ')

  try {
    const { secret } = jwt

    verify(token, secret)

    return next()
  } catch (error) {
    throw new AppError('Invalid JWT token', 401)
  }
}
