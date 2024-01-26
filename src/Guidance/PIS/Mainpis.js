import React,{useEffect, useState} from 'react'
import StudPis from './StudPis'
import Studpis2 from './Studpis2'
import Studpis3 from './Studpis3'
import Studpis4 from './Studpis4'
import Studpis5 from './Studpis5'
import { motion } from 'framer-motion'
import { RxCross2 } from 'react-icons/rx'

export default function Pis({close,student}) {

        const container = {
                hidden: { opacity: 0 , scale:0},
                show: {
                  scale:[0.5,1],
                  opacity: 1,
                  transition: {
                        duration:.5,
                        delayChildren: 0.5,
                        staggerDirection: -1
                  }
                },
                exit: {
                  scale:0,
                  opacity: 0,
                  transition: {
                        duration:.5,
                        delayChildren: 0.5,
                        staggerDirection: -1
                  }
                }
        }

        const [pisNum,setPisNum] =useState(1)

  return (<>
        <div className="absolute h-[100vh] left-0 top-0 w-full z-10 flex justify-center items-center font-[poppins] min-w-[300px] ">
  
                 <div className="opacity-75 fixed inset-0 z-10 bg-black "></div>
                 <div onClick={(()=>close(false))} className='text-white absolute top-0 left-0 z-10 cursor-pointer'><RxCross2 size={40}/></div> 
  
        <motion.div className="z-20 relative"
                variants={container}
                initial="hidden"
                animate="show"> 
            {pisNum === 1 &&
                <div className=' self-end h-full w-full  '>
                        <StudPis next={setPisNum} student={student && student}/>
                </div>
            }
             {pisNum === 2 &&
                <div className=' self-end h-full w-full  '>
                        <Studpis2 next={setPisNum} student={student && student}/>
                </div>
            }
            {pisNum === 3 &&
                <div className=' self-end h-full w-full  '>
                        <Studpis3 next={setPisNum} student={student && student}/>
                </div>
            }
            {pisNum === 4 &&
                <div className=' self-end h-full w-full  '>
                        <Studpis4 next={setPisNum} student={student && student}/>
                </div>
            }
             {pisNum === 5 &&
                <div className=' self-end h-full w-full '>
                        <Studpis5 next={setPisNum} student={student && student}/>
                </div>
            }
            </motion.div>
        </div>
  </>
  )
}
