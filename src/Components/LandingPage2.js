import React,{useState,useEffect} from 'react'
import ReferralForm from '../MODALHOME/referralForm'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import PacmanLoader from "react-spinners/PacmanLoader";
import './homeP.css'
import teacher from '../Picture/TeacherReferral.svg'
import firstP from '../Picture/FirstPage.svg'
import firstPimg from '../Picture/firstPimg.svg'
import PIS from '../Picture/PIS.svg'
import Appointments from '../Picture/appointment.svg'
import counseling from '../Picture/counseling.svg'
import paperP from '../Picture/paperP.svg'
import { AnimatePresence } from 'framer-motion';

export default function LandingPage2() {

    // const sendMessage = async () =>{

    //     try{
    //         const response= await fetch(`https://sms.teamssprogram.com/api/send?key=037810dc0c5d2417b617680bf6565c80cf0d717a&phone=+639156218108&message=awdfhfthfthfthfthftfhftawdwa`)
    //     //   const response= await fetch(`https://sms.teamssprogram.com/api/send`,
    //     //   {
    //     //     key:'037810dc0c5d2417b617680bf6565c80cf0d717a',
    //     //     phone:'+639461991211',
    //     //     message:'awdawdadawd',
    //     //     sim:
    //     //   })


    //       console.log(response)
    //     }catch (err){
    //       if (!err?.response) {
    //         console.log(err)
    //       }
    //     }
    
    //   }
    const container = {
        hidden: { opacity: 0 , scale:0},
        show: {
          scale:1,
          opacity: 1,
          transition: {
            duration:.3,
          }
        },
        exit: {
          y:-200,
          scale:1,
          opacity: 0,
          transition: {
            duration:.3,
          }
        }
}

    useEffect(()=>{
        setTimeout(()=>{
            setloading(false)
        },500)
    },[])

    const [loading,setloading] = useState(true)

    const [referral,openreferralForm] = useState(false)

  return (
  <>
           
        <div className='overflow-x-hidden'>
                    <div className='wrapper '>
                          <div className="box" >
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((value,index)=>{
                              return(
                                <div key={index} className=''>  
                                </div>
                              )
                            })}
                          </div>
                    </div>
                    <AnimatePresence>
                    {referral && 
                    <motion.div className='absolute top-0 left-0 w-full h-[100vh] z-50 rounded-b-md'
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit="exit">
                        {referral && 
                        <div className='w-full max-w-[700px] h-fit mx-auto my-[20px] rounded-b-md'>
                            <div className='w-full bg-red-500 hover:bg-red-600 textS text-center p-2 cursor-pointer font-bold'  onClick={()=> openreferralForm(false)}>CLOSE</div>
                            <ReferralForm className='z-50' close={openreferralForm}/>
                        </div>}
                    </motion.div>}
                </AnimatePresence>

                {loading?
                <>
                    <div className='bg-gradient-to-br  from-blue-500 to-cyan-200 flex w-full h-[100vh] justify-center items-center text-center '>
                        <PacmanLoader speedMultiplier={2}/>
                    </div>
                </>
                :
                <>
                <div name='Nav' className=' w-full flex flex-row justify-between py-4 px-5 lg:px-40 text-[20px] font-bold text-[#F6F1F1] textS bg-[#279EFF]'>
                    <span className='bg-[#279EFF] w-fit px-2 py-1 rounded-md'>Cabangan HighSchool</span>
                    <div onClick={()=> openreferralForm(true)} className=' glass rounded-md pointer p-1 textS text-[20px] font-bold hidden md:flex cursor-pointer px-4'>
                        <span>Referral form</span>
                    </div>
                </div>
               
                <div name='Home' className='w-full h-fit lg:h-[80vh] min-h-[500px] bg-[#F6F1F1]'>
                        <div className='w-full h-full bg-[#279EFF] rounded-bl-[150px]'>
                            <div className='w-[70%] mx-auto h-full flex flex-col lg:flex-row justify-around items-center pt-[120px] lg:pt-1 gap-y-[50px] '>
                                <div className='w-[400px] h-[400px] flex flex-col items-center justify-center gap-y-[20px]'>  
                                    <p className='text-[30px] text-center textS font-bold'>WELCOME TO GUIDANCE MANAGEMENT AND COUNSELING SERVICES SYSTEM </p>
                                    <div className='flex flex-row justify-around w-full relative'>
                                        <img src={firstPimg} className='w-[100px]'/>
                                        <img src={counseling} className='w-[100px]'/>
                                        <img src={paperP} className='w-[100px]'/>
                                    </div>
                                    <div onClick={()=> openreferralForm(true)} className=' glass rounded-md pointer p-1 textS text-[20px] font-bold flex md:hidden cursor-pointer px-4'>
                                        <span>Referral form</span>
                                    </div>
                                </div>  
                                    <img src={firstP} className='min-w-[430px] w-[30%]'></img>
                            </div>
                        </div>
                </div>

                <div name='Referral' className='w-full h-fit lg:h-[90vh]  min-h-[600px] bg-[#279EFF]'>
                        <div className='w-full h-full bg-[#F6F1F1] rounded-r-[150px]'>
                            <div className='w-[95%] xl:w-[70%] h-full mx-auto z-0 relative'>
                                <div className='w-full h-full flex flex-col lg:flex-row justify-around items-center pt-[120px] lg:pt-1 gap-y-[50px] z-50 relative py-10'>
                                    <img src={teacher} className='min-w-[430px] w-[30%]'></img>
                                    <div className='pb-10'> 
                                        <div className='flex flex-col gap-4 py-4'>
                                            <p className='text-[30px] font-bold px-2'>Referral for Counseling</p>
                                            <p className='text-[16px] max-w-[500px] lg:max-h-[280px] px-10 sm:px-1'>A formal communication made by one individual or professional to another, typically a counselor or therapist, recommending a person for counseling services. It often includes information about the person in need of counseling, their specific issues or concerns, and the reasons for the referral. Additionally, it may highlight the urgency of the situation or any relevant background information that would assist the counselor in providing appropriate care. Referral requests play a crucial role in helping individuals access the appropriate support and resources for their mental health and well-being.</p>
                                        </div> 
                                    </div>
                                </div>
                                <div className='absolute z-20 top-[60%] left-[60%] lg:left-[40%] w-[250px] h-[250px] rounded-full bg-orange-500 bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[10%] lg:top-[20%] left-[-20%] sm:left-[10%] lg:left-[80%] w-[150px] h-[150px] rounded-full bg-[#279EFF] bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[2%] lg:top-[18%] left-[20%] lg:left-[65%] w-[100px] h-[100px] rounded-full bg-[#0802A3] bg-opacity-70'></div>
                            </div>
                        </div>
                </div>

                <div name='PIS' className='w-full h-fit lg:h-[90vh]  min-h-[600px] bg-[#F6F1F1] text-white'>
                        <div className='w-full h-full bg-[#279EFF] rounded-l-[150px]'>
                            <div className='w-[95%] xl:w-[70%] h-full mx-auto z-0 relative'>
                                <div className='w-full h-full flex flex-col lg:flex-row justify-around items-center pt-[120px] lg:pt-1 gap-y-[50px] z-50 relative py-10'>
                                    <div className='pb-10 order-2 lg:order-1'> 
                                        <div className='flex flex-col gap-4 py-4'>
                                            <p className='text-[30px] font-bold px-2'>Personal Information</p>
                                            <p className='text-[16px] max-w-[500px] lg:max-h-[280px] px-10 sm:px-1'>A personal data sheet provides your biographical and logistical information, including contact information and details such as past places of residence, education, and social or community activities. Personal data sheets are especially useful tools if you are sight-impaired, as they provide a complete list of accurate information that a scribe can then use to fill in forms. Some universities and other organizations request personal data sheets as a component of admissions or scholarship applications. Compile a personal data sheet by including as much information about yourself as you feel comfortable giving.</p>
                                        </div> 
                                    </div>
                                    <img src={PIS} className='min-w-[430px] w-[30%] order-1 lg:order-2 rounded-md pis'></img>
                                </div>
                                <div className='absolute z-20 top-[60%] lg:top-[20%] left-[60%] sm:left-[10%] lg:left-[20%] w-[150px] h-[150px] rounded-full bg-orange-500 bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[10%] left-[-20%] lg:left-[10%] w-[250px] h-[250px] rounded-full bg-[#0802A3] bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[2%] lg:top-[18%] left-[50%] lg:left-[45%] w-[100px] h-[100px] rounded-full bg-[#071952] bg-opacity-70'></div>
                            </div>
                        </div>
                </div>

                <div name='Appointment' className='w-full h-fit lg:h-[90vh]  min-h-[600px] bg-[#F6F1F1] text-black'>
                        <div className='w-full h-full bg-[#F6F1F1] rounded-r-[150px]'>
                            <div className='w-[95%] xl:w-[70%] h-full mx-auto z-0 relative'>
                                <div className='w-full h-full flex flex-col lg:flex-row justify-around items-center pt-[120px] lg:pt-1 gap-y-[50px] z-50 relative py-10'>
                                    <img src={Appointments} className='min-w-[430px] w-[30%]'></img>
                                    <div className='pb-10'> 
                                        <div className='flex flex-col gap-4 py-4'>
                                            <p className='text-[30px] font-bold px-2'>Counseling Appointment</p>
                                            <p className='text-[17px] max-w-[500px] lg:max-h-[280px] px-10 sm:px-1'>An appointment request for counseling is a formal request made by an individual seeking counseling services. It typically includes the requester's contact information, preferred date and time for the session, a brief description of the issues prompting counseling, and any specific preferences or requirements. This request helps the counselor or therapist understand the client's needs and arrange a suitable appointment to address their concerns effectively. It also serves as the initial step in establishing a therapeutic relationship between the client and the counselor.</p>
                                        </div> 
                                    </div>
                                </div>
                                <div className='absolute z-20 top-[60%] left-[60%] lg:left-[40%] w-[250px] h-[250px] rounded-full bg-orange-500 bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[10%] lg:top-[20%] left-[-20%] sm:left-[10%] lg:left-[80%] w-[150px] h-[150px] rounded-full bg-[#279EFF] bg-opacity-80'></div>
                                <div className='absolute z-20 bottom-[2%] lg:top-[18%] left-[20%] lg:left-[65%] w-[100px] h-[100px] rounded-full bg-[#0802A3] bg-opacity-70'></div>
                            </div>
                        </div>
                </div>

                <div name='Footer' className='w-full h-[80px] bg-[#F6F1F1]'>
                        <div className='w-full flex justify-center items-center h-full bg-[#279EFF] rounded-tl-[150px] textS font-bold'>
                                        Built by: Christian babasa
                        </div>
                </div>

            </>
            }
        </div>
           
       
  </>

  )
}
    