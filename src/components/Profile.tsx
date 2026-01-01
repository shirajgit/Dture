 import { useContext } from "react";
import MineDebate from "./sub-components/MineDebates"
import { DebateContext } from "../DebatesContext";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import Footer from "./HomeComp/Fotter";

const Profile = () => {  

   const { debates } = useContext(DebateContext); // get debates array

  return ( <> 
  <div className=" fixed bg-red-500 top-17 right-4 flex items-center justify-center font-bold  rounded-5 shadow-[0_0_25px_4px_rgba(255,0,0,0.6)] hover: shadow-[0_0_25px_4px_rgba(255,0,0,0.6)]  ">
     <Link to='/sign-up' className="nav-link on-underline" > <button className="   text-white bold no-underline flex flex-row rounded-5 p-2  ">    <BiLogOut className="mr-1"  size={20}/>Sign Out</button></Link>
  </div>
    <div className="text-white p-4 rounded-2xl mt-24 space-y-5" >
         
        <div className=" rounded-2xl object-cover   "  > 
            <div className=" flex  h-flex bg-gray-900 rounded-2xl p-10  flex flex-row mb-10 shadow-[0_0_25px_4px_rgba(134,239,172,0.4)]  
                         transition-all duration-300 transform  ">
           <div className="ml-10 hidden flex flex-col lg:block"> <img src="\shiraj.jpg" alt="" className="w-30 ml-20 rounded-5" />   
                      <div className="text-3xl font-bold mt-10">Shiraj_mujawar786</div>
            </div>
            
          <div className="container text-center">
             
  <div className="row flex text-center text-2xl lg:text-5xl font-semibold">
 <div className=" col lg:hidden flex lg:block mb-10">
   <img src="\shiraj.jpg" alt="" className="w-20  rounded-5" />   
    <div className="text-3xl font-bold mt-3 ml-2">Shiraj_mujawar786</div>
  </div>
    <div className="col ">
    50
 
    <p className="text-lg font-sm mt-30"> Followers</p>
    </div>
    <div className="col ">
      20
    
    <p className="text-lg font-sm mt-30"> Following</p>
    </div>
    <div className="col">
    {debates.length}
    <p className="text-lg font-sm mt-30"> Debates</p>
    </div>
       <p className=" mt-50 text-2xl text-white"> <br />A beta tester of Dture</p>   
  </div>
 
  </div> 
        </div>
 
<div  className="  flex  items-center justify-center ">
  <div className="items-center w-full bg-gray-900 rounded-4 mb-20 shadow-[0_0_25px_4px_rgba(134,239,172,0.4)]                  
                         transition-all duration-300 transform ">  
    <h1 className=" ml-40 md:ml-159 text-xl font-bold text-gray-500 "> Debates </h1></div>
  
    </div>     
    <MineDebate ></MineDebate>
        </div>
        
       
    </div>
  </>)
}

export default Profile