import { FC, useContext, useEffect, useState } from "react";
import {  IoIosPeople } from "react-icons/io";
import { DebateContext } from "../../DebatesContext";
import { Link } from "react-router-dom";
 
import VoteBar from "./Votebar";
import axios from "axios";
import { IoCompass } from "react-icons/io5";
import Loading from "./Pop-up";
 

type ChildProps = {
   NoOfdebates : (msg: number) => void;
};

const MineDebate : FC<ChildProps> = ({NoOfdebates}) => {

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
         console.log(err)
      }
    };

    fetchProfile();
  }, []);
 
 

   const {
    activeDebates,
    addActiveDebate,
    removeActiveDebate,
  } = useContext(DebateContext);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [debates, setDebates] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [filteredDebates, setFilteredDebates] = useState<any[]>([]);

useEffect(() => {
  const fetchDebates = async () => {
    try {
      const res = await axios.get("https://dture-backend-1.onrender.com/debates");
      const data = res.data.debates;
      setDebates(data); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchDebates();
}, []);
 
  
useEffect(() => { 
  if (!user) return;

  const userDebates = debates.filter(
    (debate) => debate.user === user.username
  );

  setFilteredDebates(userDebates);

  NoOfdebates?.(userDebates.length); // ✅ SAFE
}, [debates, user, NoOfdebates]);

const DEFAULT_IMAGE = "/defult_debate.png";

   const isActive = (id: number) =>
    activeDebates.some((debate) => debate.id === id);

 

  return (
   <>
  <Loading open={loading} text="Fetching debates..." />

  {filteredDebates.length > 0 ? (
    <div className="px-4 pt-10 pb-14">
      {/* ✅ Responsive Grid: 1 → 2 → 3 */}
      <div
        className="
          mx-auto max-w-7xl
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {filteredDebates.map((debate) => (
          <div
            key={debate.id}
            className="
              group relative overflow-hidden
              rounded-3xl
              bg-zinc-950/80 text-white
              border border-green-300/25
              shadow-[0_0_25px_rgba(34,197,94,0.18)]
              hover:shadow-[0_0_45px_rgba(34,197,94,0.35)]
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* glow hover layer */}
            <div
              className="
                pointer-events-none absolute inset-0
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                bg-gradient-to-b from-green-500/10 via-transparent to-emerald-500/10
              "
            />

            {/* Image */}
            <div className="relative">
              <img
                src={debate.image || DEFAULT_IMAGE}
                alt={debate.name}
                loading="lazy"
                className="
                  w-full object-cover
                  h-44 sm:h-48
                  group-hover:scale-[1.02]
                  transition-transform duration-300
                "
              />
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h5 className="text-lg sm:text-xl font-bold text-green-200 line-clamp-1">
                {debate.name}
              </h5>

              <p className="mt-2 text-sm sm:text-base text-gray-300/90 line-clamp-3">
                {debate.description}
              </p>

              {/* Creator + Duration */}
              <div className="mt-4 rounded-2xl border border-green-300/20 bg-black/40 p-3">
                <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-gray-300">
                  <p className="whitespace-nowrap">⏳ {debate.duration}</p>
                  <p className="truncate">
                    Created by:{" "}
                    <span className="text-green-300 font-semibold">You</span>
                  </p>
                </div>

                <div className="mt-3">
                  <VoteBar agreeVotes={debate.agree} disagreeVotes={debate.disagree} />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    isActive(debate.id)
                      ? removeActiveDebate(debate.id)
                      : addActiveDebate(debate)
                  }
                  className={`
                    w-full inline-flex items-center justify-center gap-2
                    rounded-2xl px-4 py-3
                    text-sm font-semibold text-white
                    border border-green-400/25
                    transition-all duration-300
                    active:scale-[0.99]
                    ${
                      isActive(debate.id)
                        ? "bg-green-700 hover:bg-green-600"
                        : "bg-green-600 hover:bg-green-500"
                    }
                  `}
                >
                  <IoIosPeople />
                  Joined ({debate.agree + debate.disagree})
                </button>

                <Link to={`/entercreate/${debate.id}`} className="w-full">
                  <button
                    className="
                      w-full rounded-2xl px-4 py-3
                      text-sm font-semibold
                      bg-white/10 hover:bg-white/15
                      text-white
                      border border-white/10 hover:border-white/20
                      transition-all duration-300
                      active:scale-[0.99]
                    "
                  >
                    Enter Debate →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center mt-32 px-4 text-center">
      <div className="grid place-items-center h-20 w-20 rounded-3xl bg-green-500/10 border border-green-400/20">
        <IoCompass size={38} className="text-green-400" />
      </div>
      <h1 className="mt-6 text-xl sm:text-2xl font-semibold text-white">
        Explore Debates
      </h1>
      <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-md">
        Discover trending debates and join the conversation!
      </p>
    </div>
  )}
</>
  );
};

export default MineDebate;
