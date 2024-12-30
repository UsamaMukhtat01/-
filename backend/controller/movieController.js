import Movie from "../models/Movie.js";
import { errorHandler } from "../utils/error.js";


export const createMovie = async(req, res, next)=>{
    const {title, description, genres, showTime} = req.body;

    if(!title ||
        !description ||
        !genres ||
        !showTime ||
        title==='' ||
        description===''||
        genres===''||
        showTime===''
    ){
        next(errorHandler(400, 'All fields are mendetory to fill!'))
    }
    if(req.user.role==='User'){
        return next(errorHandler(403, "You are not allowed to create movie"))
    }

    const movie = new Movie({
        title, description, genres, showTime
    });
    try{
        await movie.save();
        res.json("Movie added Successfully!")
    }catch(error){
        return next(error)
    }
}

