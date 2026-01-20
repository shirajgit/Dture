import React from 'react'
 
import { FaRegStar } from "react-icons/fa";
import Body2 from './Body2';
import Body3 from './Body3';
import Footer from './Fotter'

const Body = () => {
  return (
    <div className="text-center px-5">

      {/* Main Heading */}
      <h1 className="pop-in font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-28">
        Step Into the Future of Free <br /> Expression
      </h1>

      {/* Subheading */}
      <h2 className="pop-in mt-6 text-lg sm:text-xl md:text-2xl">
        Join Dtrue where world debates.
      </h2>

      {/* Image */}
      <div className="my-10 flex justify-center">
        <a  href="http://play.google.com/store/apps/details?id=com.shahnoor.dtrue"> 
        <img 
          src="/start.png" 
          alt="" 
          className="w-full max-w-[1130px] h-auto pop-in1" 
        /></a>
       
      </div>

      {/* Button */}
      <div className="flex justify-center mb-50">
        <button className="bg-gray-500 flex items-center text-white font-semibold px-6 py-3 rounded-3xl">
          <FaRegStar className="mr-2 mt-1" />
          How we do this ?
        </button>
      </div>

      {/* Second Heading */}
      <h1 className="pop-in font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-10">
        Debate. Decide. Dtrue.
      </h1>

      {/* Paragraph */}
      <p className="mt-6 text-base md:text-lg  ">
        Transform Debates into Impact with Dtrue
      </p>

    
      <div ><Body2 /></div>
      <div className="mt-10"><Body3 /></div>
  <div className='m-10'> <Footer/></div>
       
    </div>
  )
}

export default Body