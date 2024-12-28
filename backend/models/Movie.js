import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        // required: true
    },
    description:{
        type: String,
        required: true
    },
    genres:[{
        type: String,
    }],
    showTime:[{
        date:{type: Date, required: true},
        time:{type: String, required: true},
        capacity: {type: Number, required: true},
        reservedSeats:{type:[Number], default:[]},
        // unique: true

    }]
})

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;