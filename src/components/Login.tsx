import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { UserProps } from 'myTypes';
import { FC } from 'react';


export const Login: FC<UserProps|never> = ({user}):JSX.Element|never => {

  const [loginEmail , setLoginEmail] = useState('')
  const [loginPassword , setLoginPassword] = useState('')
  let navigate = useNavigate();

  useEffect(() => {
    if(auth.currentUser && user){
      navigate('/')
    }
  }, [])

  const login = async (loginEmail:string, loginPassword:string) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
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
                login(loginEmail, loginPassword)}}>
          <div className="text-center mb-3">    
            <p className="text-muted fw-bold">
              Log in to see photos and videos from your friends.
            </p>
          </div>
          <div className="mb-3">
            <a className="btn btn-primary d-block bg-gradient" href="#"><i className="fab fa-facebook"></i> Log in with facebook</a>
            <p className="my-3 text-center or">
              OR
            </p>
          </div>
          <div className="form-floating mb-3">
            <input className="form-control" name="email" placeholder="Mobile Number or Email"  type="email" onChange={(e) => setLoginEmail(e.target.value)}/><label>Mobile Number or Email</label>
          </div>
          <div className="form-floating mb-3">
            <input className="form-control" name="password" placeholder="Password"  type="password" onChange={(e) => setLoginPassword(e.target.value)}/><label>Password</label>
          </div>
          <div className="mb-2">
            <button className="btn btn-primary fw-bold w-100 bg-gradient" type="submit">Log in</button>
          </div>
        </form>
        <div className="bg-white py-4 px-5 text-center border mt-4">
          <p className="m-0">
           You don't have account yet ? <Link to="/register">Register</Link>
          </p>
        </div>  
      </div>
    </div>
  </div>
</section>
  )
}
