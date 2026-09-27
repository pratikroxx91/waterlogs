import './App.css';
import { Routes, Route } from "react-router";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import UserDashboard from "./pages/dashboard/UserDashboard.jsx";
import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import PublicReports from "./pages/reports/PublicReports.jsx";
import Navbar from './components/Navbar.jsx';
import CreateReport from './pages/reports/CreateReport.jsx';
import ReportDetails from './pages/reports/ReportDetails.jsx';
import waterlogging from './assets/waterlogging.jpg';

function App() {

  return (
    <>
      <div className='min-h-screen bg-cover bg-center bg-fixed'
        style={{
          backgroundImage: `linear-gradient(rgba(15, 15, 20, 0.75), rgba(15, 15, 20, 0.75)), url(${waterlogging})`
        }}>
        <div className='body container mx-auto px-6'>
          <Navbar />
          <Routes>
            <Route path="/" element={<PublicReports />} />
            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user_dashboard" element={<UserDashboard />} />
            <Route path="/admin_dashboard" element={<AdminDashboard />} />
            <Route path="/create_report" element={<CreateReport />} />
            <Route path="/reports/:id" element={<ReportDetails />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
