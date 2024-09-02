import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaChildren, FaNotesMedical } from "react-icons/fa6";
import { FaQuestionCircle, FaRegTimesCircle,FaTimesCircle, FaThumbsUp} from 'react-icons/fa'
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

export default function Lessons({ auth }) {
    const[lessons, setLessons] = useState([]);
    const[processing, setProcessing] = useState(false);
    
    const getAllLessons = async()=>{
        await axios.get(route('api.lessons'))
        .then((res) => {
            setLessons(res.data.body.lessons);
        })
        .catch((err) => {
          console.log(err)
        });
    }

    useEffect(()=>{
        getAllLessons();
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

                            {/*Lessons Start */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">

                            {
                                
                                lessons.length == 0?(
                                    <div className="even:bg-teal-50 col-span-3">
                                    <td className="whitespace-nowrap border py-2 px-4 ">
                                        <div className="flex items-center justify-center gap-5 w-full py-4">
                                        <span>No record available</span>
                                        </div>
                                    </td>
                                    </div>
                                ): null
                            } 

                            {
                                lessons && lessons.map((lesson, index)=>(
                                    <div key={lesson.id} className={`${(1 == 2) && 'border border-blue-500'} bg-white  overflow-hidden block enabled:bg-black  rounded-lg shadow-lg h-full transition-all duration-300 hover:-translate-y-2`}>
                                        <ul className="">
                                            <div className='h-56'>
                                                <video src={lesson.content} controls className='w-full h-full object-cover rounded-lg'></video>
                                            </div>
                                            <div className='py-2 px-4'>
                                                <li className='font-semibold text-lg'>{lesson.title}</li>
                                                <li className='text-gray-400'>{lesson.description}</li>
                                            </div>
                                        
                                        </ul>
                                    </div>
                                ))
                            }
                            </section>  
                            {/* Lessons End */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Lesson Modal */}
            {/* <Modal show={addModal} onClose={() => setAddModal(false)} closeable={true} maxWidth='md'>
                <div className='py-3 px-4'>
                    <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                        <h1 className="text-lg font-semibold mb-4 border-b">
                            Add Lesson
                        </h1>
                        <form onSubmit={createLesson}>
                           
                            <div className="w-full mb-3">
                                <label>Title</label>
                                <TextInput
                                    name="title"
                                    className=""
                                    required
                                />
                            </div>

                            <div className="w-full mb-3">
                                <label>Content(video)</label>
                                <input
                                    type='file'
                                    name="content"
                                    className="w-full py-[4px] focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg px-5 rounded-md border border-slate-300"
                                    required
                                />
                            </div>       

                           

                            <div className='mb-3'>
                                <label>Description (Optional)</label>
                                <textarea
                                    name="description"
                                    className="block w-full py-2 px-5 rounded-md border-1 border-slate-300 bg-transparent placeholder:text-xs placeholder:font-medium text-slate-900 transition-all duration-300  focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg"
                                    required
                                />
                            </div>

                            <div>
                                <button className="bg-green-700 inline-flex items-center gap-2 text-white text-xs font-semibold py-3 px-5 rounded-full">
                                    {processing ? <Spinner size={5} />  :  <FaPlus className="h-4 inline-block" /> }
                                    Save Lesson
                                </button>
                            </div>

                        </form>
                    </aside>
                
                </div>
            </Modal> */}

          
        </AuthenticatedLayout>
    );
}
