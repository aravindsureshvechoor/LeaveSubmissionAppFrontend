import './App.css';
import Employeelogin from "./components/Employeelogin/Employeelogin";
import Managerloginbox from './components/Managerlogin/Managerlogin';
import Signup from './components/Signup/Signup';
import Employeehome from './components/Employeehome/Employeehome';
import Leaveform from './components/Leaveform/Leaveform';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Employeelogin/>}/>
        <Route path='/managerlogin' element={<Managerloginbox/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/employeehome' element={<Employeehome/>}/>
        <Route path='/leaveform' element={<Leaveform/>}/>
      </Routes>
    </Router>
  );
}

export default App;
