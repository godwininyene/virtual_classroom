import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaChildren, FaNotesMedical } from "react-icons/fa6";
import { MdLocalActivity } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import {FaPlus} from 'react-icons/fa'
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi';
import avatar from '@/Assets/img/user.png'
import { useState, useEffect } from 'react';


export default function Students({ auth }) {
    const[students, setStudents] = useState([]);
    const[deleting, setDeleting] = useState(false);
    const[ID, setId] = useState();

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
    },[])
    console.log(students)
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
                                                <td className="whitespace-nowrap border py-2 px-4" colSpan="7">
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
                                               
                                                <td className='px-3 py-2'>
                                                    <button className="py-1 px-2 text-blue-500">
                                                        <BiEditAlt  className="h-6 w-6"  />
                                                    </button>
                                                    <button className="py-1 px-2 text-red-500">
                                                        {(deleting && student.id == ID) ? <LoadingIndicator size={6} /> : <BiTrashAlt  className="h-6 w-6"  /> }
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
        </AuthenticatedLayout>
    );
}
