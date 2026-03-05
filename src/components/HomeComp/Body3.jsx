import React from 'react'
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { FaFaceSmileWink } from "react-icons/fa6";

const Body3 = () => {
  return (
  <div className="relative mb-10 px-4 py-16 border-b border-white/10 overflow-hidden">

  {/* background glow */}
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full"></div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto relative">

    {/* IMAGE */}
    <div className="md:row-span-3 flex items-center justify-center">
      <img
        src="/trending.png"
        alt="Trending"
        className="w-full max-w-sm md:max-w-md object-contain
        rounded-3xl border border-white/10
        shadow-[0_0_50px_rgba(0,0,0,0.6)]
        hover:scale-[1.02] transition duration-300"
      />
    </div>

    {/* TITLE */}
    <div className="md:col-span-2 text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
        Dtrue’s{" "}
        <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
          Advanced Capabilities
        </span>
      </h1>

      <p className="text-gray-400 mt-4 max-w-xl">
        Powerful debate features designed to amplify voices, protect identity,
        and surface the most important conversations worldwide.
      </p>
    </div>

    {/* CARD 1 */}
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10
    p-6 rounded-3xl flex flex-col items-center text-center
    hover:scale-[1.03] transition duration-300
    hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]">

      <IoChatbubbleEllipsesSharp className="text-5xl mb-4 text-emerald-400 group-hover:scale-110 transition" />

      <h1 className="text-xl font-semibold mb-2">Global Trends</h1>

      <p className="text-sm text-gray-300 opacity-80">
        Stay engaged with trending global topics shaping the world.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10
    p-6 rounded-3xl flex flex-col items-center text-center
    hover:scale-[1.03] transition duration-300
    hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">

      <CiShare2 className="text-5xl mb-4 text-purple-400 group-hover:scale-110 transition" />

      <h1 className="text-xl font-semibold mb-2">One Opinion at a Time</h1>

      <p className="text-sm text-gray-300 opacity-80">
        Join debates where every voice matters.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10
    p-6 rounded-3xl flex flex-col items-center text-center
    hover:scale-[1.03] transition duration-300
    hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">

      <FaFaceSmileWink className="text-5xl mb-4 text-blue-400 group-hover:scale-110 transition" />

      <h1 className="text-xl font-semibold mb-2">Yours Always</h1>

      <p className="text-sm text-gray-300 opacity-80">
        Every opinion is securely hashed — your identity stays private.
      </p>
    </div>

    {/* CARD 4 */}
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10
    p-6 rounded-3xl flex flex-col items-center text-center
    hover:scale-[1.03] transition duration-300
    hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]">

      <FaArrowsDownToPeople className="text-5xl mb-4 text-emerald-400 group-hover:scale-110 transition" />

      <h1 className="text-xl font-semibold mb-2">Raise Your Voice</h1>

      <p className="text-sm text-gray-300 opacity-80">
        One opinion. Real impact. Shape the truth together.
      </p>
    </div>

  </div>
</div>

  )
}

export default Body3