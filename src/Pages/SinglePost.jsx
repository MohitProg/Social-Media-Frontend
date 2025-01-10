import Newpost from '@/Components/Newpost';
import { ViewPost } from '@/redux/Slice/PostApiSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

const SinglePost = () => {

    const pathname=useLocation().pathname;
    const postid=pathname?.split("/")[2];
    console.log(postid);
    const dispatch=useDispatch()

    const {viewpoststatus,singlepostdata}=useSelector((state)=>state.post);
    console.log(singlepostdata)

    useEffect(()=>{
    
dispatch(ViewPost(postid))
    },[postid])
  return (
    <div className='w-[70%] mx-auto mt-5'>
        {singlepostdata!==null? <Newpost value={singlepostdata} />:<div className='w-full flex items-center justify-center'>
            <h1> OOPS ! Post is Not Available to view </h1>
            
            </div>}
      
    </div>
  )
}

export default SinglePost
