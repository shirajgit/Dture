import React from 'react'
 
import { FaRegStar } from "react-icons/fa";
import Body2 from './Body2';
import Body3 from './Body3';
import Footer from './Fotter'

const Body = () => {
  return (
    <div className="relative overflow-hidden text-center px-5">
  {/* Background Glow */}
  <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
  <div className="pointer-events-none absolute top-20 -left-24 h-[420px] w-[420px] rounded-full bg-purple-500/10 blur-3xl" />
  <div className="pointer-events-none absolute bottom-0 -right-32 h-[460px] w-[460px] rounded-full bg-indigo-500/10 blur-3xl" />

  {/* Top Section */}
  <div className="relative mx-auto max-w-6xl pt-28">
    {/* Small badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg shadow">
      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      <p className="text-sm text-gray-200">
        Welcome to <span className="text-emerald-300 font-semibold">Dtrue</span> • Debate platform
      </p>
    </div>

    {/* Main Heading */}
    <h1 className="mt-8 font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08]">
      Step Into the Future of{" "}
      <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-purple-300 bg-clip-text text-transparent">
        Free Expression
      </span>
      <br />
      Where opinions become outcomes.
    </h1>

    {/* Subheading */}
    <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300">
      Join <span className="text-emerald-300 font-semibold">Dtrue</span> — where the world debates, votes, and decides.
    </p>

    {/* CTA Row */}
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="http://play.google.com/store/apps/details?id=com.shahnoor.dtrue"
        className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl
                   bg-gradient-to-r from-emerald-600 to-green-600
                   hover:from-emerald-500 hover:to-green-500
                   border border-white/10 shadow-[0_0_30px_rgba(34,197,94,0.22)]
                   transition-all duration-200 active:scale-[0.98]"
      >
        <span className="text-xl">📲</span>
        <span className="font-semibold text-white">Get it on Google Play</span>
        <span className="opacity-70 group-hover:opacity-100 transition">→</span>
      </a>

      <button
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                   bg-white/5 hover:bg-white/10 backdrop-blur-lg
                   border border-white/10 text-white font-semibold
                   shadow transition-all duration-200 active:scale-[0.98]"
      >
        <FaRegStar className="text-emerald-300" />
        How we do this?
      </button>
    </div>

    {/* Image Section */}
    <div className="mt-12 flex justify-center">
      <a
        href="http://play.google.com/store/apps/details?id=com.shahnoor.dtrue"
        className="group relative w-full max-w-[1130px]"
      >
        <div className="absolute -inset-2 rounded-[2.25rem] bg-gradient-to-r from-emerald-500/25 via-purple-500/20 to-indigo-500/25 blur-2xl opacity-70 group-hover:opacity-100 transition" />
        <div className="relative rounded-[2.25rem] p-[1px] bg-gradient-to-r from-white/10 to-white/0">
          <img
            src="/start.png"
            alt="Dtrue preview"
            className="w-full h-auto rounded-[2.15rem] border border-white/10
                       shadow-[0_0_60px_rgba(0,0,0,0.45)]
                       group-hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </a>
    </div>

    {/* Second Heading */}
    <h2 className="mt-14 font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
      Debate. Decide.{" "}
      <span className="bg-gradient-to-r from-emerald-300 to-purple-300 bg-clip-text text-transparent">
        Dtrue.
      </span>
    </h2>

    {/* Paragraph */}
    <p className="mt-4 text-base md:text-lg text-gray-300">
      Transform debates into impact — with votes, live results, and AI-powered verdicts.
    </p>
  </div>

  {/* Content sections */}
  <div className="relative mx-auto max-w-6xl mt-14">
    <Body2 />
    <div className="mt-10">
      <Body3 />
    </div>
    <div className="m-10">
      <Footer />
    </div>
  </div>
</div>
  )
}

export default Body