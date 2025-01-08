import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const Auth = () => {

    const Navigate=useNavigate()
    const token=localStorage.getItem("auth-token");

    if(!token || token==null){

        useEffect(()=>{
            Navigate("login");
        },[token])
    }

    return <Outlet/>;


}

export default Auth
