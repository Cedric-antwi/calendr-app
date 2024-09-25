import React from 'react'
import { useState } from 'react'
import './App.scss'
import SignUp from './components/SignUp'
import HomeScreen from './components/HomeScreen'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<SignUp />}/>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/home" element={<HomeScreen />}></Route>
    </Routes>
    </>
  )
}

export default App
