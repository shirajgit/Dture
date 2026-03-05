import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EnterDebate = () => {
  const { id } = useParams();

  const [debate, setDebate] = useState<any>(null);
  const [agreeVotes, setAgreeVotes] = useState(0);
  const [disagreeVotes, setDisagreeVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [agrred , setAgreed ] = useState(false)
  const [disagrred , setdisAgreed ] = useState(false)
  const [commets, setCommets] = useState("") 
  const inputRef = useRef<HTMLInputElement>(null) 
  const [hasCommets ,sethasCommets] = useState(true)
  const [user, setUser] = useState<any>(null);
   
 useEffect(() => {
    const fetchProfile = async () => {
 
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://dture-backend-1.onrender.com/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      
    };

    fetchProfile();
  }, []);

  /* 🔹 Fetch single debate */
  useEffect(() => {
    const fetchDebate = async () => {
      try {
        const res = await axios.get("https://dture-backend-1.onrender.com/debates");
        const found = res.data.debates.find(
             (d: any) => d.id.toString() === id );

        if (found) {
          setDebate(found);
          setAgreeVotes(found.agree);
          setDisagreeVotes(found.disagree);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDebate();
  }, [id,hasVoted]);

  
  if (!debate) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <h2 className="text-3xl font-bold">No debate found 😅</h2>
      </div>
    );
  }

  /* 🟢 Vote handlers */
  const handleAgree = async () => {
    if (hasVoted) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://dture-backend-1.onrender.com/debates/${debate._id}/agree`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgreeVotes(res.data.agree);
      setHasVoted(true);
      setAgreed(true)
      sethasCommets(false);
    }catch (err: any) {
  toast.error(
    err.response?.data?.message || "You already voted",
    {
      style: {
        borderRadius: "14px",
        background: "linear-gradient(135deg, #18181b, #27272a)",
        color: "#fff",
        fontWeight: "500",
      },
    }
  );
}
  };

  const handleDisagree = async () => {
    if (hasVoted) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://dture-backend-1.onrender.com/debates/${debate._id}/disagree`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDisagreeVotes(res.data.disagree);
      setHasVoted(true);
      setdisAgreed(true);
      sethasCommets(false);
    }  catch (err: any) {
  toast.error(
    err.response?.data?.message || "You already voted",
    {
      style: {
        borderRadius: "14px",
        background: "linear-gradient(135deg, #18181b, #27272a)",
        color: "#fff",
        fontWeight: "500",
      },
    }
  );
}
  };

  const handleCommmets = async () =>{
   
 if(agrred){
       try{const res = await axios.put(
        `https://dture-backend-1.onrender.com/debates/${debate._id}/aggcommets`,
          {commets , user: user.username},
          {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        )
         sethasCommets(true)
        } catch (err: any) {
      alert(err.response?.data?.message || "Error voting");
    }

    } else if(disagrred) {
   try{ const  res =  await axios.put(
  `https://dture-backend-1.onrender.com/debates/${debate._id}/discommets`,
  { commets,user: user.username },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  } 
)
    sethasCommets(true)
}catch (err: any) {
      alert(err.response?.data?.message || "Error voting");
    }
           
            
    }else {
      alert( "You already Votted");
      sethasCommets(true)
    } 
  
  }
 



  return (
 <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white pt-24 pb-28 px-4 sm:px-6">
  {/* Header */}
  <div className="mx-auto max-w-7xl">
    <div className="sticky top-16 z-40">
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-emerald-400/60 via-purple-500/50 to-indigo-500/50 shadow-[0_0_50px_rgba(34,197,94,0.15)]">
        <div className="rounded-3xl bg-zinc-950/70 backdrop-blur-xl border border-white/10 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <img
                src={debate.image}
                alt={debate.name}
                className="w-full sm:w-28 h-32 sm:h-28 rounded-2xl object-cover border border-white/10"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-200 border border-emerald-500/25">
                  Live Debate
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-200 border border-purple-500/25">
                  Vote • Comment • Results
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight truncate">
                {debate.name}
              </h1>
              <p className="text-sm text-gray-300 mt-1">
                Vote and see what others think. Keep it respectful 👊
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3 sm:gap-4">
              <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-gray-400">👍 Agree</p>
                <p className="text-lg font-bold text-emerald-300">{agreeVotes}</p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-gray-400">👎 Disagree</p>
                <p className="text-lg font-bold text-rose-300">{disagreeVotes}</p>
              </div>
            </div>
          </div>

          {/* Subtle glow blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {/* Description + Votes */}
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-white/0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold text-emerald-300 mb-3">
            Description
          </h3>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {debate.description}
          </p>

          <div className="mt-6 space-y-3">
            {/* Agree */}
            <button
              onClick={handleAgree}
              disabled={hasVoted}
              className={`w-full py-3 rounded-2xl font-semibold flex items-center justify-center gap-3
                transition-all duration-200 active:scale-[0.98] border border-white/10
                ${
                  hasVoted
                    ? "bg-zinc-700/40 cursor-not-allowed text-white/80"
                    : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-[0_0_25px_rgba(34,197,94,0.20)]"
                }`}
            >
              <span className="text-xl">👍</span>
              <span className="text-xl">Agree</span>
              <span className="ml-auto bg-white/15 px-3 py-1 rounded-full text-sm">
                {agreeVotes}
              </span>
            </button>

            {/* Disagree */}
            <button
              onClick={handleDisagree}
              disabled={hasVoted}
              className={`w-full py-3 rounded-2xl font-semibold flex items-center justify-center gap-3
                transition-all duration-200 active:scale-[0.98] border border-white/10
                ${
                  hasVoted
                    ? "bg-zinc-700/40 cursor-not-allowed text-white/80"
                    : "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-[0_0_25px_rgba(244,63,94,0.18)]"
                }`}
            >
              <span className="text-xl">👎</span>
              <span className="text-xl">Disagree</span>
              <span className="ml-auto bg-white/15 px-3 py-1 rounded-full text-sm">
                {disagreeVotes}
              </span>
            </button>

            {/* Vote Status */}
            {hasVoted && (
              <div className="mt-2 text-center text-yellow-300 font-semibold text-sm bg-yellow-500/10 border border-yellow-500/20 rounded-2xl py-2">
                ✔ You have successfully voted
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Results */}
      <div className="md:col-span-2 relative rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-white/0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl sm:text-2xl font-semibold text-emerald-300">
              Live Results
            </h3>

            <div className="flex gap-4 text-sm sm:text-base">
              <p className="text-gray-300">
                👍{" "}
                <span className="text-emerald-300 font-semibold">{agreeVotes}</span>
              </p>
              <p className="text-gray-300">
                👎{" "}
                <span className="text-rose-300 font-semibold">{disagreeVotes}</span>
              </p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex flex-col sm:flex-row gap-6 overflow-y-auto max-h-[420px] pr-2
                          scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {/* Agree Column */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-emerald-300">Agree</h4>
                <span className="text-xs text-gray-500">{debate.agreeCom?.length || 0} msgs</span>
              </div>

              {(debate.agreeCom?.length || 0) === 0 && (
                <p className="text-xs text-gray-500">No agree comments yet</p>
              )}

              {debate.agreeCom?.map(
                (c: { user: string; commets: string }, index: number) => (
                  <div key={index} className="flex justify-start">
                    <div className="max-w-[88%] bg-gradient-to-br from-emerald-900/70 to-green-800/60
                                    border border-emerald-500/20 text-white px-4 py-3
                                    rounded-2xl rounded-bl-md shadow-[0_0_18px_rgba(34,197,94,0.12)]">
                      <p className="text-xs text-emerald-200 font-semibold mb-1 truncate">
                        @{c.user}
                      </p>
                      <p className="text-sm text-white/90 leading-relaxed">{c.commets}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Disagree Column */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{debate.disagreeCom?.length || 0} msgs</span>
                <h4 className="text-sm font-semibold text-rose-300 text-right">
                  Disagree
                </h4>
              </div>

              {(debate.disagreeCom?.length || 0) === 0 && (
                <p className="text-xs text-gray-500 text-right">
                  No disagree comments yet
                </p>
              )}

              {debate.disagreeCom?.map(
                (c: { user: string; commets: string }, index: number) => (
                  <div key={index} className="flex justify-end">
                    <div className="max-w-[88%] bg-gradient-to-br from-rose-900/70 to-red-900/60
                                    border border-rose-500/20 text-white px-4 py-3
                                    rounded-2xl rounded-br-md shadow-[0_0_18px_rgba(244,63,94,0.10)]">
                      <p className="text-xs text-rose-200 font-semibold mb-1 text-right truncate">
                        @{c.user}
                      </p>
                      <p className="text-sm text-white/90 leading-relaxed text-right">
                        {c.commets}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Comments input */}
    {!hasCommets && (
      <div className="mt-8 flex flex-col items-center gap-4 px-2">
        <div className="w-full max-w-3xl relative rounded-3xl p-[1px] bg-gradient-to-r from-emerald-500/30 via-purple-500/25 to-rose-500/25">
          <div className="rounded-3xl bg-zinc-950/70 backdrop-blur-xl border border-white/10 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="Write your comment..."
                onChange={(e) => setCommets(e.target.value)}
                className="flex-1 bg-black/40 text-gray-100 px-4 py-3 rounded-2xl outline-none
                           border border-white/10 shadow-inner placeholder-gray-500
                           focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition"
              />

              <button
                onClick={handleCommmets}
                disabled={hasCommets}
                className={`px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-200
                  active:scale-[0.98] border border-white/10
                  ${
                    disagrred
                      ? "bg-gradient-to-br from-zinc-900 via-rose-900 to-red-700 hover:from-zinc-800 hover:via-rose-800 hover:to-red-600 shadow-[0_0_25px_rgba(244,63,94,0.18)]"
                      : "bg-gradient-to-br from-zinc-900 via-emerald-900 to-green-700 hover:from-zinc-800 hover:via-emerald-800 hover:to-green-600 shadow-[0_0_25px_rgba(34,197,94,0.16)]"
                  }`}
              >
                Submit Comment
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Tip: short, clear comments get more upvotes 🔥
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default EnterDebate;
