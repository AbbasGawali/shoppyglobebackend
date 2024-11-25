import express from "express"
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userControllers.js";
 
const router = express();


router.get("/", getAllUsers);

router.get("/user/:id", getSingleUser);

router.get("/addUser", addUser);

router.get("/updateUser", updateUser);

router.get("/deleteUser", deleteUser);



export default router;