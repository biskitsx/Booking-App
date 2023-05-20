import { Router } from "express";
import { deleteUser, getSingleUser, getUser, updateUser } from "../controllers/userController.js";
import { verifyToken, verifyAdmin, verifyUser } from "../middleware/verifyMiddleware.js";

const router = Router()

// user
router.get("/:id", verifyUser,getSingleUser)
router.put('/:id', verifyUser,updateUser)
router.delete('/:id',verifyUser, deleteUser)
// admin only
router.get("/", verifyAdmin,getUser)

export default router