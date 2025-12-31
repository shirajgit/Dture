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
import SignUp from './components/auth/Sign-up'
import SignIn from './components/auth/Sign-in'
 
 
function App() {
 
   const location = useLocation();
   const hideNavbar = ["/sign-in", "/sign-up"].includes(location.pathname);
 
  return (
    <>
        {!hideNavbar && <Navbar />}
        <Routes>
        <Route path="/" element={<Home />} />       
        <Route path="/feed" element={< Feed />} />  
        <Route path="/rooms" element={<Rooms/>} />  
        <Route path="/proflie" element={<Profile/>} /> 
         <Route path="/explore" element={<Explore/>}/> 
          <Route path="/trend" element={<Trend/>}/> 
          <Route path="/create" element={<CreateDebates/>}/> 
          <Route path="/entercreate/:id" element={<EnterDebate />} />        
          <Route path="/sign-up" element={ <SignUp/>}/> 
           <Route path="/sign-in" element={ <SignIn/>}/> 
          <Route path="/notification" element={ <Notification/>}/> 
      </Routes>
       
    </>
  )
}

export default App