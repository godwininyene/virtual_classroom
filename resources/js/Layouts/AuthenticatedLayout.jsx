import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [toggle, setToggle] = useState(false)

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 dark:text-slate-200">
          
            
            <Sidebar  isToggle={toggle} user={user}/>
           
            <aside className="md:ml-56 min-h-full relative">
                {/* Header Content Start */}
                <Header toggle={setToggle} isToggle={toggle}  user={user}/>
                {/* Header Content End */}


                {/* Main Content Start */}
                <main className="pt-[64px]  px-4 text-slate-800 dark:text-slate-300 relative z-0  overflow-x-auto">
                    {children}
                </main>
                {/* Main Content End */}
            
            </aside>
       
        </div>
    );
}
