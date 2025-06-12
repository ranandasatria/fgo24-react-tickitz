import React from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { FaStar } from 'react-icons/fa';
import { RiCopperCoinLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';

function SidebarUser() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const username = currentUser?.name || currentUser?.email?.split('@')[0] || '';
  return (
    <div className='w-full md:w-64 bg-gray-50 rounded'>
      <div className='flex flex-col rounded p-2 md:p-4 w-full items-center shadow-sm shadow-primary-50 pb-4 md:pb-6'>
        {/* <div className='cardheader flex items-center justify-between p-2 md:p-4 w-full'>
          <p className='body-2-semibold'>INGFO</p>
          <GoKebabHorizontal className='text-primary-500 cursor-pointer' />
        </div> */}
        <div className='flex flex-col w-full items-center gap-4 md:gap-6'>
          <div className='profilecard flex flex-col gap-2 md:gap-4'>
            <img src='./assets/gintoki.png' className='w-24 md:w-32 h-24 md:h-32 rounded-full' />
            <div className='flex flex-col w-full items-center gap-1 md:gap-1'>
              <p className='body-1-bold text-sm md:text-base'>{username}</p>
              <p className='body-3-regular text-gray-500 text-xs md:text-sm'>Newbie</p>
            </div>
          </div>
          <div className='loyaltycard flex w-full'>
            <div className='flex flex-col w-full px-2 md:px-4 py-1 md:py-2 rounded-xl gap-2 md:gap-4 bg-gradient-to-tr from-primary-100 to-primary-500'>
              <div className='flex items-center justify-between'>
                <FaStar className='text-primary-50 text-sm md:text-base' />
                <div className='body-1-semibold text-white text-shadow-lg text-sm md:text-base'>Tickitz Club</div>
                <FaStar className='text-primary-50 text-sm md:text-base' />
              </div>
              <div className='flex items-center justify-end gap-1 md:gap-2 body-3-medium text-gray-300 text-shadow-lg text-xs md:text-sm'>
                <div>0 pts</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full gap-1 md:gap-2'>
            <p className='body-3-regular text-gray-700 text-xs md:text-sm'>300 points more to become a sinefil!</p>
            <div className='w-full h-2 md:h-4 bg-primary-300 rounded-md'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarUser;