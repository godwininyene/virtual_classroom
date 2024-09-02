import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaChildren, FaNotesMedical } from "react-icons/fa6";
import { FaQuestionCircle, FaRegTimesCircle,FaTimesCircle, FaThumbsUp, FaArrowCircleDown, FaArrowCircleUp} from 'react-icons/fa'
import { MdLocalActivity } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import {FaPlus} from 'react-icons/fa'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi';
import avatar from '@/Assets/img/user.png'
import { useState, useEffect } from 'react';
import Modal from '@/Components/CustomModal';
import TextInput from '@/Components/TextInput';
import Spinner from '@/Components/Spinner';
import video from '@/Assets/videos/lesson-1.mp4'

export default function Progress({ auth }) {
   
    const[progress, setProgress] = useState([]);

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

                    <div className="rounded-lg bg-white dark:bg-slate-800   overflow-x-auto shadow-sm shadow-white">
                                <h2 className="px-4 py-2 border-b font-semibold flex justify-between items-center">
                                    <span className="flex gap-2 items-center"> <FaChildren className="w-6 h-6 inline-block" />My Progress</span>
                                  
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
                    </div>
                </div>
            </div>

          
        </AuthenticatedLayout>
    );
}
