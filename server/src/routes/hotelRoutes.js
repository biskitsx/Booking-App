import { Router } from "express";
import {countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getSingleHotel, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../middleware/verifyMiddleware.js";

const router = Router()

// un authorize
router.get('/find/:id', getSingleHotel)
router.get('/', getHotel)

// admin
router.delete('/:id',verifyAdmin, deleteHotel)
router.post('/',verifyAdmin, createHotel)
router.put('/:id',verifyAdmin, updateHotel)

router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)


export default router