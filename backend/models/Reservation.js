import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    showTime: {
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Movie',
            required: true
        },
        date:{
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        seat: {
            type: Number,
            required: true
        }
    },
    status: {
        type: String,
        enum:['Upcoming', 'Completed'],
        default: "Upcoming"
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema)

export default Reservation;