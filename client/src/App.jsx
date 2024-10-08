
import './App.css'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import TrainerSignup from './trainer/TrainerSignUp'
import {Routes,Route} from 'react-router-dom'
import UserHome from './user/UserHome'
import TrainerHome from './trainer/TrainerHome'
import Profile from './trainer/Profile'
import TrainerUpdate from './trainer/TrainerUpdate'
import TrainerFullDetails from './user/TrainerFullDetails'
import Home from './HomePage/Home'


function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/userhome' element={<UserHome/>} />
        <Route path='/trainersignup' element={<TrainerSignup/>}/>
        <Route path='/trainerhome' element={<TrainerHome/>}/>
        <Route path='/trainerprofile' element={<Profile/>}/>
        <Route path='/trainerupdate' element={<TrainerUpdate/>}/>
        <Route path='/tfulldetails' element={<TrainerFullDetails/>}/>

      </Routes>
      
    </>
  
  )
}

export default App
