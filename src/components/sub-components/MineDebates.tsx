import { useContext } from "react";
import { IoIosChatboxes, IoIosPeople } from "react-icons/io";
import { DebateContext } from "../../DebatesContext";
import { Link } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import VoteBar from "./Votebar";

const MineDebate = () => {
  const { debates, addActiveDebate } = useContext(DebateContext);

  const handleEnterDebate = (debate: any) => {
    addActiveDebate(debate); // add to active debates array
  };

  return (
    <>
      {debates.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center mt-0 px-4">
          {debates.map((debate) => (
            <div
              key={debate.id}
              className="relative bg-black border border-green-500/30 text-white rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl 
                         shadow-[0_0_15px_2px_rgba(74,222,128,0.3)] hover:shadow-[0_0_25px_5px_rgba(74,222,128,0.6)] 
                         transition-all duration-300 overflow-hidden"
              style={{ width: "25rem", height: "35rem" }}
            >
              {debate.image && (
                <img
                  src={debate.image}
                  className="object-cover h-40 w-full rounded-tr-2xl"
                  alt={debate.name}
                />
              )}

              <div className="p-4">
                <h5 className="text-xl font-bold text-green-400">{debate.name}</h5>
                <p className="text-gray-300 mt-1 line-clamp-3">
                  {debate.description}
                </p>
              </div>

              <ul className="px-5 text-sm text-gray-400 space-y-">
                <li>Duration: <span className="text-green-300">{debate.duration}</span></li>
                <li className="font-semibold text-white">
                  Created by: <span className="text-green-400">Shiraj Mujawar</span>
                  <button className="bg-green-600 ml-3 px-3 py-1 rounded flex items-center gap-1 text-white hover:bg-green-500 transition-all">
                    <IoIosPeople size={18} /> Joined
                  </button>
                </li>
              </ul>
               <div className="p-2">
               <VoteBar agreeVotes={72} disagreeVotes={28} />                
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4">
                <Link to={`/entercreate/${debate.id}`}>
                  <button
                    className="w-full bg-green-600 hover:bg-green-500 text-black font-bold text-lg py-2 rounded-xl 
                               shadow-[0_0_10px_2px_rgba(74,222,128,0.5)] transition-all duration-300"
                    onClick={() => handleEnterDebate(debate)}
                  >
                    Enter Debate
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 text-center px-5 text-xl md:text-2xl">
          <IoIosChatboxes size={100} className="text-green-400 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            No Debates Are Present!
          </h1>
          <p className="text-gray-400 mb-">
            Looks like you haven’t created any debates yet.
          </p>
          <p className="text-gray-400 mb-6">
            Explore more or create your own!
          </p>

             <Link to="/create" className="text-white  nav-link no-underline  " > 
                    <button className="bg-gray-900 h-15 md:h-18 p-3 flex flex-row rounded-5  ">
                     <MdOutlineExplore size={30} className="m-1"/> Create you own Debates</button> </Link>
        </div>
      )}
    </>
  );
};

export default MineDebate;
