import { CreateNotification } from '@/redux/Slice/NotificationApi';
import { UpdateAllpostdata } from '@/redux/Slice/PostSlice';
import { FollowUser } from '@/redux/Slice/UserApicall';
import { UpdateAlluserdata } from '@/redux/Slice/UserSlice';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const UserSuggestion = () => {
    
  const { getAlluserdata, getalluserstatus, followuserstatus,userdata } = useSelector(
    (state) => state.user
  );

  console.log(userdata)
   const [userid, setuserid] = useState();

  const dispatch = useDispatch();

  const FollowingUser = useCallback(
    async (value) => {

      console.log(value)
      await dispatch(FollowUser(value))
        .unwrap()
        .then((res) => {
          if (res.success) {
            console.log(res);
            toast.success(res.message);
            // dispatch(Getallpostdata());
            dispatch(UpdateAllpostdata(res.postoffollowinguserdata));
            dispatch(UpdateAlluserdata(value));
            dispatch(CreateNotification({name:userdata?.name,type:"follow",reciverid:value?._id}))
          } else {
            toast.error(res.message);
          }
        });
    },
    [dispatch]
  );
  return (
   <>
   
   {getalluserstatus === "pending" ? (
                <div className="flex w-full items-center  justify-center  ">
                  <ClipLoader />
                </div>
              ) : getAlluserdata?.length > 0 ? (
                getAlluserdata?.map((value) => (
                  <div
                    key={value?._id}
                    className="flex items-center justify-between mb-4"
                  >
                    <Link
                      to={`/profile/singleuserdata/${value._id}`}
                      className="flex items-center space-x-3"
                    >
                      <div  className='flex-1 flex  gap-1 items-center'>

                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={
                          value?.avatar ||
                          "https://plus.unsplash.com/premium_photo-1681426472026-60d4bf7b69a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D"
                        }
                        alt="Suggested User"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {value?.name}
                        </h3>
                        <p className="text-xs text-gray-500">{value?.email}</p>
                      </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        FollowingUser(value), setuserid(value?._id);
                      }}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      {followuserstatus === "pending" &&
                      userid === value?._id ? (
                        <ClipLoader size="15" color="#0669eaf" loading={true} />
                      ) : (
                        "Follow"
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col gap-1 items-center justify-center h-[30vh] w-full">
                  <h1 className="cmn-text">NO user Available &#128532; </h1>
                  <p className="cmn-text text-sm">Please wait for others</p>
                </div>
              )}
   
   
   </>
  )
}

export default UserSuggestion
