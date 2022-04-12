import React, { FC, Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config';
import { Navbar } from './Navbar'

type UserType = {
  uid: string,
  email: string,
};
interface UserProps {
  user: UserType,
}

export const Home: FC<UserProps|never> = ({user}):JSX.Element|never => {
 
  let navigate = useNavigate()
  useEffect(() => {
    if(!auth.currentUser && !user){
      console.log(auth.currentUser)
      navigate('/register')
    }
  }, [])
  
  return (
    <Fragment>
      <Navbar/>
      <div>Home</div>
    </Fragment>
  )
}
