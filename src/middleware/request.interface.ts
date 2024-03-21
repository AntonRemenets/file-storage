import { Request } from 'express'
import { User } from '../users/entity/user.entity'

export interface RequestPayload extends Request {
  user: User
}
