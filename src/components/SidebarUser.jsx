import React from 'react'
import { GoKebabHorizontal } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { RiCopperCoinLine } from "react-icons/ri";
import { useSelector } from 'react-redux';

function SidebarUser() {
  const currentUser = useSelector((state)=> state.auth.currentUser)
  const username = currentUser?.name  ||currentUser?.email?.split('@')[0] || ""
  return (
    <div className='main flex w-80 bg-gray-50 rounded'>
         <div className='sidebar flex flex-col rounded p-4 w-md items-center shadow-sm shadow-orange-50 pb-10'>
            <div className='cardheader flex items-center justify-between p-4 w-full'>
             <p className='body-2-semibold'>INGFO</p>
             <GoKebabHorizontal className='text-orange-500 cursor-pointer'/>
           </div>           
           <div className='flex flex-col w-full items-center gap-10'>
             <div className='profilecard flex flex-col gap-4'>
               <img src="./assets/gintoki.png" className='w-32 h-32 rounded-full'/>        
               <div className='flex flex-col w-full items-center gap-1'>
                <p className='body-1-bold'>{username}</p>
                <p className='body-3-regular text-gray-500'>Newbie</p>
               </div>
             </div>
             <div className='loyaltycard flex w-full'>
              <div className='flex flex-col w-full px-4 py-2 rounded-xl gap-4 bg-gradient-to-tr from-orange-100 to-orange-500'>
                <div className='flex items-center justify-between'>
                  <FaStar className='text-orange-50'/>
                  <div className='body-1-semibold text-white text-shadow-lg'>Tickitz Club</div>
                  <FaStar className='text-orange-50'/>
                </div>
                <div className='flex items-center justify-end gap-2 body-3-medium text-gray-300 text-shadow-lg '>
                  {/* <RiCopperCoinLine className='text-orange-500 ' /> */}
                  <div>0 pts</div>
                </div>
              </div>
             </div>
             <div className='flex flex-col w-full gap-2'>
              <p className='body-3-regular text-gray-700'> 300 points more to become a sinefil!</p>
              <div className='w-full h-4 bg-orange-100 rounded-md'></div>
             </div>
           </div>
         </div>
         
       </div>
  )
}

export default SidebarUser