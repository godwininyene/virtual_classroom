import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaChildren, FaNotesMedical } from "react-icons/fa6";
import { MdLocalActivity } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import {FaPlus} from 'react-icons/fa'
import avatar from '@/Assets/img/user.png'
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import { useState } from 'react';
import Spinner from '@/Components/Spinner';

export default function EditStudent({ auth, student }) {
    const [processing, setProcessing] = useState(false);
    let editStudent = async (e) => {
        e.preventDefault();
        setProcessing(true);
       
        let form = new FormData(e.target);
        await axios.post(route('api.students.update'), form)
        .then((res) => {
            if(res.data.success){
                alert(res.data.message)
            }
            setProcessing(false);
            e.target.reset();
        })
        .catch((err) => {
          setProcessing(false);
          console.log(err);
        });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Student</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-3">
                <div className="">
                    <div className=" dark:bg-gray-800  sm:rounded-lg">
                        <div className=" text-gray-900 dark:text-gray-100">
                           
                            {/* Dashboard Overview Cards Start */}
                             <div className='max-w-6xl mx-auto mb-6'>
                                <div className='flex items-center justify-end col-span-2'>
                                    <button className="bg-green-700 inline-flex items-center gap-2 text-white text-xs font-semibold py-3 px-5 rounded-full">
                                        <FaPlus className="h-4 inline-block" />
                                        <Link href='/students'>View Students</Link>
                                    </button>
                                </div>
                            </div>

                            {/* Form  Start */}
                            <div className="rounded-lg bg-white dark:bg-slate-800   overflow-x-auto shadow-sm shadow-white">
                                <h2 className="px-4 py-2 border-b font-semibold flex justify-between items-center">
                                    <span className="flex gap-2 items-center"> <FaChildren className="w-6 h-6 inline-block" />Edit Student</span>
                                </h2>

                                <div className='max-w-5xl mx-auto'>
                                    <form className='p-5' onSubmit={editStudent}>
                                        <input type="hidden" name="student_id" defaultValue={student.id} />
                                        <h1 className='italic font-medium mb-2'>Student's Information</h1>

                                        <div className="mb-3 p-1 flex items-center  gap-1 space-x-1">
                                            <div className="w-1/3">
                                                <label>Firstname</label>
                                                <TextInput
                                                    name="first_name"
                                                    className=""
                                                    defaultValue={student.first_name || ''}
                                                />
                                            </div>

                                            <div className="w-1/3">
                                                <label>Middlename (optional)</label>
                                                <TextInput
                                                    name="middle_name"
                                                    className=""
                                                    defaultValue={student.middle_name || ''}
                                                />
                                            </div>

                                            <div className="w-1/3">
                                                <label>Surname</label>
                                                <TextInput
                                                    name="surname"
                                                    className=""
                                                    defaultValue={student.surname || ''}
                                                />
                                            </div>

                                        </div>

                                        <div className="mb-3 p-1 flex items-center  gap-1 space-x-1">
                                            <div className="w-1/3">
                                                <label>Reg No.</label>
                                                <TextInput
                                                    name="reg_number"
                                                    className=""
                                                    defaultValue={student.reg_number || ''}
                                                />
                                            </div>

                                            <div className="w-1/3">
                                                <label>Date Of birth</label>
                                                <TextInput
                                                    type='date'
                                                    name="dob"
                                                    className=""
                                                    defaultValue={student.dob || ''}
                                                />
                                            </div>

                                            <div className="w-1/3">
                                                <label>Email</label>
                                                <TextInput
                                                    type='email'
                                                    name="email"
                                                    className=""
                                                    defaultValue={student.email || ''}
                                                />
                                            </div>

                                        </div>

                                        <div className="mb-3 p-1 flex items-center  gap-1 space-x-1">
                                            <div className="w-1/3">
                                                <label>Gender</label>
                                                <Select
                                                    name="gender"
                                                    className=""
                                                >
                                                     <option value="" defaultValue="selected">- Select -</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </Select>
                                            </div>

                                            <div className="w-1/3">
                                                <label>Photo</label>
                                                <input
                                                    type='file'
                                                    name="avatar"
                                                    className="w-full py-[4px] focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg px-5 rounded-md border border-slate-300"
                                                />
                                            </div>

                                            <div className="w-1/3">
                                                <label>Password</label>
                                                <TextInput
                                                    type='password'
                                                    name="password"
                                                    className=""
                                                />
                                            </div>

                                        </div>

                                        <div className='mb-3 p-1 flex items-center  gap-1 space-x-1'>
                                            <div className="w-1/3">
                                                <label>Address</label>
                                                <textarea
                                                    name="address"
                                                    className="block w-full py-2 px-5 rounded-md border-1 border-slate-300 bg-transparent placeholder:text-xs placeholder:font-medium text-slate-900 transition-all duration-300  focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg"
                                                    required
                                                    defaultValue={student.address || ''}
                                                />
                                            </div>
                                        </div>

                                        <h1 className='italic font-medium mt-3'>Parent/Guardian Information</h1>

                                        <div className="mb-3 p-1 flex items-center  gap-1 space-x-1">
                                            <div className="w-1/3">
                                                <label>Fullname</label>
                                                <TextInput
                                                    name="parent_fullname"
                                                    className=""
                                                    defaultValue={student.parent_fullname || ''}
                                                />
                                            </div>

                                            <div className="w-1/3">
                                                <label>Phone</label>
                                                <TextInput
                                                    type='number'
                                                    name="parent_phone"
                                                    className=""
                                                    defaultValue={student.parent_phone || ''}
                                                />
                                            </div>

                                            <div className="w-1/3">
                                                <label>Email</label>
                                                <TextInput
                                                    type="email"
                                                    name="parent_email"
                                                    className=""
                                                    defaultValue={student.parent_email || ''}
                                                />
                                            </div>

                                        </div>


                                        <div className="mb-3 p-1 flex items-center  gap-1 space-x-1">
                                            <div className="w-1/3">
                                                <label>Relationship</label>
                                                <Select
                                                    name="parent_relationship"
                                                    className=""
                                                >
                                                    <option value="" defaultValue="selected">- Select -</option>
                                                    <option value="Parent">Parent</option>
                                                    <option value="Guardian">Guardian</option>
                                                    <option value="Sibling">Sibling</option>
                                                </Select>
                                            </div>

                                        </div>


                                        <div className="mb-3 p-1  text-end">
                                            <button className="bg-green-700 inline-flex items-center gap-2 text-white text-xs font-semibold py-3 px-5 rounded-full">
                                                {processing ? <Spinner size={5} />  :  <FaPlus className="h-4 inline-block" /> }
                                                Save Changes
                                            </button>

                                        </div>
                                    </form>
                                </div>
                               
                            </div>
                            {/* Form  End */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
