import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Header from "./components/Header";
import Movies from "./pages/Movies";
import MoviesDetails from "./pages/MoviesDetails";
import CreateMovie from "./pages/Admin/CreateMovie";



function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/movies' element={<Movies></Movies>}></Route>
        <Route path='/movieDetails' element={<MoviesDetails></MoviesDetails>}></Route>
        <Route path="/createMovie" element={<CreateMovie></CreateMovie>}></Route>
      </Routes>
        {/* <PrivateRoutes>
        </PrivateRoutes> */}
      </BrowserRouter>

    </>
  )
}

export default App
