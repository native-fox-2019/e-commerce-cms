import { sign, verify } from 'jsonwebtoken'
// const secret = process.env.SECRET
const secret = 'Angels and Airwaves - Secret Crowds'

const generatingJWT = payload => {
  return sign(payload, secret)
}

const veryfingJWT = token => {
  return verify(token, secret)
}

export default { generatingJWT, veryfingJWT }