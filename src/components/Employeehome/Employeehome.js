import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { baseURL } from '../../api/api';
import './Employeehome.css'; 
import {useDispatch,useSelector} from 'react-redux';
import { clearAuth } from '../../Redux/Userslice';
const Employeehome = () => {

  const navigator = useNavigate()
  const redirectToLeaveForm = () => {
    navigator('/leaveform');
  };

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAuth());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };
  const user = useSelector((state) => state.user); 
  const applicant_id = user.user.id
  const [leavedetails,setLeavedetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}leavemanagement/retrieveleavedetails/${applicant_id}/`);
        setLeavedetails(response.data);
      } catch (error) {
        console.error("Error fetching leavedetails:", error);
      }
      finally {
    console.log("task finished") 
    }
    };
    fetchData();
  }, []);


  return (
    <div>
      <h1 className='ml-[350px] text-6xl pt-[100px] pb-5 text-black'>Welcome to the Leave Submission Application</h1>
      <h2 className='ml-[800px] pb-5 text-4xl text-black'>Leave Requests</h2>
      <h1 className=' text-black text-3xl pb-3'>Employee Name : {user.user.name}</h1>
      <table>
        <thead>
          <tr>
            <th className='text-black'>Leave id</th>
            <th className='text-black'>Type</th>
            <th className='text-black'>Start Date</th>
            <th className='text-black'>End Date</th>
            <th className='text-black'>Status</th>
          </tr>
        </thead>
        {leavedetails.map(leave =>(
        <tbody>
          {/* Sample data for demonstration purposes */}
          <tr>
            <td className='text-black'>{leave.id}</td>
            <td className='text-black'>{leave.type_of_leave}</td>
            <td className='text-black'>{leave.startdate}</td>
            <td className='text-black'>{leave.enddate}</td>
            <td className='text-black '>{leave.status}</td>
          </tr>

          {/* Add more rows for additional leave requests */}
        </tbody>))}
      </table>
      <div className="buttons-container">
        <button onClick={logout} className="logout-button bg-red-600 transform transition-transform hover:scale-110 hover:bg-red-600">Logout</button>
        <button onClick={redirectToLeaveForm} className="new-leave-button bg-green-600 transform transition-transform hover:scale-110 hover:bg-green-600">New Leave</button>
      </div>
    </div>
  );
};

export default Employeehome;
