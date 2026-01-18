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
          "http://localhost:3000/user/me",
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
      const res = await axios.get("http://localhost:3000/debates");
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
      {/* LOGOUT */}
      <div className="fixed top-21 right-8 bg-red-500 rounded-xl shadow-lg">
        <button
          onClick={handleLogout}
          className="text-white flex items-center p-2"
        >
          <BiLogOut size={20} className="mr-1" /> Sign Out
        </button>
      </div>

      {/* PROFILE */}
      <div className="text-white   p-4 mt-11 space-y-5">
       <div className="
         bg-gradient-to-br from-gray-900 via-gray-950 to-black
        border border-white/10
         rounded-3xl
          p-6 sm:p-5
        shadow-2xl
         ">

  {/* Top Section */}
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

    {/* Avatar */}
    <img
      src="./avatar.png"
      alt="User avatar"
      className="
        w-28 h-28 sm:w-32 sm:h-32
        rounded-full
        object-cover
        ring-2 ring-emerald-900
        shadow-lg
      "
    />

    {/* User Info */}
    <div className="text-center sm:text-left">
      <h1 className="text-2xl sm:text-3xl font-bold text-white">
        {user.username}
      </h1>
      <p className="text-gray-400 text-sm sm:text-base">
        {user.email}
      </p>

      <p className="mt-2 text-sm text-emerald-400 font-medium">
        Beta tester of Dture
      </p>
    </div>
  </div>

  {/* Stats */}
  <div className="
    mt-8
    grid grid-cols-1 sm:grid-cols-3
    gap-6
    text-center
  ">

    <div className="bg-white/5 font-bold rounded-2xl py-4 border border-white/10">
      <p className="text-3xl  text-white">
        {NumDebate}
      </p>
      <p className="text-gray-400 text-lg mt-1">
        Debates
      </p>
    </div>

    <div className="bg-white/5 font-bold rounded-2xl py-4 border border-white/10">
      <p className="text-3xl  text-white">
        {activeDebates.length}
      </p>
      <p className="text-gray-400 text-lg mt-1">
        Active Debates
      </p>
    </div>

    <div className="bg-white/5 font-bold rounded-2xl py-4 border border-white/10">
      <p className="text-3xl  text-white">
        0
      </p>
      <p className="text-gray-400 text-lg mt-1">
        Followers
      </p>
    </div>

  </div>
</div>


        <MineDebate NoOfdebates={Onofdebate}/>
      </div>
    </>
  );
};

export default Profile;
