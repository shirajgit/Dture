import React, { useEffect, useState } from 'react'
import { GiBackwardTime } from "react-icons/gi";
import axios from 'axios';
 
import { IoIosPeople } from 'react-icons/io';
import VoteBar from './Votebar';
import { Debate } from '@/DebatesContext';
 
import { useNavigate } from "react-router-dom";
import Loading from './Pop-up';

 


const EndedDebates = () => {
 
  const [debates, setDebates] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

  useEffect(() => {
  const fetchDebates = async () => {
    try {
      const res = await axios.get("https://dture-backend-1.onrender.com/delete-debates");
      const data = res.data.debates;
      setDebates(data);
      console.log(data.user); 
      
    } catch (err) {
      console.error(err);
    } 
  };

  fetchDebates();
}, []);

const sendToAI = async (debate : Debate) => {
  setLoading(true);
  try {
    const res = await axios.post("https://dture-backend-1.onrender.com/ai-result", {
      debate,
    });
      navigate("/airesult", {
      state: { aiResult: res.data.result , debates:debate },
    });
 
  } catch (err:Error | any) {
  console.error(err.response?.data);
  alert(err.response?.data?.message || "AI failed");
} finally {
    setLoading(false);
  }
};

const DEFAULT_IMAGE = "/defult_debate.png";
 
 

return (
 <div className="min-h-screen px-4 py-8">
  <Loading open={loading} text="Fetching debates..." />

  {/* Debates Grid */}
  {debates.length > 0 ? (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap gap-8 justify-center">
        {debates.map((debate) => {
          const joined = (debate.agree || 0) + (debate.disagree || 0);

          return (
            <div
              key={debate._id}
              className="group relative w-[25rem] h-[35rem] rounded-3xl p-[1px]
                         bg-gradient-to-br from-emerald-400/70 via-purple-500/60 to-indigo-500/60
                         shadow-[0_0_40px_rgba(34,197,94,0.25)]
                         hover:shadow-[0_0_60px_rgba(168,85,247,0.35)]
                         transition-all duration-300"
            >
              {/* Inner card */}
              <div
                className="relative h-full rounded-3xl overflow-hidden
                           bg-zinc-950/85 backdrop-blur-xl
                           border border-white/5"
              >
                {/* Image section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={debate.image || DEFAULT_IMAGE}
                    className="h-full w-full object-cover
                               scale-100 group-hover:scale-[1.04]
                               transition-transform duration-500"
                    alt={debate.name}
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 text-xs rounded-full
                                     bg-emerald-500/15 text-emerald-300
                                     border border-emerald-500/25 backdrop-blur">
                      Ended
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full
                                     bg-purple-500/15 text-purple-200
                                     border border-purple-500/25 backdrop-blur">
                      ⏳ {debate.duration}
                    </span>
                  </div>

                  {/* Title on image (nice vibe) */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h5 className="text-lg font-semibold text-white/95 truncate drop-shadow">
                      {debate.name}
                    </h5>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Description */}
                  <p className="text-gray-300/90 mt-1 line-clamp-3 text-sm leading-relaxed">
                    {debate.description}
                  </p>

                  {/* Creator */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500/40 to-purple-500/40
                                      border border-white/10 flex items-center justify-center">
                        👤
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">Created by</p>
                        <p className="text-sm text-emerald-300 font-semibold truncate">
                          {debate.user || "Shiraj Mujawar"}
                        </p>
                      </div>
                    </div>

                    {/* Joined pill */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-2xl
                                    bg-emerald-500/10 border border-emerald-500/20">
                      <IoIosPeople className="text-emerald-300" />
                      <span className="text-sm text-emerald-200 font-semibold">
                        {joined}
                      </span>
                      <span className="text-xs text-gray-400">Joined</span>
                    </div>
                  </div>

                  {/* Vote bar */}
                  <div className="mt-1">
                    <VoteBar agreeVotes={debate.agree} disagreeVotes={debate.disagree} />
                  </div>
                </div>

                {/* Footer actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between gap-3">
                    {/* Small glow chip */}
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-2xl
                                 bg-zinc-900/60 border border-white/10
                                 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                    >
                      <span className="text-xs text-gray-400">AI Verdict</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-500/25">
                        Ready
                      </span>
                    </div>

                    {/* Button */}
                    <button
                      disabled={loading}
                      onClick={() => sendToAI(debate)}
                      className={`relative overflow-hidden px-4 py-2 rounded-2xl font-semibold
                                  border border-white/10 transition-all duration-300
                                  ${
                                    loading
                                      ? "bg-purple-400/70 cursor-not-allowed text-white/90"
                                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                                  }`}
                    >
                      <span className="relative z-10">View Result 🤖</span>
                      {!loading && (
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                         bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Subtle corner glow */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
              </div>
            </div>
          );
        })}
      </div>

      <Loading open={loading} text="Loading debate result..." />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center mt-24 text-center">
      <div className="relative">
        <GiBackwardTime className="text-green-500" size={100} />
        <div className="absolute inset-0 blur-2xl bg-green-500/20 rounded-full" />
      </div>

      <h1 className="mt-5 text-2xl font-semibold text-white">No Ended Debates!</h1>
      <p className="text-gray-400 text-base mt-2 max-w-md">
        Stay tuned — ended debates will show up here with results and AI verdicts.
      </p>
    </div>
  )}
</div>
);

}

export default EndedDebates
