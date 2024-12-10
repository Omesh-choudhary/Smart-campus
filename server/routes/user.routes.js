import express from "express"
import { ClassData, login, registration, UserData } from "../controllers/user.controllers.js"
import tokenMiddleware from "../middlewares/auth.middleware.js"

const Router = express.Router()

Router.route("/register").post(registration)
Router.route("/login").post(login)
Router.route("/userData").get(tokenMiddleware,UserData)
Router.route("/classData").get(tokenMiddleware,ClassData)


export default Router