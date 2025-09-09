import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../HomePage/NavBar'

function Layout() {
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

export default Layout