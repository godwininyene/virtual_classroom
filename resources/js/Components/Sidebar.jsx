import React, { useState } from 'react'
import {HiOutlineLogout} from 'react-icons/hi'
// import logo from '@/Assets/img/logo.png'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaChildren, FaNotesMedical } from "react-icons/fa6";
import { MdLocalActivity } from "react-icons/md";
import { GiProgression } from "react-icons/gi";


const Sidebar = ({isToggle, user}) => {
  return (
    <div className={`fixed h-full  ${isToggle ? 'left-0' : '-left-56 md:left-0 '} top-[65px] md:top-0 w-56 bg-sky-950 shadow transition-all duration-500 z-50`}>

    <div className="md:py-2 md:px-4 flex flex-col h-full">
        {/* Brand Name */}
        <section className="bg-yellow-400 text-center py-3 px-1 mt-1 rounded-md shadow-md  md:block">
          <h1 className='text-white text-xl font-semibold'>Virtual Classroom</h1>
        </section>

        <hr className="my-5 hidden md:block" />

         {/* Navigations */} 
        <div className="flex-grow-0 lg:flex-grow   relative z-50 max-w-full mt-2">
            <ul className="flex flex-col justify-between md:justify-start md:gap-3">
              {
                user.role == 'teacher'? (
                    <div className="">
                        <li className="flex-grow">
                            <Link href="/dashboard" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-1  px-3 md:px-4 ${route().current('dashboard') ? 'text-white  border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                            <RiDashboardHorizontalFill className='text-yellow-400'/>
                                <span className="text-xs md:text-sm"> Dashboard </span>
                            </Link>
                        </li>

                        <li className="flex-grow">
                            <Link href="/students" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-2  px-3 md:px-4 ${route().current('students') || route().current('add_student') || route().current('edit_student') ? 'text-white  border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                            <FaChildren className='text-yellow-400'/>
                                <span className="text-xs md:text-sm"> Students </span>
                            </Link>
                        </li>

                        <li className="flex-grow">
                            <Link href="/parents" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-2  px-3 md:px-4 ${route().current('parents')  ? 'text-white  border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                            <FaChildren className='text-yellow-400'/>
                                <span className="text-xs md:text-sm"> Parents </span>
                            </Link>
                        </li>
                

                        <li className="flex-grow">
                            <Link href="/lessons" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-2  px-3 md:px-4 ${route().current('lessons') ? 'text-white  border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                                <FaNotesMedical className='text-yellow-400'/>
                                <span className="text-xs md:text-sm">Lessons</span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href="/activities" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-2  px-3 md:px-4 ${route().current('activities') ? 'text-white dark:text-primary border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                            <MdLocalActivity className='text-yellow-400'/>
                                <span className="text-xs md:text-sm">Activities</span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href="/progress" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-2  px-3 md:px-4 ${route().current('allBookings') ? 'text-white dark:text-primary border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                                <GiProgression className='text-yellow-400'/>
                                <span className="text-xs md:text-sm">Progress</span>
                            </Link>
                        </li>

                       
                    </div>
                ):(
                    <div className="">
                        <li className="flex-grow">
                            <Link href="/dashboard" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-1  px-3 md:px-4 ${route().current('dashboard') ? 'text-white  border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                            <RiDashboardHorizontalFill className='text-yellow-400'/>
                                <span className="text-xs md:text-sm"> Dashboard </span>
                            </Link>
                        </li>

                       

                       
                        <li className="flex-grow">
                            <Link href="/lessons" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-2  px-3 md:px-4 ${route().current('lessons') ? 'text-white  border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                                <FaNotesMedical className='text-yellow-400'/>
                                <span className="text-xs md:text-sm">Lessons</span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href="/activities" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-2  px-3 md:px-4 ${route().current('activities') ? 'text-white dark:text-primary border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                            <MdLocalActivity className='text-yellow-400'/>
                                <span className="text-xs md:text-sm">Activities</span>
                            </Link>
                        </li>
                        <li className="flex-grow">
                            <Link href="/progress" className={`transition-all duration-100 font-bold md:gap-2 rounded-md flex flex-col md:flex-row items-center py-2  px-3 md:px-4 ${route().current('progress') ? 'text-white dark:text-primary border-b border-slate-300' : 'text-slate-300'} dark:text-white   hover:text-yellow-400 hover:bg-sky-900`}>
                                <GiProgression className='text-yellow-400'/>
                                <span className="text-xs md:text-sm">Progress</span>
                            </Link>
                        </li>

                       
                    </div>
                )
              }
               
            </ul>
        </div>

       
    </div>
</div>
  )
}

export default Sidebar