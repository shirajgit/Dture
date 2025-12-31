import { useContext } from "react";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";
import { DebateContext } from "../../DebatesContext";
import { HiTrendingUp } from "react-icons/hi";
import VoteBar from "./Votebar";

const TrendDebate = () => {
  const {
    debates,
    activeDebates,
    addActiveDebate,
    removeActiveDebate,
  } = useContext(DebateContext);

  const isActive = (id: number) =>
    activeDebates.some((debate) => debate.id === id);

  return (
    <>
      {debates.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center mt-32">
          {debates.map((debate) => (
            <div
              key={debate.id}
              className="bg-black text-white rounded-2xl border border-green-300 
                         shadow-[0_0_25px_4px_rgba(134,239,172,0.4)] 
                         hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7)] 
                         transition-all duration-300"
              style={{ width: "25rem", height: "35rem" }}
            >
              {debate.image && (
                <img
                  src={debate.image}
                  className="object-cover h-40 w-full rounded-t-2xl"
                  alt={debate.name}
                />
              )}

              <div className="p-4">
                <h5 className="text-xl font-bold text-green-300">
                  {debate.name}
                </h5>
                <p className="text-gray-400 mt-2 h-16 overflow-hidden">
                  {debate.description}
                </p>
              </div>

              <div className="border-t border-green-300 p-2 text-sm">
                <p>⏳ Duration: {debate.duration}</p>
                <p className="font-semibold mt-2">
                  Created by: <span className="text-green-400">Shiraj Mujawar</span>
                </p>
              </div>
      <div className="p-2">
               <VoteBar agreeVotes={72} disagreeVotes={28} />                
              </div>
              <div className="flex justify-between items-center px-4 pb-4">
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
        <div className="flex flex-col items-center justify-center mt-50  text-center">
          <HiTrendingUp size={100} className="text-green-500 mb-4" />
          <h1 className="text-2xl font-semibold">No Trending Debates</h1>
          <p className="text-gray-400 mt-2">
            Check back later for hot debates that are <br /> trending!
          </p>
        </div>
      )}
    </>
  );
};

export default TrendDebate;
