import jwt from 'jsonwebtoken'
import jwtConfig from '../../../configs/jwt.config'
import { Payload } from '../../payload.dto'

const { secret, expiresIn } = jwtConfig

export const sign = async (payload: any) => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn
    })
}

export const verify = async (token: string) => {
    return jwt.verify(token, secret) as Payload
}