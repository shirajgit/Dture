import { useContext } from "react";
import { DebateContext } from "../../DebatesContext";
import { Link, useNavigate } from "react-router-dom";
import { IoIosChatboxes, IoIosPeople } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import VoteBar from "./Votebar";

const FeedDebate = () => {
  const { debates, addActiveDebate } = useContext(DebateContext);
  const navigate = useNavigate();

  const handleEnterDebate = (debate: any) => {
    addActiveDebate(debate); // store in active debates
    navigate(`/entercreate/${debate.id}`); // go to that debate's page
  };

  if (debates.length === 0) {
    return (<div> <div className="items-center justify-center flex flex-col mt-11">
       <IoIosChatboxes size={100} className="text-green-600"/> 
       <h1>All Caught Up!</h1> <p className="text-gray-500"> Looks like youve joined all debates in <br /> your selected categeories. Explore more oR <br /> create your own!</p>
        <div className="items-center text-3xl text-gray-600 mt-20 ">
           <Link to="/explore" className="text-white nav-link no-underline " > 
           <button className="bg-gray-900 p-3 flex flex-row rounded-5 ">
            <MdOutlineExplore size={30} className="m-1"/> Explore More Debates</button> </Link> </div> 
            </div>
             </div>

    )}

  return (
    <div className="flex flex-wrap gap-5 justify-center mt-5">
      {debates.map((debate) => (
        <div
          key={debate.id}
          className="bg-black text-white rounded-2xl border border-gray-700 shadow-[0_0_20px_rgba(134,239,172,0.4)] p-3"
          style={{ width: "25rem", height: "37rem" }}
        >
          {debate.image && (
            <img
              src={debate.image}
              alt={debate.name}
              className="object-cover h-40 w-full rounded-t-2xl"
            />
          )}
          <div className="p-3 object-cover">
            <h2 className="text-2xl font-semibold object-cover">{debate.name}</h2>
            <p className="text-gray-400 mt-2 line-clamp-3">
              {debate.description}
            </p>
          </div>
          <div className="flex justify-between items-center px-3 py-2 border-t border-gray-700">
            <span className="text-sm">Duration: {debate.duration}</span>
            <button className="bg-green-600 flex items-center gap-1 px-3 py-1 rounded text-white hover:bg-green-500 transition-all">
              <IoIosPeople /> Joined
            </button>
          </div>
      <VoteBar agreeVotes={72} disagreeVotes={28} />  
          <div className="p-3 mt-auto">
            <button
              onClick={() => handleEnterDebate(debate)}
              className="bg-green-500 hover:bg-green-400 text-white font-bold w-full py-2 rounded-lg text-xl shadow-[0_0_15px_rgba(134,239,172,0.8)] hover:shadow-[0_0_25px_rgba(134,239,172,1)] transition-all"
            >
              Enter Debate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedDebate;
