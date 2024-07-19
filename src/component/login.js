import React, { useState} from 'react';
import './component.css';
import Google from './google';
import { FaRegEyeSlash } from 'react-icons/fa6'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const handleSignin = async (e) => {
      e.preventDefault();
      if (email && password) {
         try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("user logged in successfully");
            alert("You have successfully logged in");
            navigate('/loginSuccess');
         } catch (error) {
            console.log(error.message);
            alert("Facing Some Error", error.message);
         }
      }
      else {
         alert('Please Fill the Credentials....')
      }

   };

   return (

      <div className='container'>
         <h2 id='header'>Login to your account.</h2>
         <p id='sub-header'>Please sign in to your account</p>
         <form>
            <label>Email Address</label>
            <br />
            <input
               type='email'
               placeholder='Enter Email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label>
            <br />
            <div className='password-icon'>
               <FaRegEyeSlash />
            </div>
            <input
               type='password'
               placeholder='Password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />

         </form>
         <p id='element1'>Forgot password?</p>
         <button id='signin' onClick={handleSignin}   >Sign In</button>
         <div><Google /></div>
         <p id='element3'>Don't have an account?<Link to="/register">Register</Link></p>
      </div>
   )
}

export default Login