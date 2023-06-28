import React from 'react';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { WritingPage } from './pages/WritingPage/WritingPage';
import { Route, Routes } from 'react-router-dom';
import { RegistPage } from './pages/RegistPage';
import { ForgotPassword } from './pages/ForgotPassword';
import { Verification } from './pages/VerificationPage';
import { ResetPassword } from './pages/ResetPassword';
import SettingPage from './pages/SettingPage/SettingPage';
import { TrialWriting } from './pages/WritingPage/TrialWriting';


function App() {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  return (
    <div className="App">
      <>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/write-page' element={<TrialWriting/>} />
        <Route path='/register' element={<RegistPage/>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
        <Route path={`verification/${token}`} element={<Verification/>}></Route>
        <Route path={`/reset-password/${token}`} element={<ResetPassword/>}></Route>
        <Route path='/settings' element={<SettingPage/>}></Route>
      </Routes>
      </>
    </div>
  );
}

export default App;
