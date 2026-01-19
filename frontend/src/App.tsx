import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import TripDetails from "./pages/TripDetails"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
         <Route path="/register" element={<Register />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
          />
        <Route path="/trips/:tripId"
          element={
            <ProtectedRoute>
              <TripDetails/>
            </ProtectedRoute>
          }
          />
      </Routes>
    </BrowserRouter>
  )
}

export default App
