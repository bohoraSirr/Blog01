import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../store/authSlice'
import authService from '../../appwrite/Auth'


function LogoutBtn() {
  const dispatch = useDispatch()
  const logouthandler = () => {
    authService
    .logout()
    .then(() => dispatch(logout()))
    .catch((error) => console.log("Logout failed :: error",error));
  }
  return (
  <button
  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 text-black rounded-full'
  onClick={logouthandler}>
    Logout
  </button>
  )
}

export default LogoutBtn