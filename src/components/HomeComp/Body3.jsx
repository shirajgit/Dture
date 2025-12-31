import React from 'react'
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { FaFaceSmileWink } from "react-icons/fa6";

const Body3 = () => {
  return (
        <div className="mb-5 px-4 py-10 border-b border-gray-800">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">

    {/* IMAGE */}
    <div className="md:row-span-3 rounded-3xl overflow-hidden flex  items-center justify-center">
      <img
        src="/trending.png"
        alt="Trending"
        className="w-full max-w-sm md:max-w-full object-contain"
      />
    </div>

    {/* TITLE */}
    <div className="md:col-span-2 text-center md:text-left  items-center justify-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
        Dtrue’s Advanced Capabilities
      </h1>
    </div>

    {/* CARD 1 */}
    <div className="box p-6 text-white rounded-3xl  flex flex-col  items-center justify-center">
      <IoChatbubbleEllipsesSharp className="text-5xl mb-3" />
      <h1 className="text-xl font-semibold mb-2">Global Trends</h1>
      <p className="text-base opacity-80">
        Dtrue keeps you engaged with trending global topics that shape our world.
      </p>
    </div>

    {/* CARD 2 */}
    <div className=" box p-6 text-white rounded-3xl  flex flex-col  items-center justify-center">
      <CiShare2 className="text-3xl mb-3" />
      <h1 className="text-xl font-semibold mb-2">One Opinion at a Time</h1>
      <p className="text-base opacity-80">
        Join debates where every user shares.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="box p-6 text-white rounded-3xl  flex flex-col  items-center justify-center">
      <FaFaceSmileWink className="text-5xl mb-4" />
      <h1 className="text-xl font-semibold mb-2">Yours Always</h1>
      <p className="text-base opacity-80">
        Every opinion is hashed — identity stays hidden.
      </p>
    </div>

    {/* CARD 4 */}
    <div className="box p-6 text-white rounded-3xl flex flex-col  items-center justify-center">
      <FaArrowsDownToPeople className="text-4xl mb-3" />
      <h1 className="text-xl font-semibold mb-2">Raise Your Voice</h1>
      <p className="text-base opacity-80">
        One opinion. Real impact. Shaping truth — together.
      </p>
    </div>

  </div>
</div>

  )
}

export default Body3