// pages/login.js
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Layout from './Layout'
import Profile from './Employee-dashboard/[username]/profile'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  }
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.data.message === 'ok') {
        window.location.href = `/Employee-dashboard/${username}/profile`;
          } else {
            // Handle login failure
            console.error('Login failed');
          }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };



  return (
    <div className='login_background' id='login'>
      <div className='login_heading'>
        <h2>BRANDSMASHERS</h2>
      </div>
      <div className='login_form'>
        <div className='login_form_input'>
          <div className='login_head'><h3>Login</h3></div>
          <div>
             <div className='login_form_inputs'>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
             </div>
             <div className='login_form_inputs'>
                <label htmlFor="password">Password</label>
                <input type={passwordVisible ? 'text' : 'password'} id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <i onClick={togglePasswordVisibility} className="eye-icon">
                {passwordVisible ? '👁️‍🗨️' : '👁️'}
                </i>
                <Link href="/change_password" className='for_password'>Forget password</Link>
             </div>
             <div className='login_form_inputs'>
              <button onClick={handleLogin} className='logout'>Login</button>
             </div>
             <div className='help'><p style={{textAlign:"center", margin:"30px"}}>Unable to login? Kindly connect with <u>IT Support Team</u> </p></div>
             <p>{message}</p>
      </div>
        </div>
        <div className='login_img'>
          <img src="/login_background.png" alt="Login_background" />
        </div>
      </div>
    </div>
  );
};

export default Login;