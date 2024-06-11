import React,{useState} from 'react';
import axios from 'axios';
import axiosInstance,{ baseURL } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
function Leaveform() {

const user = useSelector((state) => state.user);
const [startdate, setStartDate]                 = useState('');
const [enddate, setEndDate]                     = useState('');
const [reason, setReason]                       = useState(''); 

const [startdateerror, setStartDateError]                 = useState('');
const [enddateerror, setEndDateError]                     = useState('');
const [reasonerror, setReasonError]                       = useState(''); 

const changStartDate = (event) => {
    setStartDate(event.target.value);
    setStartDateError('');
  };

const changEndDate = (event) => {
    setEndDate(event.target.value);
    setEndDateError('');
  };

const changReason = (event) => {
    setReason(event.target.value);
    setReasonError('');
  };

const handleSubmit = (event) => {
    event.preventDefault();

    if (startdate.trim() === '' || enddate.trim() === '' || reason.trim() === '' ) {
      if (startdate.trim() === '') {
        setStartDateError(' A Startdate is required');
      }
      if (enddate.trim() === '') {
        setEndDateError('An Enddate is required');
      }
      if (reason.trim() === '') {
        setReasonError('Please mention the vacation type');
      }
    } else {
      
      axiosInstance
        .post(`${baseURL}/api/leavemanagement/leavesubmission/`, {
          startdate: startdate,
          enddate: enddate,
          type_of_leave:reason,
          applicant:user.user.id,
        }, { withCredentials: true })
        .then((response) => {
          console.log(response.data)
          toast.success("Application Submitted Successfully")
          setEndDate('');
          setStartDate('');
          setReason('');
          navigator('/leaveform');
        })
        .catch((error) => {
          console.log(error)
        });
    }
    };
const navigator = useNavigate();
  const redirectToEmployeeHome = () => {
    navigator('/employeehome');
  };

  return (
    <>
    <a onClick={redirectToEmployeeHome} className='text-black text-2xl cursor-pointer ml-2'>Go Back</a>
    <h1 className='text-4xl text-black pt-[100px] ml-[730px]'> Apply For A New Leave Here </h1>
    <MDBContainer fluid className='pt-[10px]'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-5 text-uppercase">Leave Application Form</h2>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' value={startdate} onChange={changStartDate} className={`text-white form__field ${startdateerror ? 'error' : ''}`} labelClass='text-white' label='Startdate' id='formControlLg' type='text' size="lg"/>
              {startdateerror && <p className="error-message">{startdateerror}</p>}
              <MDBInput wrapperClass='mb-4 mx-5 w-100' value={enddate} onChange={changEndDate} className={`text-white form__field ${enddateerror ? 'error' : ''}`} labelClass='text-white' label='Enddate' id='formControlLg' type='text' size="lg"/>
            {enddateerror && <p className="error-message">{enddateerror}</p>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' value={reason} onChange={changReason} className={`text-white form__field ${reasonerror ? 'error' : ''}`} labelClass='text-white' label='Leave   Type' id='formControlLg' type='text' size="lg"/>
             {reasonerror && <p className="error-message">{reasonerror}</p>}
              <MDBBtn outline onClick={handleSubmit} className='mx-2 px-5 mb-4 bg-[#ffc700] text-black transform transition-transform hover:scale-110 hover:bg-[#ffc700]'
 color='white' size='lg'>
                Apply
              </MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer></>
  );
}

export default Leaveform;