import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaChildren, FaNotesMedical } from "react-icons/fa6";
import { MdLocalActivity } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import avatar from '@/Assets/img/user.png'
import { useEffect, useState } from 'react';

export default function Dashboard({ auth }) {
    const [statistics, setStatistics] = useState(null);
    const[progress, setProgress] = useState([]);

    const fetchStatistics = async () => {
        await axios.get(route('api.statistics'))
        .then((res) => {
          setStatistics(res.data.body)
        })
        .catch((err) => {
            console.log(err)
        });
    }

    const fetchProgress = async()=>{
        await axios.get(route('api.progress', {student_id:auth.user.student_id}))
        .then((res) => {
          setProgress(res.data.progress)
         
        })
        .catch((err) => {
            console.log(err)
        });
    }
    useEffect(()=>{
        fetchStatistics();
        fetchProgress();
    },[]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-3">
                <div className="">
                    <div className=" dark:bg-gray-800  sm:rounded-lg">
                        <div className=" text-gray-900 dark:text-gray-100">
                            {/* Dashboard Overview Cards Start */}
                            <div className="views overview mb-10">

                                <div className="values grid grid-cols-2 xl:grid-cols-4 gap-4">

                                    

                               

                                    <div className="val-box bg-white dark:bg-slate-800  px-3 py-4 lg:px-5 rounded-md block lg:flex  items-center justify-between shadow-lg">

                                        <span className=" flex-shrink-0 text-2xl w-12 h-12 lg:w-14 lg:h-14 flex justify-center items-center rounded-full text-center text-white mr-3 bg-[#e45d99]">
                                            <FaNotesMedical className='inline-block text-3xl' />
                                        </span>
                                        <div>
                                            <span className="text-base text-[#828997] dark:text-primary-light">My Lessons</span>
                                        
                                            <h3 className="text-2xl font-bold">
                                                {statistics && statistics.total_lessons}
                                            </h3>
                                        </div>
                                    </div>


                                    <div className="val-box bg-white dark:bg-slate-800 px-3 py-4 lg:px-5 rounded-md block lg:flex  items-center justify-between shadow-lg">

                                        <span className=" flex-shrink-0 text-2xl w-12 h-12 lg:w-14 lg:h-14 flex justify-center items-center rounded-full text-center text-white mr-3 bg-[#41dc9a]">
                                            <MdLocalActivity  className='inline-block text-3xl' />
                                        </span>
                                        <div>
                                            <span className="text-base text-[#828997] dark:text-primary-light">My Activities</span>
                                            <h3 className="text-2xl font-bold">
                                                {statistics && statistics.total_activities}
                                            </h3>
                                        </div>
                                    </div>

    
                                   
                                </div>
                            </div> 
                            {/* Dashboard Overview Cards Start */}

                            {/* Dashboard Students Start */}
                            <div className="rounded-lg bg-white dark:bg-slate-800   overflow-x-auto shadow-sm shadow-white">
                                <h2 className="px-4 py-2 border-b font-semibold flex justify-between items-center">
                                    <span className="flex gap-2 items-center"> <FaChildren className="w-6 h-6 inline-block" />My Progress</span>
                                    <Link href={`/progress`} className="text-blue-500 underline text-sm py-2 px-3 inline-block">View All</Link>
                                </h2>
                                <table className="w-full">
                                    
                                    <thead className='bg-sky-950 text-white text-left'>
                                        <th className="py-1 px-3 whitespace-nowrap">sn</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Lesson</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Activity</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Activity Content</th>
                                        <th className="py-1 px-3 whitespace-nowrap">My Answers</th>
                                        <th className="py-1 px-3 whitespace-nowrap">My Score</th>
                                    </thead>

                                    <tbody>
                                        {
                                    
                                            progress.length == 0?(
                                                <tr className="even:bg-teal-50">
                                                <td className="whitespace-nowrap border py-2 px-4" colSpan="7">
                                                    <div className="flex items-center justify-center gap-5 w-full py-4">
                                                    <span>No record available</span>
                                                    </div>
                                                </td>
                                                </tr>
                                            ): null
                                        } 

                                        {
                                        progress && progress.map((progress, index)=>(
                                            
                                            <tr  className="odd:bg-slate-100 dark:odd:bg-slate-800" key={index}>
                                               
                                                <td className="px-3 py-2">{1 + index}</td>
                                                
                                                <td className="px-3 py-2">{progress.lesson.title}</td>
                                                <td className="px-3 py-2">{progress.activity.title}</td>
                                                <td className="px-3 py-2">{progress.activity.content}</td>
                                                <td className="px-3 py-2">{progress.answers}</td>
                                                <td className="px-3 py-2">{progress.score}</td>
                                            </tr>
                                        ))
                                       }

                                        
 
                                    </tbody>
                                </table>
                            </div>
                            {/* Dashboard Students End */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
