import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'


function Layout() {
  return (
    <>
      <Outlet/>
      <Header/>
      <Footer/>
    </>
  )
}

export default Layout
