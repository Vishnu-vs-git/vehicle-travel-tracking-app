import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import TripDetails from "./pages/TripDetails"
import { Toaster } from "sonner"
import PublicRoute from "./components/trips/PublicRoute"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicRoute>

            <Login/>
          </PublicRoute>
          } />
         <Route path="/register" element={
           <PublicRoute>

             <Register />
           </PublicRoute>
          } />
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
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  )
}

export default App
