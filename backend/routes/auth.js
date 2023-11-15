import express from 'express'
import { login,register,logout,changePassword } from '../controllers/auth.js'
import {  checkUserToken } from '../middleware/authentication.js'


const router = express.Router()


// what i
router.post("/login",login)
router.post("/register",register)
router.post("/logout",logout)
router.post("/changePassword",checkUserToken,changePassword)


export default router