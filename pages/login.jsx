// pages/login.js
import { useState } from 'react';
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Redirect to a protected page on successful login
      window.location.href = '/HR-dashboard/Profile';
    } else {
      // Handle login failure
      console.error('Login failed');
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
            <form action="" id='login_form_data'>
             <div className='login_form_inputs'>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
             </div>
             <div className='login_form_inputs'>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Link href="/change_password" className='for_password'>Forget password</Link>
             </div>
             <div className='login_form_inputs'>
              <button onClick={handleLogin}>Login</button>
             </div>
             <div><p style={{textAlign:"center"}}>Unable to login? Kindly connect with <u>IT Support Team</u> </p></div>
            </form>
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