import Hotel from '../models/Hotel.js'
import User from '../models/User.js'

import { createError } from '../utils/error.js'
import tokenManager from '../utils/tokenManager.js'


/* UPDATE */
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const updatedUser = await User.findByIdAndUpdate(id, {
            ...req.body// update the value that req.body provided or using (...req.body)
        },{new: true})
        res.status(200).json(updatedUser)
    } catch(e) {
        next(e)
    }
}

/* DELETE */
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedUser = await User.findByIdAndDelete(id)
        res.status(200).json({msg:"User has been deleted"})
    } catch(e) {
        next(e)
    }
}

/* GET SINGLE*/
export const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch(e) {
        next(e)
    }
}

/* GET */
export const getUser = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch(e) {
        next(e)
    }
}


