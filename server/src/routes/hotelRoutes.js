import { Router } from "express";
import {createHotel, deleteHotel, getHotel, getSingleHotel, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../middleware/verifyMiddleware.js";

const router = Router()

// un authorize
router.get('/:id', getSingleHotel)
router.get('/', getHotel)

// admin
router.delete('/:id',verifyAdmin, deleteHotel)
router.post('/',verifyAdmin, createHotel)
router.put('/:id',verifyAdmin, updateHotel)

export default router