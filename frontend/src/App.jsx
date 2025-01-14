import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Header from "./components/Header";
import Movies from "./pages/Movies";



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
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
