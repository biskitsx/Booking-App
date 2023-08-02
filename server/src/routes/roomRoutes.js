import { Router } from "express";
import { createRoom, deleteRoom, getRoom, getSingleRoom, updateRoom, updateRoomAvailable } from "../controllers/roomController.js";
import { verifyAdmin } from "../middleware/verifyMiddleware.js";

const router = Router()

// normal
router.get("/", getRoom)
router.get("/", getSingleRoom)
// admin
router.post('/:hotelid',verifyAdmin,  createRoom)
router.put('/:id',verifyAdmin, updateRoom)
router.put('/availablity/:id',verifyAdmin, updateRoomAvailable)
router.delete('/:id/:hotelid',verifyAdmin, deleteRoom)

export default router