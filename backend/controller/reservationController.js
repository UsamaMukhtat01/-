import Movie from "../models/Movie.js";
import Reservation from "../models/Reservation.js";
import { errorHandler } from "../utils/error.js";


export const reserveSeat = async(req, res, next)=>{
    const {movieId, date, time, seat} = req.body;
    const userId = req.user.id;
    try{
        const movie = await Movie.findById(movieId);
        if(!movie){
            return next(errorHandler(404, "Movie not found!"))
        }
        const showTime = movie.showTime.find(st=> st.date.toISOString()=== date && st.time===time)
        if(!showTime){
            return res.status(404).json({ message: 'Showtime not found' })
        }
        if (showTime.reservedSeats.length >= showTime.capacity) {
            return res.status(400).json({ message: 'All Seats are fully booked' });
        }
        if(showTime.reservedSeats.includes(seat)){
            return res.status(400).json({message: "Seat already reserved"})
        }
            
        showTime.reservedSeats.push(seat);
        await movie.save();
        
        const reservation = new Reservation({
            user: userId,
            showTime: {movieId, date, time, seat}
        })
        await reservation.save();
        
        res.status(201).json({ message: 'Seat added successfully' });
        // res.status(201).json(reservation);

    }catch(error){
        return next(error);
    }
}

export const cancelReservation = async (req, res) => {
    try {
        // const { id } = req.params;
        // console.log("Reservation ID:", id);
        const reservation = await Reservation.findById(req.params.reservationId).populate('showTime.movieId');
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

        // if (reservation.user.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: 'Unauthorized' });
        // }

        reservation.status = 'Cancelled';
        await reservation.save();

        const movie = await Movie.findById(reservation.showTime.movieId);
        const showTime = movie.showTime.find(st => st.date.toISOString() === reservation.showTime.date && st.time === reservation.showTime.time);
        showTime.reservedSeats = showTime.reservedSeats.filter(seat => seat !== reservation.showTime.seat);
        await movie.save();

        res.status(200).json({ message: 'Reservation cancelled successfully', reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
