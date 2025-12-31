import React, { useState } from 'react'
import { MdNotificationImportant } from 'react-icons/md'

const Notification = () => {

 const [notification , setNotification] = useState([])

 if (notification.length === 0) {
     return(
        <div className='flex flex-col items-center justify-center  mt-50 '>
           <MdNotificationImportant className='text-green-600' size={100} />
           <h1> No Notifications is There!</h1>
           <p className='text-2xl text-gray-500'> no notifications OR your all caught Up!</p>
        </div>
     )
 }

  return (
    <div>
     {notification.map(() => (
        <div>

        </div>
     ))}  
    </div>
  )
}

export default Notification
