import { useContext, useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";
import { DebateContext } from "../../DebatesContext";
import { IoCompass } from "react-icons/io5";
import VoteBar from "./Votebar";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import Loading from "./Pop-up";

const ExploreDebate = () => {
  const { activeDebates, addActiveDebate, removeActiveDebate } =
    useContext(DebateContext);

  const [debates, setDebates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const isActive = (id: number) =>
    activeDebates.some((debate) => debate.id === id);

  // 🔍 SEARCH FILTER
  const filteredDebates = debates.filter((debate) =>
    `${debate.name} ${debate.description} ${debate.user}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const DEFAULT_IMAGE = "/defult_debate.png";

   

  return (
   <>
  <Loading open={loading} text="Fetching debates..." />

  {/* 🔍 Search */}
  <div className="mt-20 mb-8 px-4">
    <div className="mx-auto w-full max-w-2xl">
      <div
        className="
          relative rounded-3xl p-[2px]
          bg-gradient-to-r from-green-400 via-emerald-500 to-green-400
          shadow-[0_0_40px_rgba(34,197,94,0.35)]
        "
      >
        <div
          className="
            flex items-center gap-3
            rounded-3xl px-4 sm:px-5
            bg-black/70 backdrop-blur-xl
            border border-white/10
          "
        >
          <span
            className="
              grid place-items-center
              h-10 w-10 sm:h-11 sm:w-11
              rounded-2xl
              bg-green-500/10 border border-green-400/20
            "
          >
            <CiSearch className="text-green-400" size={22} />
          </span>

          <input
            type="text"
            placeholder="Search debates by Creator / Desc / Title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full bg-transparent
              text-white text-base sm:text-lg
              py-4
              focus:outline-none
              placeholder:text-gray-400
            "
          />
        </div>

        {/* subtle glow */}
        <div
          className="
            pointer-events-none absolute -inset-6 -z-10
            blur-3xl opacity-40
            bg-gradient-to-r from-green-500/30 via-emerald-500/20 to-green-500/30
          "
        />
      </div>

      {/* results count */}
      <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-gray-400">
        <span>
          Showing{" "}
          <span className="text-green-300 font-semibold">
            {filteredDebates.length}
          </span>{" "}
          debates
        </span>
        <span className="hidden sm:block">Tip: try “Shiraj”, “AI”, “Politics”</span>
      </div>
    </div>
  </div>

  {/* 🧩 Cards */}
  {filteredDebates.length > 0 ? (
    <div className="px-4 pb-16">
      <div
        className="
          mx-auto max-w-7xl
          grid gap-5
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3 
        "
      >
        {filteredDebates.map((debate) => (
          <div
            key={debate.id}
            className="
              group relative
              rounded-3xl overflow-hidden
              bg-zinc-950/80
              border border-green-300/25
              shadow-[0_0_25px_rgba(34,197,94,0.18)]
              hover:shadow-[0_0_45px_rgba(34,197,94,0.35)]
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* glow outline */}
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
                className="
                  h-44 sm:h-48 w-full object-cover
                  group-hover:scale-[1.02]
                  transition-transform duration-300
                "
                alt={debate.name}
                loading="lazy"
              />

              {/* top chips */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <span
                  className="
                    inline-flex items-center gap-2
                    rounded-2xl px-3 py-1
                    bg-black/60 backdrop-blur
                    border border-white/10
                    text-xs text-green-200
                  "
                >
                  ⏳ {debate.duration}
                </span>

                <span
                  className="
                    inline-flex items-center gap-2
                    rounded-2xl px-3 py-1
                    bg-black/60 backdrop-blur
                    border border-white/10
                    text-xs text-gray-200
                  "
                  title="Participants"
                >
                  <IoIosPeople className="text-green-300" />
                  {debate.agree + debate.disagree}
                </span>
              </div>

              {/* bottom fade */}
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

              {/* Creator */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-gray-400">
                  Created by{" "}
                  <span className="text-green-300 font-semibold">
                    {debate.user || "Shiraj Mujawar"}
                  </span>
                </p>

                <span
                  className="
                    hidden sm:inline-flex
                    rounded-full px-3 py-1
                    text-[11px]
                    bg-green-500/10 text-green-200
                    border border-green-400/20
                  "
                >
                  Live Debate
                </span>
              </div>

              {/* Vote bar */}
              <div className="mt-4">
                <VoteBar agreeVotes={debate.agree} disagreeVotes={debate.disagree} />
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
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
                    transition-all duration-300
                    border
                    ${
                      isActive(debate.id)
                        ? "bg-green-700 border-green-400/30 hover:bg-green-600"
                        : "bg-green-600 border-green-400/30 hover:bg-green-500"
                    }
                    active:scale-[0.99]
                  `}
                >
                  <IoIosPeople />
                  {isActive(debate.id) ? "Joined" : "Join"} (
                  {debate.agree + debate.disagree})
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
        No Debates Found
      </h1>
      <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-md">
        Try searching with different keywords (title, description, creator).
      </p>
    </div>
  )}
</>
  );
};

export default ExploreDebate;
