import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function PrivateRoute({ Component, roles }) {
   // after success login i will check the role
   const { role } = useSelector((state) => state.auth.user)
   const isUserHasRole = role && roles.includes(role)
   if (!isUserHasRole) return <Navigate to="/" replace />
   return Component
}
