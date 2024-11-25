import express from "express"
import { getCartItems, addCartItem, updateCartItem, getSingleCartItem,deleteCartItem } from "../controllers/cartControllers.js"
const router = express();

router.get("/cart", getCartItems);

router.get("/cart/:id", getSingleCartItem);

router.get("/addCartItem", addCartItem);

router.get("/updateCartItem", updateCartItem);

router.get("/deleteCartItem", deleteCartItem);


export default router;