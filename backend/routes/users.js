import express from "express";
import { getAllUsers, getUser , updateUser } from "../controllers/user.js";
import { checkUserRole, checkUserToken } from "../middleware/authentication.js";

const router = express.Router()


router.get("/find/:userId",checkUserToken, getUser)
router.get("/getAllUSers",checkUserToken, checkUserRole,getAllUsers)
router.put("/updateUser/:id",checkUserToken, checkUserRole,updateUser)


export default router