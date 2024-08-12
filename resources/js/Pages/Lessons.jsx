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
    const[deleting, setDeleting] = useState(false);
    const[addModal, setAddModal] = useState(false);
    const[deleteModal, setDeleteModal] = useState(false);
    const[processing, setProcessing] = useState(false);
    const[selectedLesson, setSelectedLesson] = useState(false)
    const[ID, setID] = useState(null);
    const[timestamp, setTimestamp] = useState(null);
    const[editModal, setEditModal] = useState(false);

    let createLesson = async (e) => {
        e.preventDefault();
        setProcessing(true);
        let form = new FormData(e.target);
        await axios.post(route('api.lessons'), form)
        .then((res) => {
            if(res.data.success){
                alert(res.data.message)
                setLessons(prev => [res.data.body.lesson, ...prev])
            }
            setProcessing(false);
            setAddModal(false);
            e.target.reset();

        })
        .catch((err) => {
          setProcessing(false);
          console.log(err);
        });
    }

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
    },[timestamp]);

    let deleteLesson = async (lesson) => {
        setDeleting(true);
        setID(lesson.id);
        await axios.delete(route('api.lessons', {lesson_id: lesson.id}))
        .then((res) => {
          if(res.data.success){
            alert(res.data.message)
          }
          setDeleting(false);
          setTimestamp(Date.now())
          setDeleteModal(false);
        })
        .catch((err) => {
          console.log(err)
          setDeleting(false);
          setDeleteModal(false);
        });
    }

    const updateLesson = async(e)=>{
        e.preventDefault();
        setProcessing(true);
       
        let form = new FormData(e.target);
        await axios.post(route('api.lessons.update'), form)
        .then((res) => {
          setProcessing(false);
          if(res.data.success){
            alert(res.data.message)
            setTimestamp(Date.now())
            setEditModal(false);
            e.target.reset();
          }
        
        })
        .catch((err) => {
          setProcessing(false);
          console.log(err);
        });
    }
     

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
                           
                            {/* Action Button Start */}
                             <div className='max-w-6xl mx-auto mb-6'>
                                <div className='flex items-center justify-end col-span-2'>
                                    <button className="bg-green-700 inline-flex items-center gap-2 text-white text-xs font-semibold py-3 px-5 rounded-full" onClick={()=>setAddModal(true)}>
                                        <FaPlus className="h-4 inline-block" /> Add Lesson
                                    </button>
                                </div>
                            </div>

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
                                                <li className='text-gray-400 border-b'>{lesson.description}</li>

                                                <div className='mt-1'>
                                                    <button className="py-1 px-2 text-red-500" onClick={()=> {setDeleteModal(true); setSelectedLesson(lesson)}}>
                                                        {(deleting && setSelectedLesson.id == lesson.id) ? <Spinner size={6} /> : <BiTrashAlt  className="h-6 w-6"  /> }
                                                    </button>

                                                    <button className="py-1 px-2 text-blue-500" onClick={()=> {setSelectedLesson(lesson); setEditModal(true);}}>
                                                        <BiEditAlt  className="h-6 w-6"  />
                                                    </button>
                                                </div>
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
            <Modal show={addModal} onClose={() => setAddModal(false)} closeable={true} maxWidth='md'>
                <div className='py-3 px-4'>
                    <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                        <h1 className="text-lg font-semibold mb-4 border-b">
                            Add Lesson
                        </h1>
                        <form onSubmit={createLesson}>
                            <div className="mb-3 p-1 flex items-center  gap-1 space-x-1">
                                <div className="w-1/2">
                                    <label>Title</label>
                                    <TextInput
                                        name="title"
                                        className=""
                                        required
                                    />
                                </div>

                                <div className="w-1/2">
                                    <label>Content(video)</label>
                                    <input
                                        type='file'
                                        name="content"
                                        className="w-full py-[4px] focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg px-5 rounded-md border border-slate-300"
                                        required
                                    />
                                </div>       

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
            </Modal>

            {/* Delete Lesson Modal */}
            <Modal show={deleteModal} onClose={()=> setDeleteModal(false)} closeable={true} maxWidth='md'>
                <div className='py-3 px-4 text-center'>
                    <div className='mb-4'>
                        <FaQuestionCircle className="h-10 w-10 mx-auto text-primary" />
                    </div>
                    <h1 className="mb-4 text-base font-semibold">
                    Are you sure you want to delete this lesson: <span className='font-semibold text-red-500'>{selectedLesson.title}</span> ?
                    </h1>
                    <div className="flex gap-2 items-center justify-end">
                        <button onClick={() => deleteLesson(selectedLesson)} className='bg-green-700 text-white py-1 px-3 rounded-md inline-flex items-center gap-1'>
                        
                            {deleting  ? <Spinner size={6} /> :<span>  <FaThumbsUp className='w-4 h-4 inline' /> Yes</span> }
                        </button>
                        <button onClick={() => setDeleteModal(false)} className='bg-red-500 text-white py-1 px-3 rounded-md inline-flex items-center gap-1'>
                            <FaRegTimesCircle className='w-4 h-4 inline' /> Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal show={editModal} maxWidth="lg" onClose={() => setEditModal(false)} backDrop={false}>
                <div className='py-3 px-4'>
                    <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                        <h1 className="text-lg font-semibold mb-4 border-b">
                            Edit Lesson
                        </h1>
                        <form onSubmit={updateLesson}>
                            <input type="hidden" value={selectedLesson.id} name='lesson_id' />
                            <div className="mb-3 p-1 flex items-center  gap-1 space-x-1">
                                <div className="w-1/2">
                                    <label>Title</label>
                                    <TextInput
                                        name="title"
                                        className=""
                                        defaultValue={selectedLesson.title}
                                    />
                                </div>

                                <div className="w-1/2">
                                    <label>Content(video)</label>
                                    <input
                                        type='file'
                                        name="content"
                                        className="w-full py-[4px] focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg px-5 rounded-md border border-slate-300"
                                      
                                    />
                                </div>       

                            </div>

                            <div className='mb-3'>
                                <label>Description (Optional)</label>
                                <textarea
                                    name="description"
                                    className="block w-full py-2 px-5 rounded-md border-1 border-slate-300 bg-transparent placeholder:text-xs placeholder:font-medium text-slate-900 transition-all duration-300  focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg"
                                    defaultValue={selectedLesson.description}
                                />
                            </div>

                            <div>
                                <button className="bg-green-700 inline-flex items-center gap-2 text-white text-xs font-semibold py-3 px-5 rounded-full">
                                    {processing ? <Spinner size={5} />  :  <FaPlus className="h-4 inline-block" /> }
                                    Save Changes
                                </button>
                            </div>

                        </form>
                    </aside>
                
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
