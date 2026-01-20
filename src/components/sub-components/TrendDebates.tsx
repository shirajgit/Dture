import { useContext, useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";
import { DebateContext } from "../../DebatesContext";
import VoteBar from "./Votebar";
import axios from "axios";
import { IoCompass } from "react-icons/io5";

const TrendDebate = () => {
  const { activeDebates, addActiveDebate, removeActiveDebate } =
    useContext(DebateContext);

  const [debates, setDebates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const res = await axios.get("https://dture-backend-1.onrender.com/debates");
        setDebates(res.data.debates);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDebates();
  }, []);

  const DEFAULT_IMAGE = "/defult_debate.png";

  const isActive = (id: number) =>
    activeDebates.some((debate) => debate.id === id);

  // 🔥 RANKING SYSTEM (agree + disagree)
  const rankedDebates = [...debates].sort(
    (a, b) => b.agree + b.disagree - (a.agree + a.disagree)
  );

  if (loading) {
    return (
      <div className="flex justify-center mt-40 text-green-400 text-xl">
        Loading debates...
      </div>
    );
  }

  return (
    <>
      {rankedDebates.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center mt-30">
          {rankedDebates.map((debate, index) => (
            <div
              key={debate.id}
              className="relative bg-black text-white p-2 rounded-2xl border border-green-300
                         shadow-[0_0_25px_4px_rgba(134,239,172,0.4)] 
                         hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7)]
                         transition-all duration-300 transform hover:-translate-y-1"
              style={{ width: "25rem", height: "35rem" }}
            >
              {/* 🏆 Rank Badge */}
            <div
  className={`
    absolute top-3 right-3
    px-3 py-1 rounded-full text-xs font-bold text-white
    ${
      index === 0
        ? "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_25px_rgba(251,191,36,1)]"
        : index === 1
        ? "bg-gradient-to-r from-gray-300 to-gray-500 shadow-[0_0_25px_rgba(156,163,175,1)]"
        : index === 2
        ? "bg-gradient-to-r from-amber-700 to-yellow-800 shadow-[0_0_25px_rgba(180,83,9,1)]"
        : "bg-gradient-to-r from-green-400 to-emerald-600 shadow-[0_0_18px_rgba(34,197,94,0.9)]"
    }
  `}
>
  #{index + 1}
</div>


              {/* 🔥 Trending Badge */}
              {index < 3 && (
               <div
  className="
    absolute top-3 left-3
    flex items-center gap-1
    px-3 py-1
    rounded-full
    text-xs font-bold tracking-wide
    bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500
    text-black
    shadow-[0_0_20px_rgba(251,191,36,0.9)]
    animate-pulse
  "
>
  🔥 Trending
</div>

              )}

              {/* Debate Image */}
          
                <img
                  src={debate.image || DEFAULT_IMAGE}
                  className="object-cover h-55 w-full rounded-t-2xl"
                  alt={debate.name || ""}
                />
        

              {/* Debate Info */}
              <div className="p-2">
                <h5 className="text-xl font-bold text-green-300 truncate">
                  {debate.name}
                </h5>
                <p className="text-gray-400 mt-2 h-17 overflow-hidden">
                  {debate.description}
                </p>
              </div>

              {/* Creator + Duration */}
              <div className="border-t border-green-300 p-2 text-sm">
                <p>⏳ Duration: {debate.duration}</p>
                <p className="font-semibold mt-1">
                  Created by:{" "}
                  <span className="text-green-400">
                    {debate.user || "Shiraj Mujawar"}
                  </span>
                </p>
              </div>

              {/* Vote Bar */}
              <div className="px-3">
                <VoteBar
                  agreeVotes={debate.agree}
                  disagreeVotes={debate.disagree}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center px-4 pb-4 mt-2">
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
                  Joins ({debate.agree + debate.disagree})
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

export default TrendDebate;
