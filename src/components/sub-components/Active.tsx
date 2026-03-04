import {  useEffect, useState } from "react";
 
import { IoCompass } from "react-icons/io5";
import VoteBar from "./Votebar";
import axios from "axios";
 
import Loading from "./Pop-up";

const Active = () => {
 
 
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
         localStorage.removeItem("token");
        console.error(err);
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
  <Loading open={loading} text="Fetching debates..." />

  {activeDebates.length > 0 ? (
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
        {activeDebates.map((debate) => (
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

            {/* Debate Image */}
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
                    <span className="text-green-300 font-semibold">
                      {debate.user || "Shiraj Mujawar"}
                    </span>
                  </p>
                </div>

                <div className="mt-3">
                  <VoteBar agreeVotes={debate.agree} disagreeVotes={debate.disagree} />
                </div>
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

export default Active;
