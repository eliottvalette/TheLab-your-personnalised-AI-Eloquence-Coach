// Laboratoire/src/Main.jsx 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React , { StrictMode }  from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import FreeAnalysis from './FreeAnalysis.jsx'
import TheLab from './TheLab.jsx'
import NoPage from './NoPage.jsx'
import Account from './Account.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/models' element={<TheLab/>}/>
      <Route path='/analysis' element={<FreeAnalysis/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/*' element={<NoPage/>}/>
    </Routes>
  </BrowserRouter>
)
