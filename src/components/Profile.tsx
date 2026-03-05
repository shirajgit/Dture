import { useContext, useEffect, useState } from "react";
import MineDebate from "./sub-components/MineDebates";
import { DebateContext } from "../DebatesContext";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type ChildProps = {
   NoOfdebates : (msg: number) => void;
};

const Profile = () => {
 
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [NumDebate , setNumDebate] = useState<number>(0)
  const [debates, setDebates] = useState<any[]>([]);
  const [activeDebates, setActiveDebates] = useState<any[]>([]);

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
        navigate("/home");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const Onofdebate = (Num : number) : void => {
      setNumDebate(Num)
  }


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
  
  if (!user) return <p className="text-white">Loading...</p>;

  return (
    <>
  {/* LOGOUT (Top Right) */}
  <div className="fixed top-20 right-4 sm:right-8 z-50">
    <button
      onClick={handleLogout}
      className="group flex items-center gap-2 px-4 py-2 rounded-2xl
                 bg-red-500/15 text-red-200 border border-red-500/25
                 backdrop-blur-xl shadow-[0_0_25px_rgba(239,68,68,0.15)]
                 hover:bg-red-500/20 hover:text-white
                 transition-all duration-200 active:scale-[0.98]"
    >
      <BiLogOut size={18} className="group-hover:rotate-6 transition" />
      <span className="font-semibold">Sign Out</span>
    </button>
  </div>

  {/* PROFILE WRAPPER */}
  <div className="text-white px-4 sm:px-6 pt-24 pb-10 space-y-6 max-w-7xl mx-auto">
    {/* Profile Card */}
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-emerald-500/30 via-purple-500/20 to-indigo-500/20">
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-950/90 to-black
                      border border-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-7 overflow-hidden">

        {/* subtle glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

        {/* Top */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <img
              src="./avatar.png"
              alt="User avatar"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover
                         ring-2 ring-emerald-500/30 border border-white/10
                         shadow-[0_0_35px_rgba(16,185,129,0.12)]"
            />
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-black" />
          </div>

          {/* Info */}
          <div className="text-center sm:text-left min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white truncate">
                {user.username}
              </h1>

              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold
                               bg-emerald-500/10 text-emerald-200 border border-emerald-500/25">
                Beta Tester
              </span>
            </div>

            <p className="text-gray-400 text-sm sm:text-base mt-1 truncate">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300">
                Member since <span className="text-white font-semibold">2026</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300">
                Dtrue ID: <span className="text-white font-semibold">@{user.username}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          {/* Debates */}
          <div className="group rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-white/0">
            <div className="rounded-3xl bg-white/5 border border-white/10 py-5
                            hover:bg-white/10 transition shadow-[0_0_25px_rgba(255,255,255,0.04)]">
              <p className="text-3xl font-extrabold text-white group-hover:scale-105 transition">
                {NumDebate}
              </p>
              <p className="text-gray-400 text-sm mt-1">Debates</p>
            </div>
          </div>

          {/* Joined Debates */}
          <div className="group rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-white/0">
            <div className="rounded-3xl bg-white/5 border border-white/10 py-5
                            hover:bg-white/10 transition shadow-[0_0_25px_rgba(255,255,255,0.04)]">
              <p className="text-3xl font-extrabold text-white group-hover:scale-105 transition">
                {activeDebates.length}
              </p>
              <p className="text-gray-400 text-sm mt-1">Joined Debates</p>
            </div>
          </div>

          {/* Joined Year */}
          <div className="group rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-white/0">
            <div className="rounded-3xl bg-white/5 border border-white/10 py-5
                            hover:bg-white/10 transition shadow-[0_0_25px_rgba(255,255,255,0.04)]">
              <p className="text-3xl font-extrabold text-white group-hover:scale-105 transition">
                2026
              </p>
              <p className="text-gray-400 text-sm mt-1">Joined</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Your component */}
    <MineDebate NoOfdebates={Onofdebate} />
  </div>
</>
  );
};

export default Profile;
