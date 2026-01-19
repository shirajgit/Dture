import React, { useEffect, useState } from 'react'
import { IoCompass, IoNotificationsSharp } from 'react-icons/io5'
import { GiBackwardTime } from "react-icons/gi";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosPeople } from 'react-icons/io';
import VoteBar from './Votebar';

const EndedDebates = () => {
 
  const [debates, setDebates] = useState<any[]>([]);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


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

const sendToAI = async () => {
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:3000/ai-result", {
      debates,
    });

    setAiResult(res.data.result); // 👈 STORE RESULT
  } catch (err: any) {
  console.error(err.response?.data);
  alert(err.response?.data?.message || "AI failed");
} finally {
    setLoading(false);
  }
};


 

  return (<> 
      <>
      {debates.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center mt-10">
          {debates.map((debate) => (
            <div
              key={debate.id}
              className="bg-black text-white p-2 rounded-2xl border border-green-300 
                         shadow-[0_0_25px_4px_rgba(134,239,172,0.4)] 
                         hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7)] 
                         transition-all duration-300 transform hover:-translate-y-1"
              style={{ width: "25rem", height: "34rem" }}
            >
              {/* Debate Image */}
              {debate.image && (
                <img
                  src={debate.image}
                  className="object-cover h-55 w-full rounded-t-2xl"
                  alt={debate.name}
                />
              )}

              {/* Debate Info */}
              <div className="p-2 object-cover">
                <h5 className="text-xl font-bold h-5 overflow-hidden text-green-300">
                  {debate.name}
                </h5>
                <p className="text-gray-400 mt-2 h-17 overflow-hidden">
                  {debate.description}
                </p>
              </div>

              {/* Creator + Duration */}
              <div className="border-t border-green-300 p-1 ml-2 mr-2 text-sm">
                <p>⏳ Duration: {debate.duration}</p>
                <p className="font-semibold mt-2">
                  Created by:{" "}
                  <span className="text-green-400">{debate.user || "Shiraj mujawar"}</span>
                </p>
              </div>
              <div className="pl-3 pr-3">
               <VoteBar agreeVotes={debate.agree} disagreeVotes={debate.disagree} />                
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-1 items-center px-4 pb-4">
                <button
                
                  className={`flex items-center gap-2 px-3 py-1 rounded-md text-white font-medium
                  
                   
                         "bg-green-700"
                        "bg-green-600 hover:bg-green-500"
                    
                    transition-all duration-300`}
                >
                  <IoIosPeople />
                  {  "Joins(" }{ (debate.agree + debate.disagree)}{")"}
                </button>

                {/* Enter Debate Button */}
                <Link to={`/entercreate/${debate.id}`}>
                  <button className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300">
                    Enter Debate
                  </button>
                </Link>

                   <div className="flex justify-center mt-6">
  <button
    onClick={sendToAI}
    disabled={loading}
    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg"
  >
    {loading ? "Generating..." : "Generate AI Result 🤖"}
  </button>
                    </div>

                    {aiResult && (
                 <div className="mt-8 flex justify-center">
                 <div className="max-w-2xl w-full bg-zinc-900 border border-purple-500 rounded-2xl p-6 shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                  <h2 className="text-xl font-bold text-purple-400 mb-3">
                    🤖 AI Generated Result
                   </h2>

                <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed">
                 {aiResult}
                 </pre>
    </div>
  </div>
)}


              </div>
            </div>
          ))}
        </div>
      ) : (
       <div className='flex flex-col items-center justify-center '>
         <GiBackwardTime className='text-green-500' size={100} /> 
         <h1> No Ended Debates!</h1>
         <p className='text-2xl text-gray-500'>Stay tuned to see the Ended Debates</p>
      </div>
      )}
    </>
 </> )
}

export default EndedDebates
