import React from 'react'
import { Link } from 'react-router-dom'

function LinkButton({to, children}) {
  return (
     <div className='flex w-full justify-end'>
      <Link to={to} className='underline font-medium text-blue-600 text-sm md:text-md'>{children}</Link>
    </div>
  )
}

export default LinkButton