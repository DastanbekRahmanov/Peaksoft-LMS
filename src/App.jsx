import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'

export const App = () => {
   const location = useLocation()
   if (location.pathname === '/') return <Navigate to="/login" replace />

   return (
      <div>
         <AppRoutes />
      </div>
   )
}
