import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";



function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp></SignUp>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
