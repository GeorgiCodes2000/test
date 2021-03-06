import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../scss/register.scss'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { FC } from 'react';
import { UserProps } from 'myTypes';
import { useEffect } from 'react';

export const Register:FC<UserProps|never> = ({user}):JSX.Element|never => {
let navigate = useNavigate()
useEffect(() => {
  if(auth.currentUser && user){
    navigate('/')
  }
}, [])

const [registerEmail, setRegisterEmail] = useState("");
const [registerPassword, setRegisterPassword] = useState("");
const [fullName, setFullName] = useState("");
const [username, setUsername] = useState("");

const register = async (registerEmail:string, registerPassword:string, username:string, fullName:string) => {
  const users = collection(db, "users");
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    ).then(res => {
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res));
      const saveUser = async () => {
          await addDoc(users, {
            registerEmail,
            username,
            fullName,
            followers: []
          });
        };
        saveUser()
    });
    navigate('/')
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};


  return (
    <section className="py-4">
  <div className="container">
    <div className="row d-flex align-items-center justify-content-center">
      <div style={{maxWidth: "420px"}}>
        <form className="bg-white border py-4 px-5" onSubmit={(e) => {e.preventDefault() 
                register(registerEmail, registerPassword, username, fullName)}}>
          <div className="text-center mb-3">    
            <p className="text-muted fw-bold">
              Sign up to see photos and videos from your friends.
            </p>
          </div>
          <div className="mb-3">
            <a className="btn btn-primary d-block bg-gradient" href="#"><i className="fab fa-facebook"></i> Log in with facebook</a>
            <p className="my-3 text-center or">
              OR
            </p>
          </div>
          <div className="form-floating mb-3">
            <input className="form-control" name="email" placeholder="Mobile Number or Email"  type="email" onChange={(e) => setRegisterEmail(e.target.value)}/><label>Mobile Number or Email</label>
          </div>
          <div className="form-floating mb-3">
            <input className="form-control" name="fullname" placeholder="Full Name"  type="text" onChange={(e) => setFullName(e.target.value)}/><label>Full Name</label>
          </div>
          <div className="form-floating mb-3">
            <input className="form-control" name="username" placeholder="Username"  type="text" onChange={(e) => setUsername(e.target.value)}/><label>Username</label>
          </div>
          <div className="form-floating mb-3">
            <input className="form-control" name="password" placeholder="Password"  type="password" onChange={(e) => setRegisterPassword(e.target.value)}/><label>Password</label>
          </div>
          <div className="mb-2">
            <button className="btn btn-primary fw-bold w-100 bg-gradient" type="submit">Sign Up</button>
          </div>
          <div className="small text-center">
            By signing up, you agree to our Terms , Data Policy and Cookies Policy.
          </div>
        </form>
        <div className="bg-white py-4 px-5 text-center border mt-4">
          <p className="m-0">
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </div>  
      </div>
    </div>
  </div>
</section>
  )
}
