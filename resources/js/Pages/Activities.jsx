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

export default function Activities({ auth }) {
    const[activities, setActivities] = useState([]);
    const[lessons, setLessons] = useState([])
    const[deleting, setDeleting] = useState(false);
    const[addModal, setAddModal] = useState(false);
    const[deleteModal, setDeleteModal] = useState(false);
    const[processing, setProcessing] = useState(false);
    const[selectedActivity, setSelectedActivity] = useState(false)
    const[ID, setID] = useState(null);
    const[timestamp, setTimestamp] = useState(null);
    const[editModal, setEditModal] = useState(false);

    let createActivity = async (e) => {
        e.preventDefault();
        setProcessing(true);
        let form = new FormData(e.target);
        await axios.post(route('api.activities'), form)
        .then((res) => {
            if(res.data.success){
                alert(res.data.message)
                setActivities(prev => [res.data.body.activity, ...prev])
            }else{
                alert('Could not create activity. Please try again!')
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

    
    const getAllActivities = async()=>{
        await axios.get(route('api.activities'))
        .then((res) => {
            setActivities(res.data.body.activities);
        })
        .catch((err) => {
          console.log(err)
        });
    }

    useEffect(()=>{
        getAllLessons();
        getAllActivities();
    },[timestamp]);

    let deleteActivity = async (activity) => {
        setDeleting(true);
        setID(activity.id);
        await axios.delete(route('api.activities', {activity_id: activity.id}))
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


    const toggleID = ID=>setID(prevID=> prevID == null ? ID :null)

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
                                        <FaPlus className="h-4 inline-block" /> Add Activity
                                    </button>
                                </div>
                            </div>

                            {/*Activities Start */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">

                            {
                                
                                activities.length == 0?(
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
                                activities && activities.map((activity, index)=>(
                                    <div className='mb-2' key={index}>
                                        <div className='tab_header'>
                                            <a href="#" className=' p-4  uppercase dark:text-gray-50 bg-white dark:bg-slate-800 hover:bg-gold border-b-2 border-white flex justify-between' onClick={(e)=>(e.preventDefault(),toggleID(activity.id))}>
                                            <strong className='text-sm'>{activity.title}</strong>
                                            {
                                                (ID !== activity.id)?(
                                                <span className='arrow-down'><FaArrowCircleDown className='h-6'/></span>
                                                ):(
                                                <span className='up-arrow'><FaArrowCircleUp className='h-6'/></span>
                                                )
                                            }
                                            </a>
                                        </div>
                                        <div className={`p-4 text-gray-900 bg-white dark:bg-slate-800 normal-case ${ID== activity.id ? 'block': 'hidden'}`}>
                                            <h4 className='font-semibold'>Description</h4>
                                            <p className='pb-3'>{activity.description}</p>
                                            <h4 className='font-semibold'>Content</h4>
                                            <p className='pb-5'>{activity.content}</p>

                                           {activity.type && (
                                                <div>
                                                    <h4 className='font-semibold'>Sound</h4>
                                                    <audio src={activity.type} controls></audio>
                                                </div>
                                           )}

                                            <button className="py-1 px-2 text-red-500" onClick={()=> {setDeleteModal(true); setSelectedActivity(activity)}}>
                                                {(deleting && activity.id == ID) ? <Spinner size={6} /> : <BiTrashAlt  className="h-6 w-6"  /> }
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            </section>  
                            {/* Activities End */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Activity Modal */}
            <Modal show={addModal} onClose={() => setAddModal(false)} closeable={true} maxWidth='md'>
                <div className='py-3 px-4'>
                    <aside className='col-span-2 bg-white dark:bg-slate-700 px-4 py-3 rounded-md'>
                        <h1 className="text-lg font-semibold mb-4 border-b">
                            Add Activity
                        </h1>
                        <form onSubmit={createActivity}>
                            <div className='mb-3'>
                                <label>Lesson</label>
                                <select name="lesson_id" id=""   className="w-full py-[4px] focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg px-5 rounded-md border border-slate-300">
                                    <option value="" defaultValue="selected">- Select -</option>
                                    {
                                    lessons && lessons.length > 0 ? (lessons.map((lesson, i)=>(
                                        <option key={i} value={lesson.id}>{lesson.title}</option>
                                    ))):(
                                        null
                                    )
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                              
                                <label>Title</label>
                                <TextInput
                                    name="title"
                                    className=""
                                    required
                                />
                               
                            </div>

                            <div className="mb-3">
                                <label>Sound (Optional)</label>
                                <input
                                    type='file'
                                    name="type"
                                    className="w-full py-[4px] focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg px-5 rounded-md border border-slate-300"
                                />
                            </div>
                           

                            

                            <div className='mb-3 flex gap-4'>
                              <div>
                                    <label>Contents</label>
                                    <textarea
                                        name="content"
                                        className="block w-full py-2 px-5 rounded-md border-1 border-slate-300 bg-transparent placeholder:text-xs placeholder:font-medium text-slate-900 transition-all duration-300  focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg"
                                        required
                                        placeholder='Eg: 1, 2, 3, 4, 5'
                                    />
                              </div>

                              <div>
                                <label>Description (Optional)</label>
                                    <textarea
                                        name="description"
                                        className="block w-full py-2 px-5 rounded-md border-1 border-slate-300 bg-transparent placeholder:text-xs placeholder:font-medium text-slate-900 transition-all duration-300  focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg"
                                        
                                    />
                              </div>
                            </div>

                           

                            <div>
                                <button className="bg-green-700 inline-flex items-center gap-2 text-white text-xs font-semibold py-3 px-5 rounded-full">
                                    {processing ? <Spinner size={5} />  :  <FaPlus className="h-4 inline-block" /> }
                                    Save Activity
                                </button>
                            </div>

                        </form>
                    </aside>
                
                </div>
            </Modal>

            {/* Delete Activity Modal */}
            <Modal show={deleteModal} onClose={()=> setDeleteModal(false)} closeable={true} maxWidth='md'>
                <div className='py-3 px-4 text-center'>
                    <div className='mb-4'>
                        <FaQuestionCircle className="h-10 w-10 mx-auto text-primary" />
                    </div>
                    <h1 className="mb-4 text-base font-semibold">
                    Are you sure you want to delete this activity: <span className='font-semibold text-red-500'>{selectedActivity.title}</span> ?
                    </h1>
                    <div className="flex gap-2 items-center justify-end">
                        <button onClick={() => deleteActivity(selectedActivity)} className='bg-green-700 text-white py-1 px-3 rounded-md inline-flex items-center gap-1'>
                        
                            {deleting  ? <Spinner size={6} /> :<span>  <FaThumbsUp className='w-4 h-4 inline' /> Yes</span> }
                        </button>
                        <button onClick={() => setDeleteModal(false)} className='bg-red-500 text-white py-1 px-3 rounded-md inline-flex items-center gap-1'>
                            <FaRegTimesCircle className='w-4 h-4 inline' /> Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
