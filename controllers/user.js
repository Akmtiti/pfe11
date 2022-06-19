import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendEmail } from "../functions/sendEmail.js"

const secret = process.env.ACCESS_TOKEN_SECRET || "secret"

export const deleteUser = async (req, res) => {
  const { id } = req.params

  await User.deleteOne({ _id: id })
  res.send("Delete one success.")
}
export const modifyUser = async (req, res) => {
  // Check Valid Email
  if (checkValidEmail(req.body.email)) {
    var replaceWith
    // Check if no new password is sent...
    if (!req.body.password) {
      replaceWith = {
        username: req.body.username,
        email: req.body.email,
      }
      // If a new password is sent...
    } else if (req.body.password.length > 3) {
      replaceWith = {
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
      }
      // Password too short
    } else {
      return res.send("Mot de passe doit dépasser 3 caractères")
    }

    // Modify user credentials
    await User.findOneAndUpdate(
      { username: req.body.originalUsername },
      replaceWith
    )

    res.send(req.body.originalUsername + " a été modifier")
  } else {
    res.send("Email Invalide")
  }
}

export const changePassword = async (req, res) => {
  app.post("/changePassword", async (req, res) => {
    // Find user credentials
    const user = await User.findOne({
      username: req.body.username,
    })

    if (await bcrypt.compare(req.body.initialPassword, user.password)) {
      User.findOneAndUpdate(
        { username: req.body.username },
        {
          password: await bcrypt.hash(req.body.newPassword, 10),
        },
        (err, doc, raw) => {
          res.send("Mot de passe changé")
        }
      )
    } else {
      res.status(500).send("Mot de passe initial est incorrect")
    }
  })
}

export const getFields = async (req, res) => {
  const { filter = "{}", fields = "{}" } = req.query

  let users = await User.find(JSON.parse(filter), {
    password: 0,
    passwordRecovery: 0,
    ...JSON.parse(fields),
  })

  res.send(users)
}

export const addEditUser = async (req, res) => {
  const { _id, email, password, username } = req.body

  // Edit
  if (_id) {
    let updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      { $set: req.body }
    )
    return res.send(updatedUser)
  }

  delete req.body?._id
  // Add
  if (!email || !password || !username)
    return res.status(500).send("Email, password and username are required.")

  if ((await User.countDocuments({ email: email })) !== 0)
    return res.status(500).send("Email is already used.")

  let createdUser = await User.create(req.body)
  res.send(createdUser)
}

/* #region  Auth */
export const login = async (req, res) => {
  let result = await User.findOne({
    email: req.body.email,
  })

  if (!result) {
    return res.status(500).send("Compte introuvable.")
  }

  if ((await bcrypt.compare(req.body.password, result.password)) === false)
    res.status(500).send("Mot de passe incorrect..")

  result.password = undefined
  res.send(result)
}

// Only for Student
export const signUp = async (req, res) => {
  let count = await User.countDocuments({ email: req.body.email })

  if (count > 0) return res.status(500).send("Email déjà existante.")

  await new User({ ...req.body, privilege: "Student" }).save()

  res.send()
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) return res.status(404).json("L'utilisateur n'existe pas.")

    // Token generation
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "24h",
    })

    // Send Email to user
    sendEmail({
      to: user.email,
      subject: "Récupération de mot de passe",
      text:
        "Bonjour,\n\n" +
          user.name +
          "\n\nVous avez demandé la récupération de votre mot de passe.\n\n" +
          "Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe:\n\n" +
          req.hostname ==
        "localhost"
          ? "localhost:3000"
          : "LiveSite" +
            "/new_password?token=" +
            token +
            "\n\nSi vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer ce message.\n\nCordialement,\n\nL'équipe Iber Conseils",
    })
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
}

// Reset password
export const resetPassword = async (req, res) => {
  const { password, token } = req.body
  try {
    const decoded = jwt.verify(token, secret)
    const user = await User.findOne({ email: decoded.email })


    if (!user) return res.status(404).send("L'utilisateur n'existe pas")
    const hashedPassword = await bcrypt.hash(password, 12)

    user.password = hashedPassword
    await user.save()
    res.status(200).send("Mot de passe réinitialisé")
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" })
    console.log(error)
  }
}

/* #endregion */

function checkValidEmail(x) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)
}
// await User.updateMany(
//   { privilege: "teacher" },
//   { $set: { privilege: "Teacher" } }
// )
