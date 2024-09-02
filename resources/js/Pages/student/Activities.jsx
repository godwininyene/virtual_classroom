import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head} from '@inertiajs/react';
import {FaArrowCircleDown, FaArrowCircleUp} from 'react-icons/fa'
import {FaPlus} from 'react-icons/fa'
import { useState, useEffect } from 'react';
import Modal from '@/Components/CustomModal';
import Spinner from '@/Components/Spinner';

export default function Activities({ auth }) {
    const[activities, setActivities] = useState([]);
    const[showActivity, setShowActivity] = useState(false);
    const[processing, setProcessing] = useState(false);
    const[ID, setID] = useState(null);
    const[selectedActivityContent, setSelectedActivityContent] = useState([]);
    const[selectedActivity, setSelectedActivity] = useState(null)
    const[selectedAnswer, setSelectedAnswers] = useState([]) 

    const numbers = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
        38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
    ]


    const[displayActivies, setDisplayActivies] = useState([]);
 
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
        getAllActivities();
    },[]);

  

    const submit = async(e)=>{
       
       //Determining the correct answers
        let validAnswers = selectedAnswer.filter(item => selectedActivityContent.includes(item));
        //Setting scores
        const score = validAnswers.length  + "/" + selectedActivityContent.length;
        
        setProcessing(true);
        let form = new FormData();
        form.append('student_id', auth.user.student_id);
        form.append('lesson_id', selectedActivity.lesson_id);
        form.append('activity_id', selectedActivity.id);
        form.append('answers', selectedAnswer.join(','));
        form.append('score', score);
        await axios.post(route('api.progress'), form)
        .then((res) => {
          setProcessing(false);
          if(res.data.success){
            alert(res.data.message)
            setShowActivity(false)
          }
        
        })
        .catch((err) => {
          setProcessing(false);
          setShowActivity(false)
          console.log(err);
        });
    }

    const toggleID = ID=>setID(prevID=> prevID == null ? ID :null)
     
    const handleStartActivity = (activity)=>{
        setSelectedActivity(activity)
        let result = [];
        const content = activity.content.split(',').map(number => Number(number))
        let notInArr1 = numbers.filter(item => !content.includes(item)).slice(0, 5);
        result= content.concat(notInArr1)
        result.sort(()=> Math.random() - 0.5)
        setDisplayActivies(result);
        setSelectedActivityContent(content)
        setSelectedAnswers([])
        setShowActivity(true)
    }

   
    
    // var year = 2024

   

    // if((year % 4 == 0 && year % 100 !==0) || year % 400 == 0){
    //     console.log(year, "is a leap year.")
    // }else{
    //     console.log(year, "is not a leap year.")
    // }
   
    const handleClick = (event, answer) =>{
        const index = selectedAnswer.indexOf(answer);
        if(index == -1){
            setSelectedAnswers(prev => [...prev, answer])
        }else{
            selectedAnswer.splice(index, 1);
        }
        event.target.classList.toggle('bg')
    }

  
const playAudio = ()=>{
    if(showActivity){
       if(selectedActivity.type){
            const prevAudio = document.getElementById('activity_sound');
            if(prevAudio){
                document.body.removeChild(prevAudio)
            }
            const audio = document.createElement('audio');
            audio.src = selectedActivity.type;
            audio.loop=true
            audio.setAttribute('id', 'activity_sound');
            document.body.appendChild(audio)
            audio.play();
       }
    }else{
        const myAudio = document.getElementById('activity_sound');
        if(myAudio){
            myAudio.pause()
            myAudio.curentTime = 0;
        }
    }
}

useEffect(()=>{
   if(selectedActivity){
    playAudio();
   }
}, [selectedActivity, showActivity])
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

                                            <button className="bg-green-700 inline-flex items-center gap-2 text-white text-xs font-semibold py-3 px-5 rounded-full" onClick={()=>handleStartActivity(activity)}>
                                               Start Activity
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
            <Modal show={showActivity} onClose={() => setShowActivity(false)} closeable={true} maxWidth='lg'>
                <div className='py-3 px-4 '>
                    <p className='border-b mb-4'>identify the listed numbers from the number squares by clicking on the right number: 
                       {selectedActivity && <span className='font-bold'>{selectedActivity.content}</span> }
                    </p>

                    <div className='flex flex-wrap justify-center gap-5 p-4 border-b'>
                       

                        {
                            displayActivies.length > 0 && displayActivies.map(item =>(
                                <div onClick={(e)=>handleClick(e, item)} key={item} className='h-16 w-16 bg-red-300 rounded-xl text-4xl font-bold p-3 cursor-pointer flex items-center justify-center'>
                                    {item}
                                </div>
                            ))
                        }
                        

                    </div>

                    <div className='flex justify-end mt-2'>
                        <button className="bg-green-700 inline-flex items-center  gap-2 text-white text-xs font-semibold py-3 px-5 rounded-full" onClick={submit}>
                            
                            {processing ? <Spinner size={5} />  :  <FaPlus className="h-4 inline-block" /> }
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>   
        </AuthenticatedLayout>
    );
}
