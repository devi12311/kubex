import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoutes";
import Dashboard from "./components/Dashboard.tsx";
import Login from "./components/Login";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route exact path='/' element={<PrivateRoute component={Dashboard}/>}/>
                  <Route exact path='/login' element={<PublicRoutes component={Login}/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
