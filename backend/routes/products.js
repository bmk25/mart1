import express from 'express'
import { postProduct,getProducts, updateProducts, checkDate } from '../controllers/product.js'
import { checkUserRole, checkUserToken } from '../middleware/authentication.js'

const router = express.Router()


// what i
router.post("/postProduct",checkUserToken,postProduct)
router.get("/checkDate/:date",checkUserToken,checkDate)
router.get("/getProducts",checkUserToken,checkUserRole,getProducts)
router.put("/updateProducts/:id",checkUserToken,checkUserRole,updateProducts)
// router.post("/getProducts",register)


export default router