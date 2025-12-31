import { SetStateAction, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaPlus, FaBars, FaTimes } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [actives, setActives] = useState("/");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/");


  const handleActive = (path: SetStateAction<string>) => {
    setActives(path);
    setOpen(false);
    setActive(path)
  };

  return (
    <>
      <div className="fixed   top-0 z-50 w-full flex items-center justify-between px-2
      font-medium text-[1.2rem] text-gray-300 bg-opacity-35 backdrop-blur-sm border-b border-gray-800">

        {/* LOGO */}
        <Link to="/" onClick={() => handleActive("/")}>
          <img src="/logo.png" alt="" className="w-20 h-15  rounded-5" />
          
        </Link>

        <h1
  className="
    lg:hidden
    text-2xl font-black
    tracking-wide
    text-white
    relative
    select-none
    active:scale-95
  "
>
  Dture

  <span
    className="
      absolute left-0 -bottom-1
      w-full h-[2px]
      bg-green-400
      opacity-70
      rounded-full
      shadow-[0_0_6px_rgba(74,222,128,0.6)]
    "
  />
</h1>



        {/* Mobile Hamburger */}
        <button className=" lg:hidden text-white text-3xl" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className='hidden lg:flex'>  
          
          <ul className="  nav nav-pills space-x-6 gap-8">
          { !open &&[
            { to: "/", label: "Home" },
            { to: "/feed", label: "Feed" },
            { to: "/trend", label: "Trend" },
            { to: "/explore", label: "Explore" },
            { to: "/rooms", label: "Rooms" },
          ].map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={() => handleActive(item.to)}
                className={` text-white nav-link no-underline hover:-translate-y-1 ${
                  actives === item.to
                    ? "actives font-semibold shadow-[0_0_25px_4px_rgba(134,239,172,0.4)] hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7)] transition-all duration-300"
                    : "text-black"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul></div>
      

        {/* Desktop - Right */}
        <div className="hidden lg:flex text-xl items-center gap-4">
          <Link to="/create" className="flex p-2 nav-link">
            <button
              className="bg-green-600 flex w-60 items-center h-10 rounded-5 border text-white justify-center
              font-semibold mt-2 shadow-[0_0_25px_4px_rgba(134,239,172,0.4)]
              hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7)] transition-all duration-300 hover:-translate-y-1"
              onClick={() => handleActive("/create")}
            >
              <FaPlus className="mr-2" /> Create Your Debates
            </button>
          </Link>

          <Link to="/profile">
            <CgProfile size={40} className="text-white" onClick={() => handleActive("/profile")} />
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
       <div className=" no-underline hover:no-underline  lg:hidden bg-gray-900/95 backdrop-blur-md w-full flex flex-col px-6 py-3 
                justify-center items-center gap-1 mt-13">

  {[
    { to: "/", label: "Home" },
    { to: "/feed", label: "Feed" },
    { to: "/trend", label: "Trend" },
    { to: "/explore", label: "Explore" },
    { to: "/rooms", label: "Rooms" },
  ].map((item) => (
     <Link
      key={item.to}
      to={item.to}
      onClick={() => handleActive(item.to)}
      className={` text-white nav-link no-underline hover:-translate-y-1
          no-underline hover:no-underline
    w-full text-center text-lg font-medium py-1 rounded-xl
    transition-all duration-300
    ${
      active === item.to
        ? "text-green-400 bg-green-500/10 shadow-[0_0_15px_rgba(74,222,128,0.35)]"
        : "text-gray-300 hover:text-white hover:bg-white/5"
        }
      `}
    >
      {item.label}
    </Link>
  ))}

  {/* CTA */}
  <Link to="/create" className=" nav-link on-underline mt-1">
    <button
      className="w-49 flex items-center justify-center gap-2
                 bg-green-500 text-black text-xl font-bold py-2 rounded-5
                 shadow-[0_0_25px_4px_rgba(134,239,172,0.4)]
                 hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7)]
                 transition-all duration-300 "
    >
      <FaPlus className="text-lg" />
      Create Your Debate
    </button>
  </Link>

  {/* Profile */}
  <Link
    to="/profile"
    className="mt-1 flex items-center justify-center
               w-12 h-12 rounded-full bg-white/10
               hover:bg-white/20 transition-all"
  >
    <CgProfile size={28} className="text-white" />
  </Link>
</div>

      )}

      {/* Notification Button */}
      <div
        className="fixed bottom-5 right-5 text-green-600 bg-gray-900 rounded-5 p-2 border-green-300
        shadow-[0_0_25px_4px_rgba(134,239,172,0.4)]
        hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7)]
        transition-all duration-300 hover:-translate-y-1"
      >
        <Link to="/notification">
          <IoNotificationsSharp size={40} className="text-green-600" />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
