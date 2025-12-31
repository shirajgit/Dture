import React, { useState } from 'react'
import { IoNotificationsSharp } from 'react-icons/io5'
import { GiBackwardTime } from "react-icons/gi";

const EndedDebates = () => {

  const [endedDebates , setEndedDebates] = useState([]);

  if(endedDebates.length === 0){
    return (
      <div className='flex flex-col items-center justify-center '>
         <GiBackwardTime className='text-green-500' size={100} /> 
         <h1> No Ended Debates!</h1>
         <p className='text-2xl text-gray-500'>Stay tuned to see the Ended Debates</p>
      </div>
    );
  }

  return (<> 
    <div>
      <IoNotificationsSharp />
    </div>
 </> )
}

export default EndedDebates
