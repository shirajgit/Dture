import { use, useContext, useEffect, useState } from "react";
import { DebateContext } from "../../DebatesContext";
import { IoIosPeople } from "react-icons/io";
import { IoChatbubbles, IoCompass } from "react-icons/io5";
import VoteBar from "./Votebar";
import axios from "axios";
import { Link } from "react-router-dom";

const Active = () => {
 
    const {
 
    addActiveDebate,
    removeActiveDebate,
  } = useContext(DebateContext);
 
    const [debates, setDebates] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [activeDebates, setActiveDebates] = useState<any[]>([]);
   const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
      } catch (err) {
         
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
  const fetchDebates = async () => {
    try {
      const res = await axios.get("https://dture-backend-1.onrender.com/debates");
      const data = res.data.debates;
    
      setDebates(data);
      console.log(data.user);
      
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchDebates();
}, []);

 useEffect(() => {
   if (user) {
     const active = debates.filter((debate) =>
        debate.Voters.includes(user._id)
      );
      setActiveDebates(active);
    }
  }, [debates, user]);  

const DEFAULT_IMAGE = "/defult_debate.png";
 

  return (
       <>
      {activeDebates.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center mt-10">
          {activeDebates.map((debate) => (
            <div
              key={debate.id}
              className="bg-black text-white p-2 rounded-2xl border border-green-300 
                         shadow-[0_0_25px_4px_rgba(134,239,172,0.4)] 
                         hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7)] 
                         transition-all duration-300 transform hover:-translate-y-1"
              style={{ width: "25rem", height: "32rem" }}
            >
              {/* Debate Image */}
            
                <img
                  src={debate.image || DEFAULT_IMAGE}
                  className="object-cover h-55 w-full rounded-t-2xl"
                  alt={debate.name}
                />
            

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

     
             
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-40 text-center">
          <IoCompass size={100} className="text-green-500 mb-4" />
          <h1 className="text-2xl font-semibold">Explore Debates</h1>
          <p className="text-gray-400 mt-2">
            Discover trending debates and join the conversation!
          </p>
        </div>
      )}
    </>
  );
};

export default Active;
