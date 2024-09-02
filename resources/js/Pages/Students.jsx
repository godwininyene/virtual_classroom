import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaChildren, FaNotesMedical } from "react-icons/fa6";
import { FaQuestionCircle, FaRegTimesCircle,FaTimesCircle, FaThumbsUp} from 'react-icons/fa';
import { MdLocalActivity } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import {FaPlus} from 'react-icons/fa'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi';
import avatar from '@/Assets/img/user.png'
import { useState, useEffect } from 'react';
import Spinner from '@/Components/Spinner';
import Modal from '@/Components/CustomModal';


export default function Students({ auth }) {
    const[students, setStudents] = useState([]);
    const[selectedStudent, setSelectedStudent] = useState(false);
    const[deleteModal, setDeleteModal] = useState(false);
    const[deleting, setDeleting] = useState(false);
    const[ID, setId] = useState();
    const[timestamp, setTimestamp] = useState(null);

    const getAllStudents = async()=>{
        await axios.get(route('api.students'))
        .then((res) => {
          setStudents(res.data.body.students);
        })
        .catch((err) => {
          console.log(err)
        });
    }

    useEffect(()=>{
        getAllStudents();
    },[timestamp])
    const deleteStudent= async (student) => {
        setDeleting(true);
        setId(student.id);
        await axios.delete(route('api.students', {student_id: student.id}))
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
                           
                            {/* Action Button */}
                             <div className='max-w-6xl mx-auto mb-6'>
                                <div className='flex items-center justify-end col-span-2'>
                                    <button className="bg-green-700 inline-flex items-center gap-2 text-white text-xs font-semibold py-3 px-5 rounded-full">
                                        <FaPlus className="h-4 inline-block" />
                                        <Link href='/add_student'>Add Student</Link>
                                    </button>
                                </div>
                            </div>

                            {/*Students Start */}
                            <div className="rounded-lg bg-white dark:bg-slate-800   overflow-x-auto shadow-sm shadow-white">
                                <h2 className="px-4 py-2 border-b font-semibold flex justify-between items-center">
                                    <span className="flex gap-2 items-center"> <FaChildren className="w-6 h-6 inline-block" />My Students</span>
                                </h2>
                                <table className="w-full">
                                    
                                    <thead className='bg-sky-950 text-white text-left'>
                                        <th className="py-1 px-3 whitespace-nowrap">sn</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Photo</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Name</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Gender</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Reg No.</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Date of Birth</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Email</th>
                                        <th className="py-1 px-3 whitespace-nowrap">Address</th>
                                       
                                        <th className='py-1 px-3 whitespace-nowrap'>Actions</th>
                                    </thead>

                                    <tbody>
                                        {
                                
                                            students.length == 0?(
                                                <tr className="even:bg-teal-50">
                                                <td className="whitespace-nowrap border py-2 px-4" colSpan="9">
                                                    <div className="flex items-center justify-center gap-5 w-full py-4">
                                                    <span>No record available</span>
                                                    </div>
                                                </td>
                                                </tr>
                                            ): null
                                        } 

                                       {
                                        students && students.map((student, index)=>(
                                            
                                            <tr  className="odd:bg-slate-100 dark:odd:bg-slate-800" key={student.id}>
                                               
                                                <td className="px-3 py-2">{1 + index}</td>
                                                <td className="px-3 py-2">
                                                    <div className='h-16 w-16 overflow-hidden rounded-full'>
                                                        <img src={student.avatar && student.avatar !==null ? student.avatar : avatar} alt=""  className='min-h-full min-w-full object-cover rounded-full'/>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2">{student.surname} {student.first_name} {student.middle_name || ''}</td>
                                                <td className="px-3 py-2">{student.gender}</td>
                                                <td className="px-3 py-2">{student.reg_number}</td>
                                                <td className="px-3 py-2">{student.dob}</td>
                                                <td className="px-3 py-2">{student.email}</td>
                                                <td className="px-3 py-2">{student.address}</td>
                                               
                                                <td className='px-3 py-2 flex items-center'>
                                                    <button className="py-1 px-2 text-blue-500">
                                                       <Link href={`/edit_student?id=${student.id}`}>
                                                        <BiEditAlt  className="h-6 w-6"  />
                                                       </Link>
                                                    </button>
                                                    <button className="py-1 px-2 text-red-500" onClick={()=> {setDeleteModal(true); setSelectedStudent(student)}}>
                                                        {(deleting && student.id == ID) ? <Spinner size={6} /> : <BiTrashAlt  className="h-6 w-6"  /> }
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                       }

                                        
                                    </tbody>
                                </table>
                            </div>
                            {/*Students End */}
                        </div>
                    </div>
                </div>
            </div>
             {/* Delete Modal */}
            <Modal show={deleteModal} onClose={() => setDeleteModal(false)} closeable={true} maxWidth='sm'>
                <div className='py-3 px-4 text-center'>
                    <div className='mb-4'>
                    <FaQuestionCircle className="h-10 w-10 mx-auto text-primary" />
                    </div>
                    <h1 className="mb-4 text-base font-semibold">
                        Are you sure you want to delete this student: <span className='font-bold'>{selectedStudent.first_name  + " " + selectedStudent.surname}</span>?
                    </h1>
                    <div className="flex gap-2 items-center justify-end">
                        <button onClick={() => deleteStudent(selectedStudent)} className='bg-green-700 text-white py-1 px-3 rounded-md inline-flex items-center gap-1'>
                        
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
