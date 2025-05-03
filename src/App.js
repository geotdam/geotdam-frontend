import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/Main/Main'
import Header from './components/Section/Header'
import Mypage from './components/Mypage/Mypage'
import Login from './components/Login/Login'
import { Join } from './components/Join/Join'
import Nav from './components/Section/Nav'
import SocialLogin from './components/Login/SocialLogin';
import Redirection from './components/Login/Redirection';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/mypage' element={<Mypage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/join' element={<Join />} />
                <Route path="/social" element={<SocialLogin />} />
                <Route path="/oauth/kakao/callback" element={<Redirection />} />
            </Routes>
            <Nav />
        </BrowserRouter>
    )
}

export default App