import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { RequestPayload } from './request.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  use(request: RequestPayload, res: Response, next: NextFunction) {
    const token: string = this.extractTokenFromHeader(request)
    if (token) {
      try {
        request['user'] = this.jwt.verify(token, {
          secret: process.env.JWT_SECRET,
        })
      } catch {
        throw new UnauthorizedException()
      }
    } else {
      request['user'] = undefined
    }

    next()
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
