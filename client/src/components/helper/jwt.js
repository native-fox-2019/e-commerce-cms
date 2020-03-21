import { sign, verify } from 'jsonwebtoken'
// const secret = process.env.SECRET
const secret = 'Angels and Airwaves - Secret Crowds'

export const generatingJWT = payload => {
  return sign(payload, secret)
}

export const veryfingJWT = token => {
  return verify(token, secret)
}

// export default { generatingJWT, veryfingJWT }