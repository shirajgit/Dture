import React, { useEffect, useState } from 'react'
import { IoCompass, IoNotificationsSharp } from 'react-icons/io5'
import { GiBackwardTime } from "react-icons/gi";
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import { IoIosPeople } from 'react-icons/io';
import VoteBar from './Votebar';
import { Debate } from '@/DebatesContext';
import AIVerdictPage from './AIVerdict';
import { useNavigate } from "react-router-dom";
import Loading from './Pop-up';

 


const EndedDebates = () => {
 
  const [debates, setDebates] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [hashow ,sethashow ] = useState(false)
 const navigate = useNavigate();

  useEffect(() => {
  const fetchDebates = async () => {
    try {
      const res = await axios.get("http://localhost:3000/delete-debates");
      const data = res.data.debates;
      setDebates(data);
      console.log(data.user); 
      
    } catch (err) {
      console.error(err);
    } finally {
    
    }
  };

  fetchDebates();
}, []);

const sendToAI = async (debate : Debate) => {
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:3000/ai-result", {
      debate,
    });
      navigate("/airesult", {
      state: { aiResult: res.data.result , debates:debate },
    });
 
  } catch (err: any) {
  console.error(err.response?.data);
  alert(err.response?.data?.message || "AI failed");
} finally {
    setLoading(false);
  }
};


 

return (
  <div className="min-h-screen px-4 py-6">
    {/* Debates Grid */}
    {debates.length > 0 ? (
      <div className="flex flex-wrap gap-6 justify-center">
        {debates.map((debate) => (
          <div
            key={debate._id}
            className="bg-black text-white p-2 rounded-2xl border border-green-300
                       shadow-[0_0_25px_rgba(134,239,172,0.4)] 
                       hover:shadow-[0_0_35px_rgba(134,239,172,0.7)]
                       transition-all transform hover:-translate-y-1"
            style={{ width: "25rem", height: "35rem" }}
          >
            {/* Image */}
            {debate.image && (
              <img
                src={debate.image}
                className="object-cover h-56 w-full rounded-t-2xl"
                alt={debate.name}
              />
            )}

            {/* Info */}
            <div className="p-2">
              <h5 className="text-xl font-bold text-green-300 truncate">
                {debate.name}
              </h5>
              <p className="text-gray-400 mt-2 h-15 line-clamp-3">
                {debate.description}
              </p>
            </div>

            {/* Meta */}
            <div className="border-t border-green-300 px-3 py-2 text-sm">
              <p>⏳ Duration: {debate.duration}</p>
              <p className="mt-1">
                Created by{" "}
                <span className="text-green-400   font-semibold">
                  {debate.user || "Shiraj Mujawar"}
                </span>
              </p>
            </div>

            {/* Vote bar */}
            <div className="px-2">
              <VoteBar
                agreeVotes={debate.agree}
                disagreeVotes={debate.disagree}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-4 mt-3">
              <div className="flex items-center gap-2 bg-green-700 px-3 py-1 rounded-md text-lg">
                <IoIosPeople />
                Joined (
                {debate.agree + debate.disagree})
              </div>

           
              <button
                 disabled={loading}
               onClick={() => sendToAI(debate)}
               className={`px-4 py-2 rounded-lg transition
                         ${loading
                 ? "bg-purple-400 cursor-not-allowed"
                 : "bg-purple-600 hover:bg-purple-500"}
             `}
             >
            { "View Result 🤖"}
             </button>
        
            </div>
           
          </div>
        ))}
          < Loading open={loading} text={"Loading debate result..."} /> 
      </div>
      
    ) : (
      <div className="flex flex-col items-center justify-center mt-20">
        <GiBackwardTime className="text-green-500 mb-4" size={100} />
        <h1 className="text-xl text-white">No Ended Debates!</h1>
        <p className="text-gray-500 text-lg">
          Stay tuned to see the ended debates
        </p>
      </div>
    )}

    {/* AI Result Section */}
  {/* {aiResult && (
   <div className="mt-16 flex justify-center px-4">
  <div className="
    relative w-full max-w-4xl
    rounded-3xl p-[1px]
    bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500
    shadow-[0_0_40px_rgba(168,85,247,0.5)]
  ">
    <div className="
      rounded-3xl bg-zinc-900/90 backdrop-blur-xl
      p-8
    ">
 
      <div className="flex items-center gap-3 mb-6">
        <div className="
          flex items-center justify-center
          h-10 w-10 rounded-full
          bg-gradient-to-br from-purple-500 to-indigo-500
          shadow-md
        ">
          🤖
        </div>
        <h2 className="text-2xl font-semibold text-purple-300 tracking-wide">
          AI Verdict
        </h2>
      </div>

 
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-6" />

     
      <pre className="
        whitespace-pre-wrap
        text-gray-300 text-sm md:text-base
        leading-relaxed
        font-light
      ">
        {aiResult}
      </pre>

 
      <div className="mt-6 text-right text-xs text-gray-500">
        Generated by AI • Debate Analysis
      </div>
    </div>
  </div>
</div>

    )}   */}
  </div>
);

}

export default EndedDebates
