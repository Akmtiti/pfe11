import express from "express"
import courseModel from "../models/courseModel.js"
import { createCourse } from "../controllers/course.js"
import branchModel from "../models/branch.js"
import userModel from "../models/userModel.js"
const router = express.Router()

const schemes = {
  user : userModel,
  branch: branchModel,
  class: branchModel,
}

const createCustom = async (req, res) => {
  console.log(req.body)
  try {
    var createdDocument
    switch (req.body.scheme) {
      case "branch":
        return (createdDocument = await branchModel.create(req.body))

      default:
        break
    }

    res.send(createdDocument)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getCustom = async (req, res) => {
  console.log(req.body)

  const schemes = {
    branch: branchModel,
    class: branchModel,
  }
  const selectedScheme = schemes[req.body.scheme]
  try {
    var fetchedDocument
    fetchedDocument = await selectedScheme.find()
    switch (req.body.method) {
      case "get":
        fetchedDocument = await branchModel.find()
        break
      case "post":
        fetchedDocument = await branchModel.find()
        break

      default:
        break
    }

    res.send(fetchedDocument)
  } catch (error) {
    res.status(500).send(error)
  }
}

const custom = async (req, res) => {
  const { filters = {}, fields = {}, selectedId } = req.body
  console.log(req.body)

  const selectedScheme = schemes[req.body.scheme]
  try {
    var returnedDocument
    switch (req.body.method) {
      case "get":
        returnedDocument = await selectedScheme.find(filters, {...fields, password : 0, passwordRecovery :0, refreshToken :0, token : 0})
        break
      case "post":
        returnedDocument = await selectedScheme.create(req.body)
        break
      case "patch":
        returnedDocument = await selectedScheme.findOneAndUpdate(
          { _id: selectedId },
          { $set: req.body },
          { returnOriginal: false }
        )
        break
      case "delete":
        await selectedScheme.deleteOne(selectedId)
        returnedDocument = "Delete one success."
        break

      default:
        returnedDocument = "Method is missing."
        break
      }

        res.send(returnedDocument)
  } catch (error) {
    res.status(500).send(error)
  }
}

router.post("/custom", custom)
router.post("/custom/createCustom", createCustom)
router.post("/custom/getCustom", getCustom)

export default router
