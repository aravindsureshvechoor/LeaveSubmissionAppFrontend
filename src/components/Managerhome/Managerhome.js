import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { baseURL } from '../../api/api';
import './Managerhome.css';
import {useDispatch,useSelector} from 'react-redux';
import { clearAuth } from '../../Redux/Userslice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const Managerhome = () => {

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const logout = () => {
    dispatch(clearAuth());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/managerlogin';
  };

  const [leavedetails,setLeavedetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}leavemanagement/retrievallleavedetails/`);
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

const acceptLeave = async (leave_id) => {
  try {
    
    const response = await axios.patch(`${baseURL}leavemanagement/acceptleave/${leave_id}/`);
    if (response.status === 200) {
      toast.success("Leave Granted");
      setLeavedetails(prevDetails =>
          prevDetails.map(leave =>
            leave.id === leave_id ? { ...leave, status: 'leave granted' } : leave
          )
        );
        navigator('/managerhome');
      console.log(response.data);
    } else {
      console.log(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}

const declineLeave = async (leave_id) => {
  try {
    
    const response = await axios.patch(`${baseURL}leavemanagement/declineleave/${leave_id}/`);
    if (response.status === 200) {
      toast.success("Declined");
      setLeavedetails(prevDetails =>
          prevDetails.map(leave =>
            leave.id === leave_id ? { ...leave, status: 'leave declined' } : leave
          )
        );
        navigator('/managerhome');
      console.log(response.data);
    } else {
      console.log(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div>
        <button onClick={logout} className=" mt-2 ml-2 logout-button bg-red-600 transform transition-transform hover:scale-110 hover:bg-red-600">Logout</button>
      <h1 className='ml-[350px] text-6xl pt-[100px] pb-5 text-black'>Welcome to the Leave Submission Application</h1>
      <h2 className='ml-[800px] pb-5 text-4xl text-black'>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th className='text-black text-center'>Emp Id</th>
            <th className='text-black text-center'>Name</th>
            <th className='text-black text-center'>Type</th>
            <th className='text-black text-center'>Start Date</th>
            <th className='text-black text-center'>End Date</th>
            <th className='text-black text-center'>Total Leaves</th>
            <th className='text-black text-center'>Status</th>
            <th className='text-black text-center'>Action</th>
          </tr>
        </thead>
        {leavedetails.map(leave =>(
        <tbody>
          {/* Sample data for demonstration purposes */}
          <tr>
            <td className='text-black text-center'>{leave.id}</td>
            <td className='text-black text-center'>{leave.applicant_user_name}</td>
            <td className='text-black text-center'>{leave.type_of_leave}</td>
            <td className='text-black text-center'>{leave.startdate}</td>
            <td className='text-black text-center'>{leave.enddate}</td>
            <td className='text-black text-center'>{leave.total_leaves_by_applicant}</td>
            <td className='text-black text-center'>{leave.status}</td>
        <button onClick={() => declineLeave(leave.id)} className="logout-button mb-2 mt-2 bg-red-600 transform transition-transform hover:scale-110 hover:bg-red-600">Decline</button>
        <button onClick={() => acceptLeave(leave.id)}  className="new-leave-button mb-2 mt-2 bg-green-600 transform transition-transform hover:scale-110 hover:bg-green-600">Accept</button>
          </tr>
          {/* Add more rows for additional leave requests */}
        </tbody>))}
      </table>
    </div>
  )
}

export default Managerhome