import Hotel from '../models/Hotel.js'
import Room from "../models/Room.js";

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
        await Hotel.findByIdAndDelete(id)
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
    const {min, max, limit, ...others} = req.query
    try {
        const hotels = await Hotel.find({
            cheapestPrice: { $gt: min || 1,  $lt: max || 999 } ,
            ...others
        }).limit(limit)
        res.status(200).json(hotels)
    } catch(e) {
        next(e)
    }
}

/* GET */
export const countByCity = async (req, res, next) => {
    const cities = req.query.citites.split(",")
    try {
        const list = await Promise.all(cities.map(city=> {
            // return Hotel.find({city:city}).length
            return Hotel.countDocuments({city: city}) // same thing but much faster
        }))
        res.status(200).json(list)
    } catch(e) {
        next(e)
    }
}

/* GET */
export const countByType = async (req, res, next) => {
    try {
        const types = ["hotel", "apartment", "resort", "villa", "cabin"]
        const list = await Promise.all(types.map(type=> {
            return Hotel.countDocuments({type: type})
        }))
        const response = types.map((type, index)=> {
            return {type: type,count: list[index]}
        })
        res.status(200).json(response)
    } catch(e) {
        next(e)
    }
}

/* GET */
export const getHotelRooms = async (req, res, next) => {
    try {
        // console.log("first")
        const hotels = await Hotel.findById(req.params.id)
        const lists = await Promise.all(hotels.rooms.map(room=>{
            return Room.findById(room)
        }))
        res.status(200).json(lists)
    } catch(e) {
        next(e)
    }
}