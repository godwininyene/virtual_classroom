import { Link, Head } from '@inertiajs/react';
import bannerBg2 from '@/Assets/img/hero.webp';
import { FaChild } from "react-icons/fa";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <section className={`bg-no-repeat bg-cover bg-middle relative`} style={{backgroundImage: `linear-gradient(to right, rgba(255,255,255, 0.9) 8%, transparent 100%),url(${bannerBg2})`}}>
               
                <div className={`pt-28`}>
                    <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
                        <div className={`flex items-center text-center justify-center md:text-left md:justify-start mb-8`}>
                            <aside>
                                <div className={`flex   text-sm mb-3`}>
                                    <FaChild className={`h-10 w-10`} />
                                    <Link href="" className={`px-2 py-1 inline-flex items-center md:mx-0 rounded-xl bg-white bg-opacity-10 text-red-500 font-medium`}>
                                        Kindergarten School
                                    </Link>
                                </div>
                                <h1 className={`text-sky-950 text-6xl font-black mb-4`}>
                                    We Are Kindergarten & Childhood
                                   
                                </h1>
                                <p className={`text-sky-900 font-normal text-lg mb-7 leading-6`}>
                                    The universe is one great Kindergarten for man. Everything
                                    that exists has brought with it its own peculiar lesson.
                                </p>
                                <div className={`md:flex gap-3 mb-10 md:mb-28`}>
                                    <Link  href={route('login')} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl bg-red-500 hover:bg-black text-white font-bold`}>
                                        Get Started
                                    </Link>
                                    <Link href={''} className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl border border-primary bg-green-700 text-white hover:bg-black font-bold`}>
                                        Learn More
                                    </Link>
                                </div>
                            </aside>
                        </div>

                        {/* <div className='relative z-0'>
                            <img src={bannerBg2} alt="mock" className={`md:absolute z-0 -mt-4`} />
                        </div> */}
                    </section>
                </div>

                {/* <div class="wave-container"></div> */}

                <div class="custom-shape-divider-bottom-1721230058">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                    </svg>
                </div>
              
            </section>
        </>
    );
}
