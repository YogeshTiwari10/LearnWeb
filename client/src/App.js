import { BrowserRouter ,Route, Routes} from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop.ScrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import PersonData from './components/PersonData';
// import Error from './components/Error';
import LoginNew from './components/Login/LoginNew';
import Roadmap from './components/Roadmap';

import React from 'react';
import CourseList from './components/Courses/CourseList';
import Contact from './components/Contact Us/Contact';
// import CourseDetails from './components/Courses/CourseDetails';

import Dashboard from './pages/Dashboard/Dashboard'
import CV from './pages/CV';
import Error from './pages/Error/Error';

import ResumeBuilder from './components/ResumeBuilder'


import {AuthProvider} from './context/Context'

function App() {
  


  return (
   <>
     <BrowserRouter>
     <AuthProvider>
     <ScrollToTop/>
     <Navbar />
     <Routes>
      <Route exact path='/' element={ <Home />} />
      <Route exact path='/Home' element={ <Home />} />
      <Route exact path='/login/' element={ <Login />} />
      <Route exact path='/signup/' element={ <Signup />} />
      <Route exact path='/persondata/' element={ <PersonData />} />
      <Route exact path='/loginnew' element={< LoginNew />}/>
      <Route exact path='/roadmap' element={< Roadmap />}/>
      <Route path='/contactus' element={<Contact/>} />
      <Route path='/test' element={<CV />} />
      
      <Route path="/courses" element={<CourseList />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      <Route path="/resume" element={<ResumeBuilder />} />



      
      {/* <Route path ='*' element={<Error/>}/> */}
      <Route path='*' element={<Error/>}/>
     
     </Routes>
     <Footer/>
     </AuthProvider>
     </BrowserRouter>
    </>
  );
}

export default App;
