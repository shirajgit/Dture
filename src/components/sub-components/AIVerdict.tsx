/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VoteBar from "./Votebar";
import { useTypingEffect } from "@/hooks/useTypingEffect";


const AIVerdictPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debate: any | undefined = location.state?.debates;
  const aiResult = location.state?.aiResult as string | undefined;
const typedText = useTypingEffect(aiResult ?? "", 18);

 


  if (!aiResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <p className="text-lg text-gray-400">No AI Result Found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-purple-600 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full mt-8 bg-gradient-to-br from-black via-zinc-900 to-black flex justify-center px-4 py-10">
  <div className="w-full max-w-5xl space-y-10">

    {/* Debate Card */}
    <div className="rounded-3xl bg-zinc-900/80 backdrop-blur-xl shadow-xl overflow-hidden border border-zinc-800">

      {/* Image */}
      {debate.image && (
        <img
          src={debate.image}
          alt={debate.name}
          className="w-full h-64 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-6 md:p-8 space-y-4">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {debate.name}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-lg text-gray-400">
          <span>👤 Created by <span className="text-purple-400">{debate.user}</span></span>
          <span>⏳ {debate.duration}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed">
          {debate.description}
        </p>

  
       {/* Vote Stats */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">

  {/* Total */}
  <div className="rounded-2xl bg-zinc-800/60 border border-zinc-700 p-3 text-center">
    <p className="text-2xl text-gray-400">Total Votes</p>
    <p className="text-4xl font-bold text-white mt-1">
        {debate.agree + debate.disagree}
    </p>
  </div>

  {/* Agree */}
  <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-3 text-center">
    <p className="text-2xl text-green-400">Agree 👍</p>
    <p className="text-4xl font-bold text-green-400 mt-1">
      {debate.agree}
    </p>
     
  </div>

  {/* Disagree */}
  <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-3 text-center">
    <p className="text-2xl text-red-400">Disagree 👎</p>
    <p className="text-4xl font-bold text-red-400 mt-1">
      {debate.disagree}
    </p>
  
  </div>

</div>
<div className="pt-4 w-full ml-5 lg:ml-65 justify-center items-center">
          <VoteBar
            agreeVotes={debate.agree}
            disagreeVotes={debate.disagree}
          />
        </div>
  </div>
  <div className="text-center">
  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest">
    COMMENTS
  </h1>
  <div className="mt-3 mx-auto h-[2px] w-32 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.7)]" />
</div>

<div className="mt-2 grid grid-cols-1 md:grid-cols-2 p-10 gap-6">

  {/* AGREE COMMENTS */}
  <div className="space-y-4">
    <h3 className="text-green-400 font-bold text-lg">👍 Agree</h3>

    {debate.agreeCom.map(
      (c: { user: string; commets: string }, index: number) => (
        <div key={index} className="flex justify-start">
          <div
            className="
              max-w-[90%]
              bg-gradient-to-br from-emerald-900 to-green-800
              text-white px-4 py-1
              rounded-2xl rounded-bl-md
              shadow-lg
              text-sm
            "
          >
            <p className="text-xs text-emerald-300 font-semibold mb-1">
              @{c.user}
            </p>
            <p>{c.commets}</p>
          </div>
        </div>
      )
    )}
  </div>

  {/* DISAGREE COMMENTS */}
  <div className="space-y-4">
   
    <h3 className="text-red-400 font-bold text-lg text-right">👎 Disagree</h3>

    {debate.disagreeCom.map(
      (c: { user: string; commets: string }, index: number) => (
        <div key={index} className="flex justify-end">
          <div
            className="
              max-w-[90%]
              bg-gradient-to-br from-rose-900 to-red-900
              text-white px-4 py-1
              rounded-2xl rounded-br-md
              shadow-lg
              text-sm
            "
          >
            <p className="text-xs text-rose-300 font-semibold mb-1 text-right">
              @{c.user}
            </p>
            <p className="text-right">{c.commets}</p>
          </div>
        </div>
      )
    )}
  </div>

</div>



    </div>

    {/* AI Verdict Section */}
 <div className="text-center space-y-3 my-8 relative">
  <h2 className="
    text-4xl md:text-5xl font-extrabold
    bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400
    bg-clip-text text-transparent
    tracking-wide
  ">
    Debate Result
  </h2>

  <p className="text-gray-400 text-sm md:text-base">
    AI-generated final verdict based on discussion analysis
  </p>

  <div className="
    mx-auto mt-3 h-[2px] w-44
    bg-gradient-to-r from-transparent via-purple-500 to-transparent
    shadow-[0_0_20px_rgba(168,85,247,0.8)]
  " />
</div>


    {/* Verdict Card */}
    <div className="flex justify-center">
      <div className="
        relative w-full max-w-4xl
        rounded-3xl p-[1px]
        bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500
        shadow-[0_0_40px_rgba(168,85,247,0.5)]
      ">
        <div className="rounded-3xl bg-zinc-900/90 backdrop-blur-xl p-6 md:p-8">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="
              h-10 w-10 rounded-full
              flex items-center justify-center
              bg-gradient-to-br from-purple-500 to-indigo-500
            ">
              🤖
            </div>
            <h3 className="text-2xl font-semibold text-purple-300">
              AI Verdict
            </h3>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-6" />

          {/* Verdict Text */}
          <pre className="
  whitespace-pre-wrap
  text-gray-300 text-sm md:text-base
  leading-relaxed
">
  {typedText}
  <span className="animate-pulse">▍</span>
</pre>


          {/* Footer */}
          <div className="mt-6 text-right text-xs text-gray-500">
            Generated by AI • Debate Analysis
          </div>

        </div>
      </div>
    </div>

  </div>
</div>

  );
};

export default AIVerdictPage;
