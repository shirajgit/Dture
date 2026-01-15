import { useContext, useEffect, useState } from "react";
import MineDebate from "./sub-components/MineDebates";
import { DebateContext } from "../DebatesContext";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { debates } = useContext(DebateContext);
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

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

  if (!user) return <p className="text-white">Loading...</p>;

  return (
    <>
      {/* LOGOUT */}
      <div className="fixed top-20 right-4 bg-red-500 rounded shadow-lg">
        <button
          onClick={handleLogout}
          className="text-white flex items-center p-2"
        >
          <BiLogOut size={20} className="mr-1" /> Sign Out
        </button>
      </div>

      {/* PROFILE */}
      <div className="text-white p-4 mt-24 space-y-5">
        <div className="bg-gray-900 rounded-2xl p-10 flex shadow-lg">
          <div className="flex items-center gap-10">
            <img
              src="./avatar.png"
              className="w-29 lg:w-55 rounded-full "
            />

            <div>
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
       
         <div className="ml-50 flex flex-col items-center">
          <div className="flex gap-50 text-3xl m-10 text-center">
            <div>
              {debates.length}
              <p className="text-gray-400">Debates</p>
            </div>
            <div>
              0
              <p className="text-gray-400">Followers</p>
            </div>
            <div>
              0
              <p className="text-gray-400">Following</p>
            </div>
          </div>
         
          <p className="  text-xl text-gray-300">
            A beta tester of Dture
          </p>
          </div>
        </div>

        <MineDebate />
      </div>
    </>
  );
};

export default Profile;
