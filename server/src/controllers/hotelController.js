import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'

/* CREATE */
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (e) {
        next(e)
    }
}

/* UPDATE */
export const updateHotel = async (req, res, next) => {
    try {
        const { id } = req.params
        const updatedHotel = await Hotel.findByIdAndUpdate(id, {
            $set: req.body // update the value that req.body provided
        },{new: true})
        res.status(200).json(updatedHotel)
    } catch(e) {
        next(e)
    }
}

/* DELETE */
export const deleteHotel = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedHotel = await Hotel.findByIdAndDelete(id)
        res.status(200).json({msg:"Hotel has been deleted"})
    } catch(e) {
        next(e)
    }
}

/* GET SINGLE*/
export const getSingleHotel = async (req, res, next) => {
    try {
        const { id } = req.params
        const hotel = await Hotel.findById(id)
        res.status(200).json(hotel)
    } catch(e) {
        next(e)
    }
}

/* GET */
export const getHotel = async (req, res, next) => {
    try {
        const hotels = await Hotel.find({})
        res.status(200).json(hotels)
    } catch(e) {
        next(e)
    }
}


