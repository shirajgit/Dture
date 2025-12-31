import { BsStars } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";

const Body2 = () => {
  return (
    <div className="mt-10 mb-21 px-4 sm:px-6 md:px-10 items-center justify-center ">
      <div className="grid   sm:grid-cols-2 md:grid-cols-3 gap-3 ">

        {/* Card 1 */}
        <div className="bg-green-500 w-100 h-60 box text-white rounded-3xl p-6 flex items-center justify-center flex-col">
          <MdOutlinePeopleAlt className="text-5xl mb-2" />
          <h1 className="text-[20px] font-semibold leading-tight mb-1">Real People. Different Views.</h1>
          <p className="text-[15px] leading-snug opacity-70">
            More than like-minded — understand the other side too.
          </p>
        </div>

        {/* Middle Image spanning 2 rows on large screens */}
        <div className="row-span-1 lg:row-span-2 w-full">
          <img
            src="/chat.png"
            alt="Middle"
            className="w-full h-auto object-contain rounded-3xl"
          />
        </div>

        {/* Card 2 */}
        <div className="bg-green-500 w-100 h-60 box text-white rounded-3xl items-center justify-center p-6 flex flex-col">
          <BsStars className="text-4xl mb-4" />
          <h1 className="text-[25px] font-semibold leading-tight mb-1">AI That Gets It.</h1>
          <p className="text-[20px] leading-snug opacity-70">
            Every Opinion, AI-Reviewed & Rated.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-green-500 w-100 h-60 box text-white rounded-3xl items-center justify-center p-6 flex flex-col">
          <BiWorld className="text-5xl mb-4" />
          <h1 className="text-[25px] font-semibold leading-tight mb-1">Global Reach</h1>
          <p className="text-[20px] leading-snug opacity-70">
            Connect with people from around the world effortlessly.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-green-500 w-100 h-60 box text-white rounded-3xl p-6 items-center justify-center flex flex-col mb-50">
          <MdSecurity className="text-6xl mb-4" />
          <h1 className="text-[20px] font-semibold leading-tight mb-1">End-to-End Opinion Security</h1>
          <p className="text-[15px] leading-snug opacity-70">
            We lock it. We hash it. Not even we know what you said.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Body2