import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route exact path='/' element={<PrivateRoute component={Dashboard}/>}/>
                  <Route exact path='/login' element={<Login/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
