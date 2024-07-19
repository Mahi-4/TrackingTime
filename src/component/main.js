import './component.css';
import React, { useState, useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import  {doc , getDoc} from "firebase/firestore"
import { auth,db } from './firebase';

function UserData (){
  const [userDetails,setUserDetails]=useState(null);
  const fetchUserData=async()=>{
    auth.onAuthStateChanged(async (user)=>{
      console.log(user);
      const docRef=doc(db,"Users",user.uid);
      const docSnap =await getDoc(docRef);
      if(docSnap.exists()){
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      }
      else{
        console.log("user not found");
      }
    });
  };
  useEffect(()=>{
    fetchUserData();
  },[]);

  return (
    <div>
    {userDetails ? (
      <><h4 className='welcome-name'>!!Welcome {userDetails.UserName}!!</h4></>
    ):(<p>Loading</p>)}
    </div>
  );
};

function AnalogClock({ speed }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => new Date(prevTime.getTime() - 1000 * speed));
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [speed]);

  const secondHandStyle = {
    transform: `rotate(${time.getSeconds() * 6}deg)`
  };

  const minuteHandStyle = {
    transform: `rotate(${time.getMinutes() * 6}deg)`
  };

  const hourHandStyle = {
    transform: `rotate(${((time.getHours() % 12) * 30 + time.getMinutes() * 0.5)}deg)`
  };

  return (
    <div className='clock-container'>
      <div className="clock">
        <div className="clock-face">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="number"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <div style={{ transform: `rotate(${-i * 30}deg) translateY(-90px)` }}>
                {i === 0 ? 12 : i}
              </div>
            </div>
          ))}

          <div className="hand hour" style={hourHandStyle}></div>
          <div className="hand minute" style={minuteHandStyle}></div>
          <div className="hand second" style={secondHandStyle}></div>
        </div>
      </div>
    </div>
  );
}

const SpeedSlider = ({ speed, setSpeed }) => {
  const handleChange = (event) => {
    setSpeed(Number(event.target.value));
  };

  return (
    <div>
      
      <input
        type="range"
        min="0.1"
        max="5"
        step="0.1"
        value={speed}
        onChange={handleChange}
        className='slider'
      />
      <p id='speed'>Speed: {speed}x</p>
    </div>
  );
};


function ShareButton({ speed }) {
  const generateUrl = () => {
    const url = `${window.location.origin}?speed=${speed}&id=${uuidv4()}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  return (

    <button onClick={generateUrl} className='shareButton'>Share</button>

  );
}

const QuoteContainer = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': 'm8Y22mZuNuYYOlDn0zwrBg==GPHFkblyBJn99jzW' } 
      });
      if (response.data && response.data.length > 0) {
        const shortQuote = response.data.find(q => q.quote.length <= 200);
        if (shortQuote) {
        setQuote(response.data[0].quote);
        setAuthor(response.data[0].author);
        }
      }
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 5000); 

    return () => clearInterval(interval); 
  }, []);

 return(
  <div className="quote-container">
  <p>"{quote}"</p>
  <p>- {author}</p>
  </div>
 )
};




const MainApp = () => {
  const { search } = useLocation();
  const queryParams = queryString.parse(search);

  const [speed, setSpeed] = useState(queryParams.speed ? Number(queryParams.speed) : 1);

  useEffect(() => {
    if (queryParams.speed) {
      setSpeed(Number(queryParams.speed));
    }
  }, [queryParams.speed]);

  return (
    <div className='container'>
      <UserData/>
      <AnalogClock speed={speed} />
     
      <SpeedSlider speed={speed} setSpeed={setSpeed} />
      <QuoteContainer/>
      <ShareButton speed={speed} />
   
    </div>
  );
};


export default MainApp;
