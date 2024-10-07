import React from 'react'
import { useState } from 'react'
import './App.scss'
import SignUp from './components/SignUp'
import HomeScreen from './components/HomeScreen'
import Login from './components/Login'
import { Routes, Route, Navigate } from 'react-router-dom';
//npm run dev to start on localhost

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<SignUp />}/>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/home" element={<HomeScreen />}></Route>
    </Routes>
    </>
  )
}

export default App
