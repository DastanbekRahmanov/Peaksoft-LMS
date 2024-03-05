import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
   return (
      <div>
         <p>Page is not found: error 404</p>
         <Link to="/">Back to home</Link>
      </div>
   )
}
