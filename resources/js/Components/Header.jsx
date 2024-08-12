import React, { useState } from 'react'
import avatar from '@/Assets/img/user.png'
import {RxDashboard} from 'react-icons/rx';
import {IoNotificationsOutline} from 'react-icons/io5'
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
const Header = ({isToggle, toggle, title, user}) => {   
  return (
    <header className="py-3 fixed  w-full z-20 md:py-2 px-4 bg-white  dark:bg-slate-800">
        <div className=' flex items-center'>

        
            <div className='w-auto flex-grow lg:flex-grow-0 lg:w-[70%] flex items-center'>
                <button  className=" text-slate-500 p-1 px-2 rounded-md flex  items-center justify-center md:hidden  relative z-50" onClick={() => toggle((prev) => !prev)}>
                    {
                        (!isToggle) ?(
                                <FaBars className="text-3xl  inline"/>
                            )
                            
                            :(
                                <MdClose className="text-3xl  inline-block"/>
                        ) 
                    }
                </button>
                            
                <h2 className="font-semibold text-slate-400 text-xl  leading-tight flex items-center gap-2 ml-2">
                                
                   
                <TextInput type="text" name="search" placeholder="Search Anything" required 
                    className=''
                />
                </h2>
            </div>

        

            <div className="flex items-center gap-4 pr-5">
                <span className="relative block">
                    <IoNotificationsOutline className="h-6 w-6" />
                </span>
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className='flex items-center cursor-pointer'>
                            <img src={user.user_avatar && user.user_avatar !==null ? user.user_avatar : avatar} alt=" " className={`h-10 w-10 rounded-full`} />
                            <span className='text-xs'> {user.first_name}</span>
                        </span>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    </header>
  )
}

export default Header