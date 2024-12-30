import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    genres:[{
        type: String,
        required: true
    }],
    showTime:[{
        date:{type: Date, required: true},
        time:{type: String, required: true, unique: true},
        capacity: {type: Number, required: true},
        reservedSeats:{type:[Number], default:[]},

    }]
})

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;