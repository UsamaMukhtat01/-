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
    if(req?.user?.role==='User'){
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

export const updateMovie = async(req, res, next)=>{
    
    if(req.user.role === 'User'){
        return next(errorHandler(400, "You are not allowed to update the movie"))
    }
    const { movieId } = req.params;
        if (!movieId) {
            return next(errorHandler(400, "Movie ID is required"));
        }
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.movieId,{
            $set:{
                title: req.body.title,
                description: req.body.description,
                genres: req.body.genres,
                showTime: req.body.showTime
            }
        },{new: true});
        if (!updatedMovie) {
            return next(errorHandler(404, "Movie not found or could not be updated"));
        }
        res.status(200).json(updatedMovie)

    }catch(error){
        return next(error)
    }

}

export const deleteMovie = async(req, res, next)=>{
    if(req.user.role === 'User'){
        return next(errorHandler(403, "You are not allowed to delete the movie"))
    }
    const { movieId } = req.params;
        if (!movieId) {
            return next(errorHandler(400, "Movie ID is required"));
        }
    try{
        const deleteMovie = await Movie.findByIdAndDelete(req.params.movieId);
        if (!deleteMovie) {
            return next(errorHandler(404, "Movie not found or could not be deleted"));
        }
        res.status(200).json("Movie deleted successfully")

    }catch(error){
        return next(error)
    }
}

export const getMovies = async(req, res, next)=>{
    try{
        const allMovies = await Movie.find()
        res.status(200).json({message: "List of All Movies",count:allMovies.length, data: allMovies})
    }catch(error){
        next(error)
    }
}