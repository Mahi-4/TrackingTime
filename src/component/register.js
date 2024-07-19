import React from 'react'
import { useState } from 'react'
import './component.css';
import Google from './google';
import { FaRegEyeSlash } from 'react-icons/fa6'
import { useNavigate, Link} from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc } from "firebase/firestore"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUname] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username && email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            UserName: username
          });
        }
        console.log('successfull');
        alert("Register Successfully . Please Login to your account to continue");
        navigate('/login');
      } catch (error) {
        console.log(error.message);
        alert("Error While Register", error.message);
      }
    }
    else {
      alert('Please Fill in all the details or check they are valid');
    }
  };

  return (
    <div className='container'>
      <h2 id='header'>Create your new account</h2>
      <p id='sub-header'>Create an account to start looking for the food you like</p>
      <form>
        <label>Email Address</label>
        <br />
        <input
          type='email'
          className='form-control'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Username</label>
        <br />
        <input
          type='name'
          className='form-control'
          placeholder='Username'
          value={username}
          onChange={(e) => setUname(e.target.value)}
        />
        <br />
        <label>Password</label>
        <br />
        <div className='RegisterPass-icon'>
          <FaRegEyeSlash />
        </div>
        <input
          type='password'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleChecked}
            className='checkbox'
          /> <span />
          I agree with Terms and Privacy Policy
        </label>
        {isChecked ? (
          <Link to="/">
            <button id='signin' onClick={handleRegister}>Register</button>
          </Link>
        ) : (
          <button id='signin' disabled >Register</button>
        )}

      </form>
      <div><Google /></div>
      <p id='element3'>Have an account?<Link to="/login" >Sign In</Link></p>
    </div>
  )
}

export default Register