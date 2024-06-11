import React,{useState} from 'react';
import axios from 'axios'
import { baseURL } from '../../api/api';
import './Signup.css'
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Signup() {


const navigator = useNavigate();
  const redirectToEmployeeLogin = () => {
    navigator('/');
  };

  const redirectToManagerLogin = () => {
    navigator('/managerlogin');
  };

const [role, setRole] = useState('');
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const [roleError, setRoleError] = useState('');
const [usernameError, setUsernameError] = useState('');
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [confirmPasswordError, setConfirmPasswordError] = useState('');

const handleRoleChange = (e) => {
  setRole(e.target.value);
  console.log(e.target.value);
};

const changeUsername = (event) => {
      setUsername(event.target.value);
      setUsernameError('');
    }
const changeEmail = (event) => {
      const emailValue = event.target.value;
      setEmail(emailValue);
      if (!isValidEmail(emailValue)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }

const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };


const changePassword = (event) => {
      setPassword(event.target.value);
      setPasswordError('');
    }
const changeConfirmPassword = (event) => {
      setConfirmPassword(event.target.value);
      setConfirmPasswordError('');
    }

const handleSubmit = (event) => {
      event.preventDefault();
      if (username.trim() === '' || email.trim() === '' || role.trim() === ''|| password.trim() === '' || confirmPassword.trim() === '') {
          if (username.trim() === '') {
              setUsernameError('User name is required');
          }
          if (email.trim() === '') {
              setEmailError('Email is required');
          }
          if (role.trim() === '') {
              setRoleError('Role is required');
          }
          if (password.trim() === ''){
            setPasswordError('Password is required')
          }
          
          if (confirmPassword.trim() === '') {
              setConfirmPasswordError('Confirm Your Password');
          }
      } else if (password !== confirmPassword) {
          setConfirmPasswordError('Passwords do not match');
      }
      else {
          axios.post(`${baseURL}authentication/usersignup/`, {
              user_name: username,
              email: email,
              role: role,
              password: password,
              confirm_password:confirmPassword,
          }).then((response) => {
              toast.success("User Registered Successfully");
              setUsername('');
              setEmail('');
              setRole('');
              setPassword('');
              setConfirmPassword('');

              const role = response.data.role;
              if (role === 'manager') {
                navigator('/managerlogin');
              } else if (role === 'employee') {
                navigator('/');
              } else {
                navigator('/signup');
              }
            }).catch((error) =>{
              if (error.code === 'ERR_BAD_REQUEST'){
                  setEmailError(error.response.data.email ? error.response.data.email : '')
                  setPasswordError(error.response.data.password ? error.response.data.password : '')
                  setUsernameError(error.response.data.firstname ? error.response.data.firstname : '')
              }
            
          });
      }
  }



  return (
    <MDBContainer fluid className='pt-6'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
              <p className="text-white-50 mb-5">You are recommended to regiser here...</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' value={username} onChange={changeUsername} className={`text-white form__field ${usernameError ? 'error' : ''}`} labelClass='text-white' label='Username' id='formControlLg' type='text' size="lg"/>
              {usernameError && <p className={'error-message'}>{usernameError}</p>}
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' value={email} onChange={changeEmail} className={`text-white form__field ${emailError ? 'error' : ''}`} label='Email address' id='formControlLg' type='email' size="lg"/>
             {emailError && <p className={'error-message'}>{emailError}</p>}

             {/* ROLE */}
              <div className='mb-4 mx-5 w-100'>
      <label className='text-white' htmlFor='formControlLg'>Please Select Your Role</label>
      <select
        className={`text-black form-control form-control-lg form__field ${passwordError ? 'error' : ''}`}
        id='formControlLg'
        value={role}
        onChange={handleRoleChange}
      >
        <option value='' disabled>Select Role</option>
        <option value='employee'>Employee</option>
        <option value='manager'>Manager</option>
      </select>
      {roleError && <p className={'error-message'}>{roleError}</p>}
    </div>
            {/* ROLE */}
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' value={password} onChange={changePassword} className={`text-white form__field ${passwordError ? 'error' : ''}`} label='Password' id='formControlLg' type='password' size="lg"/>
              {passwordError && <p className={'error-message'}>{passwordError}</p>}
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white'  value={confirmPassword} onChange={changeConfirmPassword} className={`text-white form__field ${confirmPassword ? 'error' : ''}`} label='Confirm Password' id='formControlLg' type='password' size="lg"/>
              {confirmPasswordError && <p className={'error-message'}>{confirmPasswordError}</p>}

              <MDBBtn outline onClick={handleSubmit} className='mx-2 px-5' color='white' size='lg'>
                Signup
              </MDBBtn>


              <div>
                <p className="mb-0 mt-4">Are you a Manager? <a onClick={redirectToManagerLogin} style={{cursor:"pointer"}} class="text-white-50 fw-bold">Manager Login</a></p>
                <p className="mb-0 mt-4">Are you an Employee? <a onClick={redirectToEmployeeLogin} style={{cursor:"pointer"}} class="text-white-50 fw-bold">Employee Login</a></p>

              </div>
            </MDBCardBody>
          </MDBCard>
<h1 className='text-3xl text-black ml-[660px]'> Register here as new Employee or Manager  </h1>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;