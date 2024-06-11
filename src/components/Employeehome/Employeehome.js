import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Employeehome.css'; // Import CSS file

const Employeehome = () => {

  const navigator = useNavigate()
  const redirectToLeaveForm = () => {
    navigator('/leaveform');
  };
  return (
    <div>
      <h1 className='ml-[350px] text-6xl pt-[100px] pb-5 text-black'>Welcome to the Leave Submission Application</h1>
      <h2 className='ml-[800px] pb-5 text-4xl text-black'>Leave Requests</h2>
      <h1 className=' text-black text-3xl pb-3'>Employee Name : Aravind Suresh</h1>
      <table>
        <thead>
          <tr>
            <th className='text-black'>S No</th>
            <th className='text-black'>Reason</th>
            <th className='text-black'>Start Date</th>
            <th className='text-black'>End Date</th>
            <th className='text-black'>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data for demonstration purposes */}
          <tr>
            <td className='text-black'>1</td>
            <td className='text-black'>Vacation</td>
            <td className='text-black'>2024-06-15</td>
            <td className='text-black'>2024-06-20</td>
            <td className='text-black bg-yellow-500'>Pending</td>
          </tr>
          <tr>
            <td className='text-black'>2</td>
            <td className='text-black'>Sick Leave</td>
            <td className='text-black'>2024-06-25</td>
            <td className='text-black'>2024-06-26</td>
            <td className='text-black bg-green-500'>Approved</td>
          </tr>
          <tr>
            <td className='text-black'>2</td>
            <td className='text-black'>Sick Leave</td>
            <td className='text-black'>2024-06-25</td>
            <td className='text-black'>2024-06-26</td>
            <td className='text-black bg-red-500'>Declined</td>
          </tr>
          {/* Add more rows for additional leave requests */}
        </tbody>
      </table>
      <div className="buttons-container">
        <button className="logout-button bg-red-600 transform transition-transform hover:scale-110 hover:bg-red-600">Logout</button>
        <button onClick={redirectToLeaveForm} className="new-leave-button bg-green-600 transform transition-transform hover:scale-110 hover:bg-green-600">New Leave</button>
      </div>
    </div>
  );
};

export default Employeehome;
