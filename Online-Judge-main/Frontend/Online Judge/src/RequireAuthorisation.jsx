import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from './Hooks/useAuth';



function RequireAuthorisation({ allowedRoles }) {
  const { user } = useAuth()
  const location = useLocation()
  return (
    user?.roles?.find(role => allowedRoles?.includes(role)) ?
      <Outlet /> : user ? <Navigate to={'/unauthorised'} state={{ from: location }} replace /> :
        <Navigate to={'/login'} state={{ from: location }} replace />

  )
}

export default RequireAuthorisation
