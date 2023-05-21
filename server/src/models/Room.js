import { Schema, model } from "mongoose"

const roomSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    roomNumbers: {
        type: [{number: Number, unavailableDates: [Date]}],
        required: true,
    },
},{timestamps:true})

export default model("Room", roomSchema)