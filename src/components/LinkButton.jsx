import React from 'react'
import { Link } from 'react-router-dom'

function LinkButton({to, children}) {
  return (
     <div className='flex w-full justify-end'>
      <Link to={to} className='underline body-3-medium text-blue-600'>{children}</Link>
    </div>
  )
}

export default LinkButton