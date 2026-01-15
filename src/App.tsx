 import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Explore from './components/Explore'
import CreateDebates from './components/CreateDebates'
import Navbar from './components/Navbar'
import Rooms from './components/Rooms'
import Trend from './components/Trend'
import Home from './components/Home'
import EnterDebate from './components/sub-components/EnterDebate'
import Notification from './components/sub-components/Notification'
import SignIn from './components/SignIn'
import SignUp from './components/signup'
 
 
 
 
 
function App() {
 
   const location = useLocation();
   const hideNavbar = ["/sign-in", "/sign-up", "/"].includes(location.pathname);
 
  return (
    <>
        {!hideNavbar && <Navbar />}
        <Routes>
        <Route path="/home" element={<Home />} />       
        <Route path="/feed" element={< Feed />} />  
        <Route path="/rooms" element={<Rooms/>} />  
        <Route path="/profile" element={<Profile/>} /> 
         <Route path="/explore" element={<Explore/>}/> 
          <Route path="/trend" element={<Trend/>}/> 
          <Route path="/create" element={<CreateDebates/>}/> 
          <Route path="/entercreate/:id" element={<EnterDebate />} />               
          <Route path="/notification" element={ <Notification/>}/> 
          <Route path="/sign-in" element={ <SignIn/>}/> 
          <Route path="/" element={ <SignUp/>}/>
      </Routes>
      
       
    </>
  )
}

export default App