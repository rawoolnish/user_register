import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Home from './components/Home'


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  return (
    <>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route path='/login' element={<Login showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </>

  )
}

export default App;
