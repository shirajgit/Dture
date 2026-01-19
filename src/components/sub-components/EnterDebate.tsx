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
          "http://localhost:3000/user/me",
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
        const res = await axios.get("http://localhost:3000/debates");
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
        `http://localhost:3000/debates/${debate._id}/agree`,
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
        `http://localhost:3000/debates/${debate._id}/disagree`,
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
        `http://localhost:3000/debates/${debate._id}/aggcommets`,
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
  `http://localhost:3000/debates/${debate._id}/discommets`,
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 pb-28 px-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-green-600 to-emerald-500 p-2 rounded-2xl shadow-lg">
        <img
          src={debate.image}
          alt={debate.name}
          className="w-24 h-24 rounded-2xl object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{debate.name}</h1>
          <p className="text-sm text-green-100">
            Vote and see what others think
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Description + Votes */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 shadow-lg">
  
  {/* Title */}
  <h3 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3">
    Description
  </h3>

  {/* Description */}
  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
    {debate.description}
  </p>

  {/* Buttons */}
  <div className="mt-5 space-y-3">
    
    {/* Agree */}
    <button
      onClick={handleAgree}
      disabled={hasVoted}
      className={`
        w-full py-3 rounded-xl font-semibold
        flex items-center justify-center gap-2
        transition-all duration-200 mb-3 text-2xl
        ${
          hasVoted
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 active:scale-95"
        }
      `}
    >
      👍 Agree
      <span className="bg-white/20 px-2 py-0.5 rounded-full text-lg">
        {agreeVotes}
      </span>
    </button>

    {/* Disagree */}
    <button
      onClick={handleDisagree}
      disabled={hasVoted}
      className={`
        w-full py-3 rounded-xl font-semibold
        flex items-center justify-center gap-2
        transition-all duration-200
        ${
          hasVoted
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 active:scale-95"
        }
      `}
    >
      👎 Disagree
      <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
        {disagreeVotes}
      </span>
    </button>

  </div>
</div>


        {/* Stats */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col">
  {/* Header */}
  <div className="flex items-center justify-between mb-5">
    <h3 className="text-xl sm:text-2xl font-semibold text-emerald-400">
      Live Results
    </h3>

    <div className="flex gap-4 text-2xl sm:text-base">
      <p className="text-gray-300">
        👍 <span className="text-emerald-400 font-semibold">{agreeVotes}</span>
      </p>
      <p className="text-gray-300">
        👎 <span className="text-rose-400 font-semibold">{disagreeVotes}</span>
      </p>
    </div>
  </div>

  {/* Messages Container */}
  <div className="flex flex-col sm:flex-row gap-6 overflow-y-auto max-h-[380px] pr-1 scrollbar-thin scrollbar-thumb-white/10">

    {/* Agree Column */}
    <div className="flex-1 space-y-3">
      <h4 className="text-sm font-semibold text-emerald-400">Agree</h4>

      {debate.agreeCom.length === 0 && (
        <p className="text-xs text-gray-500">No agree comments yet</p>
      )}

      {debate.agreeCom.map((e: string, index: number) => (
        <div key={index} className="flex justify-start">
          <div className="
            max-w-[85%]
       bg-gradient-to-br from-emerald-900 to-green-800
            text-white px-4 py-2.5
            rounded-2xl rounded-bl-md
            shadow-md
            text-sm
            leading-relaxed
            animate-fadeIn
          ">
            {e}
          </div>
        </div>
      ))}
    </div>

    {/* Disagree Column */}
    <div className="flex-1 space-y-3">
      <h4 className="text-sm font-semibold text-rose-400 text-right">Disagree</h4>

      {debate.disagreeCom.length === 0 && (
        <p className="text-xs text-gray-500 text-right">
          No disagree comments yet
        </p>
      )}

      {debate.disagreeCom.map((e: string, index: number) => (
        <div key={index} className="flex justify-end">
          <div className="
            max-w-[85%]
            bg-gradient-to-br from-rose-900 to-red-900
            text-white px-4 py-2.5
            rounded-2xl rounded-br-md
            shadow-md
            text-sm
            leading-relaxed
            animate-fadeIn
          ">
            {e}
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Vote Status */}
  {hasVoted && (
    <p className="mt-4 text-center text-yellow-400 font-semibold text-sm">
      ✔ You have successfully voted
    </p>
  )}
</div>


      </div>

      {/* Commets */}
{!hasCommets && (
  <div className="mt-8 flex flex-col items-center gap-4 px-4">
    
    {/* Input */}
    <input
      ref={inputRef}
      type="text"
      placeholder="Write your comment..."
      onChange={(e) => setCommets(e.target.value)}
      className="
        w-full max-w-lg
        bg-gray-900 text-gray-100
        px-4 py-3
        rounded-xl
        outline-none
        border border-white/10
        shadow-inner
        placeholder-gray-500
        focus:ring-2 focus:ring-emerald-900
        focus:border-emerald-800
        transition
      "
    />

    {/* Button */}
    <button
      onClick={handleCommmets}
      disabled={hasCommets}
      className={`
        w-full max-w-xs
        py-3
        rounded-xl
        font-semibold
        text-white
        transition-all duration-200
        ${
           disagrred
            ? "bg-gradient-to-br from-gray-900 via-rose-900 to-red-800 hover:from-gray-800 hover:via-rose-800 hover:to-red-700 active:scale-95 shadow-lg"
            : `
              bg-gradient-to-br from-gray-900 via-emerald-900 to-green-800
              hover:from-gray-800 hover:via-emerald-800 hover:to-green-700
              active:scale-95
              shadow-lg
            `
        }
      `}
    >
      Submit Comment
    </button>
  </div>
)}
 

    </div>
  );
};

export default EnterDebate;
