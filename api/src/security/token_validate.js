import * as jwt from "jsonwebtoken"
import { enviroment } from "../enviroment/enviroment"

export const tokenParse =  (req, res, next) => {
    try {
        const token = extractToken(req)
        if (token) {
            jwt.verify(token, enviroment.SECURITY.apiSecret, (error, decoded) => {
                console.log(error,decoded)
                if (decoded) {
                    const { id, email } = decoded
                    req.authenticated = { id, email }
                }
                next()
            })
        }else{
            next()
        }
    } catch (error) {
        next(error)
    }
}

function extractToken(req) {
    // Authorization: Bearer Token
    let token
    const authorization = req.header("authorization")
    if (authorization) {
        const parts = authorization.split(" ")
        if (parts.length === 2 && parts[0] === "Bearer") {
            token = parts[1]
        }
    }
    return token
}
