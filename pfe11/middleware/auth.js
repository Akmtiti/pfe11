import jwt from "jsonwebtoken"

const secret = "test"

const auth = async (req, res, next) => {

  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]
      const isCustomAuth = token.length < 500

      let decodedData

      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, secret)

        req.userId = decodedData.id
      } else {
        decodedData = jwt.decode(token)

        req.userId = decodedData.sub
      }

      next()
    }
  } catch (error) {
    console.log(error)
  }
}

export default auth

export const securityOnlySelfInformations = async (req, res, next) => {
  const { id } = req.params

  if (id !== req.userId) res.status(403).send("Forbidden")

  next()
}
