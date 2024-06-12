import React,{useState} from 'react';
import './Managerlogin.css'
import axios from 'axios';
import { baseURL } from '../../api/api';
import { toast } from 'react-toastify';
import { setAccessToken, setUser } from '../../Redux/Userslice';
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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';



function Managerloginbox() {


const navigator = useNavigate();
  const redirectToEmployeeLogin = () => {
    navigator('/');
  };

  const redirectToSignup = () => {
    navigator('/signup');
  };

const dispatch = useDispatch();

const [email, setEmail]                 = useState('');
const [password, setPassword]           = useState('');
const [emailError, setEmailError]       = useState('');
const [passwordError, setPasswordError] = useState('');

const changeEmail = (event) => {
      const emailValue = event.target.value;
      setEmail(emailValue);
    
      if (!isValidEmail(emailValue)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    };
    

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };


  const changePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      if (email.trim() === '') {
        setEmailError('Email is required');
      }
      if (password.trim() === '') {
        setPasswordError('Password is required');
      }
    } else {
      
      axios
        .post(`${baseURL}authentication/userlogin/`, {
          email: email,
          password: password,
        }, { withCredentials: true })
        .then((response) => {
    if (response.data.user['role'] === 'employee') {
        toast.error("Bad credentials");
    } else {
        console.log(response.data);
        dispatch(setAccessToken({
            accessToken: response.data.data.access,
            refreshToken: response.data.data.refresh
        }));
        dispatch(setUser(response.data.user));
        toast.success('Login Successful');
        navigator('/managerhome');
    }
})
        .catch((error) => {
          if (error.response.data && error.response.data["invalid"]) {
    toast.error(error.response.data["invalid"]);}
        });
    }
    };

  return (
    <MDBContainer fluid className='pt-6'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' value={email} onChange={changeEmail} className={`text-white form__field ${emailError ? 'error' : ''}`} label='Email address' id='formControlLg' type='email' size="lg"/>
              {emailError && <p className="error-message">{emailError}</p>}
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' value={password} onChange={changePassword} className={`text-white form__field ${passwordError ? 'error' : ''}`} label='Password' id='formControlLg' type='password' size="lg"/>
              {passwordError && <p className="error-message">{passwordError}</p>}
              <MDBBtn onClick={handleLogin} outline className='mx-2 px-5' color='white' size='lg'>
                Login
              </MDBBtn>


              <div>
                <p className="mb-0 mt-4">Don't have an account? <a style={{cursor:"pointer"}} onClick={redirectToSignup} class="text-white-50 fw-bold">Sign Up</a></p>
                <p className="mb-0 mt-4">Are you an Employee? <a onClick={redirectToEmployeeLogin} style={{cursor:"pointer"}} class="text-white-50 fw-bold">Employee Login</a></p>

              </div>
            </MDBCardBody>
          </MDBCard>
<h1 className='text-3xl text-black ml-[630px]'> Manage your firm's Leave Submission With Ease </h1>
<h1 className='text-5xl text-black ml-[780px] pt-5'> Manager Login </h1>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Managerloginbox;