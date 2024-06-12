import React from 'react'
import './Managerhome.css';
import {useDispatch,useSelector} from 'react-redux';
import { clearAuth } from '../../Redux/Userslice';
const Managerhome = () => {

    const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAuth());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/managerlogin';
  };
  return (
    <div>
        <button onClick={logout} className=" mt-2 ml-2 logout-button bg-red-600 transform transition-transform hover:scale-110 hover:bg-red-600">Logout</button>
      <h1 className='ml-[350px] text-6xl pt-[100px] pb-5 text-black'>Welcome to the Leave Submission Application</h1>
      <h2 className='ml-[800px] pb-5 text-4xl text-black'>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th className='text-black'>S No</th>
            <th className='text-black'>Name</th>
            <th className='text-black'>Reason</th>
            <th className='text-black'>Start Date</th>
            <th className='text-black'>End Date</th>
            <th className='text-black'>Total Leaves</th>
            <th className='text-black text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data for demonstration purposes */}
          <tr>
            <td className='text-black'>1</td>
            <td className='text-black'>Aravind Suresh</td>
            <td className='text-black'>Vacation</td>
            <td className='text-black'>2024-06-15</td>
            <td className='text-black'>2024-06-20</td>
            <td className='text-black'>10</td>
            <div className="buttons-container">
        <button className="logout-button bg-red-600 transform transition-transform hover:scale-110 hover:bg-red-600">Decline</button>
        <button  className="new-leave-button bg-green-600 transform transition-transform hover:scale-110 hover:bg-green-600">Accept</button>
      </div>
          </tr>
          {/* Add more rows for additional leave requests */}
        </tbody>
      </table>
    </div>
  )
}

export default Managerhome