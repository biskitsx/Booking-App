import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

userSchema.statics.register = async (username, email, password)=> {
    try {
        // validator
        if (!username || !email || !password) {
            throw Error("all field is required")
        }

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({username, email, password: hash})
        return user 
    } catch(e) {
        throw e
    }
}

userSchema.statics.login = async (username, password) => {
    try {
        // check username
        const user = await User.findOne({username})
        if (!user) throw Error("Wrong Username")
        // check password
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw Error("Wrong password")

        user.password = undefined
        delete user.password
        // user.isAdmin = undefined
        // delete user.isAdmin
        return user
    } catch(e) {
        throw e
    }
}
const User = model("User", userSchema)
export default User