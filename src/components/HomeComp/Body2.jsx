import { BsStars } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";

const Body2 = () => {
  return (
<div className="mt-16 mb-24 px-4 sm:px-6 md:px-10 flex justify-center">
  <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* Card 1 */}
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10
    rounded-3xl p-6 flex flex-col items-center text-center
    hover:scale-[1.03] transition-all duration-300
    hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]">

      <MdOutlinePeopleAlt className="text-5xl mb-4 text-emerald-400 group-hover:scale-110 transition" />

      <h1 className="text-xl font-semibold mb-2">
        Real People. Different Views.
      </h1>

      <p className="text-sm text-gray-300 opacity-80">
        More than like-minded — understand the other side too.
      </p>
    </div>

    {/* Center Image */}
    <div className="relative flex items-center justify-center lg:row-span-2">

      {/* Glow */}
      <div className="absolute w-[300px] h-[300px] bg-emerald-500/10 blur-3xl rounded-full"></div>

      <img
        src="/chat.png"
        alt="Debate Chat"
        className="relative w-full max-w-md object-contain
        rounded-3xl border border-white/10
        shadow-[0_0_50px_rgba(0,0,0,0.6)]
        hover:scale-[1.02] transition duration-300"
      />
    </div>

    {/* Card 2 */}
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10
    rounded-3xl p-6 flex flex-col items-center text-center
    hover:scale-[1.03] transition-all duration-300
    hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">

      <BsStars className="text-5xl mb-4 text-purple-400 group-hover:scale-110 transition" />

      <h1 className="text-xl font-semibold mb-2">
        AI That Gets It
      </h1>

      <p className="text-sm text-gray-300 opacity-80">
        Every opinion is analyzed and rated with AI.
      </p>
    </div>

    {/* Card 3 */}
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10
    rounded-3xl p-6 flex flex-col items-center text-center
    hover:scale-[1.03] transition-all duration-300
    hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">

      <BiWorld className="text-5xl mb-4 text-blue-400 group-hover:scale-110 transition" />

      <h1 className="text-xl font-semibold mb-2">
        Global Reach
      </h1>

      <p className="text-sm text-gray-300 opacity-80">
        Connect with people from around the world instantly.
      </p>
    </div>

    {/* Card 4 */}
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10
    rounded-3xl p-6 flex flex-col items-center text-center
    hover:scale-[1.03] transition-all duration-300
    hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]">

      <MdSecurity className="text-5xl mb-4 text-emerald-400 group-hover:scale-110 transition" />

      <h1 className="text-xl font-semibold mb-2">
        Opinion Security
      </h1>

      <p className="text-sm text-gray-300 opacity-80">
        Your views are protected with strong encryption.
      </p>
    </div>

  </div>
</div>
  )
}

export default Body2