import { useContext, useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";
import { DebateContext } from "../../DebatesContext";
import { IoCompass } from "react-icons/io5";
import VoteBar from "./Votebar";
import axios from "axios";

const ExploreDebate = () => {
  const {
    activeDebates,
    addActiveDebate,
    removeActiveDebate,
  } = useContext(DebateContext);


 const [debates, setDebates] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchDebates = async () => {
    try {
      const res = await axios.get("http://localhost:3000/debates");
      setDebates(res.data.debates);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchDebates();
}, []);

  const isActive = (id: number) =>
    activeDebates.some((debate) => debate.id === id);

  return (
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
                  <span className="text-green-400">Shiraj Mujawar</span>
                </p>
              </div>
              <div className="pl-3 pr-3">
               <VoteBar agreeVotes={debate.agree} disagreeVotes={debate.disagree} />                
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-1 items-center px-4 pb-4">
                <button
                  onClick={() =>
                    isActive(debate.id)
                      ? removeActiveDebate(debate.id)
                      : addActiveDebate(debate)
                  }
                  className={`flex items-center gap-2 px-3 py-1 rounded-md text-white font-medium
                    ${
                      isActive(debate.id)
                        ? "bg-green-700"
                        : "bg-green-600 hover:bg-green-500"
                    }
                    transition-all duration-300`}
                >
                  <IoIosPeople />
                  {isActive(debate.id) ? "Joined" : "Join"}
                </button>

                {/* Enter Debate Button */}
                <Link to={`/entercreate/${debate.id}`}>
                  <button className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300">
                    Enter Debate
                  </button>
                </Link>
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

export default ExploreDebate;
