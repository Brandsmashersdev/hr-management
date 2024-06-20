// 'use client'
import { useState } from 'react';
import Link from 'next/link';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {auth} from './firebaseConfig';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';

const Login = () => {
  
  const [username, setUsername] = useState('mannmittal622@gmail.com');
  const [password, setPassword] = useState('mannmittal');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  }
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  // const handleSignUp = async () =>{
  //   try{
  //     const res = await createUserWithEmailAndPassword(username,password);
  //     sessionStorage.setItem('user',true);
  //     setUsername('');
  //     setPassword('');
  //   }catch(e){
  //     console.error(e);
  //   }
  // }
  const handleSignIn = async () =>{
    try{
      await signInWithEmailAndPassword(username,password);
      sessionStorage.setItem('user',true);
      setUsername('');
      setPassword('');
      window.location.href = `/Employee-dashboard/${username}/profile`;
    }catch(e){
      console.error(e);
    }
  }


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
              <button onClick={handleSignIn} className='logout'>Login</button>
             </div>
             <div className='help'><p style={{textAlign:"center", margin:"30px"}}>Unable to login? Kindly connect with <u>IT Support Team</u> </p></div>
             {/* <p>{message}</p> */}
      </div>
        </div>
        <div className='login_img'>
          <img src="/login_background.png" alt="Login_background" />
        </div>
      </div>
    </div>
  );
};

// export default Login;
export default dynamic(() => Promise.resolve(Login), { ssr: false });