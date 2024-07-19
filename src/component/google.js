import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import './component.css'
import { auth,db } from './firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {setDoc,doc} from "firebase/firestore"



function Google() {
  function googleLogin(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then(async (result)=>{
      console.log(result);
      const user=result.user;
      if(result.user){
        await setDoc(doc(db,"Users",user.uid),{
          email:user.email,
          UserName:user.displayName,
        });
        alert('You are logged in Successfully');
        window.location.href="/loginSuccess";
      }
    })
  }

  return (
    <div >
      <div id='element4'></div>
      <p id='element2'>Or sign in with</p>
      <div></div>
      <div id='footer' onClick={googleLogin}>
      <FcGoogle size={40} />
    </div>
    </div>
  )
}

export default Google