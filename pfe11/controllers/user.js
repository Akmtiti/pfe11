import User from "../models/userModel.js"
import bcrypt from "bcrypt"
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

export const login = async (req, res) => {
  console.log(req.body)

  let count = await User.countDocuments({ email: req.body.email })

  if (count === 0) {
    return res.status(500).send("Compte introuvable.")
  }

  let result = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })

  if (result) {
    res.send(result.username)
  } else {
    res.status(500).send("Mot de passe incorrect..")
  }
}

export const signUp = async (req, res) => {
  let count = await User.countDocuments({ email: req.body.email })
  if (count > 0) return res.status(500).send("Email déjà existante.")

  User.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send("Erreur Serveur.")
    } else {
      res.status(201).send()
    }
  })
  return

  const getData = async (url) => {
    return axios.get(url).then((response) => response.data)
  }

  const registerNewUser = () => {
    let userData = {
      username: req.username,
      email: encryptedEmail,
      password: encryptedPassword,
    }

    // Create user
    User.create(userData, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(201).send(data)
      }
    })
  }

  const encryptedEmail = sha256(req.email)
  const encryptedPassword = sha256(req.password)

  /* -------------------------- Check same email used ------------------------- */
  let dbData = await getData("/getUsers")

  // Loop
  var invalid = false
  dbData.map((elem) => {
    if (elem.email == encryptedEmail) {
      invalid = true
    }
  })

  if (invalid) {
    return res.send("Email already used")
  }

  /* ------------------------------ Add new user ------------------------------ */
  registerNewUser()
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

function checkValidEmail(x) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)
}
// await User.updateMany(
//   { privilege: "teacher" },
//   { $set: { privilege: "Teacher" } }
// )
