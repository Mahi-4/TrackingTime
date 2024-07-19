import React from 'react'
import loginimg from './assets/loginimg.png';
import { Link } from 'react-router-dom';
import './component.css';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';

function LoginSuccess() {
  const navigate = useNavigate();
  const handleTracking = () => {
    navigate('/main');
  }

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate('/login');
      alert('You have logged out');
    } catch (error) {
      console.error("Error Logging out", error.message);
    }
  }

  return (
    <div className='container'>
      <div className='successfulLogin' >
        <div className='loginComponent'>
          <img src={loginimg} id='loginimg'></img>
          <h3>Login Successful</h3>
          <button id='goToBtn' onClick={handleTracking}>Go to Tracking Screen</button>
          <Link id='logout' onClick={handleLogout}>Logout</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginSuccess