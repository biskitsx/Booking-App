import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";


/** CREATE */
export const createRoom = async (req, res, next) => {
    const hotelId  = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: {rooms: newRoom._id }})
        } catch(e) {
            next(createError(402, "can't triger hotel"))
        }
        res.status(200).json(savedRoom)
    } catch(e) {
        next(createError(402, "can't save room"))
    }
}

/* UPDATE */
export const updateRoom = async (req, res, next) => {
    try {
        const { id } = req.params
        const updatedRoom = await Room.findByIdAndUpdate(id, {
            $set: req.body // update the value that req.body provided
        },{new: true})
        res.status(200).json(updatedRoom)
    } catch(e) {
        next(e)
    }
}

/* DELETE */
export const deleteRoom = async (req, res, next) => {
    const {id, hotelid} = req.params
    try {
        const deletedRoom = await Room.findByIdAndDelete(id)
        try {
            await Hotel.findByIdAndUpdate(hotelid, {
                $pull: {rooms: id}
            })
        } catch(e) {
            next(e)
        }
        res.status(200).json({msg:"Room has been deleted"})
    } catch(e) {
        next(e)
    }
}

/* GET SINGLE*/
export const getSingleRoom = async (req, res, next) => {
    try {
        const { id } = req.params
        const room = await Room.findById(id)
        res.status(200).json(room)
    } catch(e) {
        next(e)
    }
}

/* GET */
export const getRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find({})
        res.status(200).json(rooms)
    } catch(e) {
        next(e)
    }
}
