import { RefObject, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  }, [id]);

  
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
    } catch (err: any) {
      alert(err.response?.data?.message || "Error voting");
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
      setdisAgreed(true)
    } catch (err: any) {
      alert(err.response?.data?.message );
    }
  };

  const handleCommmets = async () =>{
      const token = localStorage.getItem("token");
   if(agrred){
       await axios.put(
        `http://localhost:3000/debates/${debate._id}/aggcommets`,
          {commets},
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        )
          console.log(commets);
          
    } else if(disagrred) {
     await axios.put(
        `http://localhost:3000/debates/${debate._id}/discommets`,
          {commets},
         {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        )
               console.log(commets)
    }

  }

  console.log(commets)



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
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Description
          </h3>
          <p className="text-gray-300">{debate.description}</p>

          <button
            onClick={handleAgree}
            disabled={hasVoted}
            className={`w-full mt-4 py-3 rounded-xl font-semibold
              ${
                hasVoted
                  ? "bg-gray-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
          >
            👍 Agree ({agreeVotes})
          </button>

          <button
            onClick={handleDisagree}
            disabled={hasVoted}
            className={`w-full mt-3 py-3 rounded-xl font-semibold
              ${
                hasVoted
                  ? "bg-gray-600"
                  : "bg-red-600 hover:bg-red-700"
              }`}
          >
            👎 Disagree ({disagreeVotes})
          </button>
        </div>

        {/* Stats */}
        <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col  ">
          <h3 className="text-2xl font-semibold text-green-400 mb-4">
            Live Results
          </h3>

          <p className="text-lg text-gray-300">
            👍 Agree: <span className="text-green-400">{agreeVotes}</span>
          </p>
          <p className="text-lg text-gray-300 mt-2">
            👎 Disagree: <span className="text-red-400">{disagreeVotes}</span>
          </p>

         <div className="flex gap-4">
          <div className="space-y-4 px-2 sm:px-6">

  {/* Agree message (LEFT) */}
  <div className="flex justify-start">
    <div className="
      max-w-[85%] sm:max-w-xs
      bg-gradient-to-br from-green-500 to-emerald-600
      text-white px-5 py-3
      rounded-2xl rounded-bl-md
      shadow-lg
      text-sm sm:text-base
      leading-relaxed
    ">
      {debate.agreeCom}
    </div>
  </div>

  {/* Disagree message (RIGHT) */}
      <div className="flex justify-end  ">
    <div className="
      max-w-[85%] sm:max-w-xs
      bg-gradient-to-br from-red-500 to-rose-600
      text-white px-5 py-3
      rounded-2xl rounded-br-md
      shadow-lg
      text-sm sm:text-base
      leading-relaxed
    ">
           {debate.disagreeCom}
            </div>
  </div>

</div>

   
          </div>
 

          {hasVoted && (
            <p className="mt-4 text-yellow-400 font-semibold">
              You have Succesfully voted ✔
            </p>
          )}
        </div>
      </div>

      {/* Commets */}
      <div className="m-20">
        <input type="text"  ref={inputRef}   onChange={(e) => setCommets(e.target.value)}  className="w-110 0 bg-white text-black m-5"/>
         <button type="submit" onClick={handleCommmets} className="w-30 bg-green-400"> Submit</button>
      </div>
    </div>
  );
};

export default EnterDebate;
