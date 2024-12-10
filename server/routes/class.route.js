import express from "express"
import { createClass } from "../controllers/class.controllers"

const ClassRouter = express.Router()

ClassRouter.route("/class").post(createClass)


export default ClassRouter