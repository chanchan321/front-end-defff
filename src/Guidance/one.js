import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import { Tooltip } from "@material-tailwind/react";
import { MdOutlineManageSearch } from 'react-icons/md'
import { IoIosPaper , IoIosApps } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import Mainpis from './PIS/Mainpis'
import CounselingR from './GuidanceR/CounselingR';
import GoodM from './GoodMoral/goodM';
import { AnimatePresence } from 'framer-motion';
import { BiSkipNext , BiSolidRightArrow } from "react-icons/bi";



export default function One() {

    const [openStudpis,setopenStudpis] = useState(false)
    const [openCounsellingR,setopenCounsellingR] = useState(false)

    const [students,setStudents] = useState([])
    const [toFilter,settoFilter] = useState([])

    const [statusfil,setstatusfil] = useState('incomplete')
    const [gradefilter,setgradefilter] = useState('all')
    const [filterSearch,setfilterSearch] = useState('')

    const getPisContent = async (ress)=>{
        try{
            const response= await Axios.get(`https://backend-def.onrender.com/getStud`)
                if(!response.data) return alert('ERROR')
                {!(ress === 'refresh') && setStudents(response.data.filter((stud)=> (stud.statusComp.toLowerCase()) === (statusfil))) }
                
                settoFilter(response.data)
          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }

    useEffect(()=>{
        getPisContent()
        const interval =  setInterval(()=>{
            getPisContent('refresh')
       },3500)
       return () => clearInterval(interval)
        
    },[])

    const [activestudents,setactivestudents] = useState()
    const [activecounselingRec,setactivecounsellingRec] = useState()

    const filterStatus = (e)=>{
        setstatusfil(e)
        setStudents(toFilter.filter((stud)=> (stud.statusComp.toLowerCase()) === (e)))
        setgradefilter('all')
        setfilterSearch('')
      }

    const filtergrade = (e)=>{
        setgradefilter(e)
        if(e === 'all') return setStudents(toFilter.filter((stud)=> (stud.statusComp.toLowerCase()) === statusfil))

        setStudents(toFilter.filter((stud)=> (stud.statusComp.toLowerCase()) === (statusfil)).filter((stud)=> (stud.gradeLevel.toLowerCase()) === (e)))
        setfilterSearch('')
      }
      
    const filterstud = (e)=>{
            setfilterSearch(e)
            setgradefilter('all')
            if(e) return setStudents(toFilter.filter((stud)=> stud.statusComp === statusfil).filter((stud)=> (stud.lastname).includes(e)))
                setStudents(toFilter.filter((stud)=> stud.statusComp === statusfil))
      }

    const [goodMoral,setgoodMoral] = useState()
    const [goodMoralV,setgoodMoralV] = useState()

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 12
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = students && students.slice(firstIndex,lastIndex);
    const npage = Math.ceil(students.length /recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prePage(){
        if(currentPage !== 1){
                setCurrentPage(currentPage - 1 )
        }
      }
    
      function nextPage(){
        if(currentPage !== npage){
                setCurrentPage(currentPage + 1 )
        }
      }

    const diplayPages = [currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2]  

    

  return (
   <>
    <div className='w-full font-[poppins]'>    
        <div className='w-full h-[100vh] overflow-auto pt-[45px]'>

            <div className='mx-auto h-fit w-full md:w-[80%] text-[32px] py-[20px] text-gray-800 font-bold px-2'>Personal Information Sheet Records</div>

            <div className='w-full h-fit flex flex-col items-center mx-auto'>
                <div className='w-full md:w-[80%] h-fit pb-10'>

                    <div className='flex flex-col lg:flex-row justify-end px-2 py-[5px] text-white bg-[#068FFF] md:rounded-t-lg'>

                        <div className='flex flex-col sm:flex-row justify-center items-center '>
                            <div className='w-fit flex flex-col sm:flex-row items-center'>
                                <div className=' rounded-md justify-center items-center'>
                                    <span>TOTAL:</span>
                                    <span className=' px-2 text-[18px] lg:text-[25px]'>{students[0] && students.length} </span>
                                </div>
                                <div className='flex'>
                                    <select name="status" onChange={(e)=> filterStatus(e.target.value)} value={statusfil} className='h-full  mx-2 bg-transparent cursor-pointer rounded-md text-center'>
                                        <option className='text-black' value="incomplete">Incomplete</option>
                                        <option className='text-black' value="complete">Complete</option>
                                    </select>
                                    <select name="grade" onChange={(e)=> filtergrade(e.target.value)} value={gradefilter} className='h-full mx-2  bg-transparent cursor-pointer rounded-md'>
                                        <option className='text-black' value='all '>All Grade</option>
                                        <option className='text-black' value="7">grade 7</option>
                                        <option className='text-black' value="8">grade 8</option>
                                        <option className='text-black' value="9">grade 9</option>
                                        <option className='text-black' value="10">grade 10</option>
                                        <option className='text-black' value="11">grade 11</option>
                                        <option className='text-black' value="12">grade 12</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-row justify-center items-center relative w-[250px]'>
                            <Tooltip content="Search" placement="right" className='z-30 px-2 text-[10px] bg-blue-600 ' animate={{  mount: { scale: 1.8, y: 0, x:5},  unmount: { scale: 0, y: 0, x:0 }}}>
                                <span className='text-[18px] mx-2 absolute top-1.5 left-0 text-[#1D5D9B]'>
                                    <MdOutlineManageSearch size={25} />
                                </span>
                            </Tooltip>
                                <input type='text' placeholder='Enter lastname' onChange={(e)=> filterstud(e.target.value)} value={filterSearch} className='w-full shadow-inner p-1 pl-9 shadow-gray-500/50 border-[1px]  border-gray-200 rounded-md text-black'></input>
                            </div>

                        </div>
                        
                    </div>
                    <div className='w-full h-[70vh] min-h-[470px] max-h-[800px] bg-white boxShadow overflow-auto relative'>
                            <table className='w-full min-w-[800px]  text-left text-sm font-light font-[poppins] '>
                                <thead className='border-b-2 dark:border-neutral-500 bg-white font-medium sticky top-0'>
                                    <tr className='font-bold text-gray-600 text-[18px]'>
                                        <th scope="col" className="px-6 py-[12px]">Lastname</th>
                                        <th scope="col" className="px-6 py-[12px]">Firstname</th>
                                        <th scope="col" className="px-6 py-[12px]">Middlename</th>
                                        <th scope="col" className="px-6 py-[12px]">Records</th>
                                    </tr>
                                </thead>
                                {records && !records[0]? 
                                <tbody>
                                    <tr>
                                        <td className='text-[30px] py-2'>NO RECORD</td>
                                    </tr>
                                </tbody>
                                :<>
                                {records && records.map((value,index)=>{
                                    return  <tbody key={index}>
                                    <tr className="border-b dark:border-neutral-500 text-[18px] ">
                                        <td className="break-all px-6 py-[12px]">{value.lastname}</td>
                                        <td className="break-all px-6 py-[12px]">{value.firstname}</td>
                                        <td className="break-all px-6 py-[12px]">{value.middlename}</td>
                                        <td className="whitespace-nowrap  flex flex-row justify-around items-center ">

                                            <Tooltip content="P . I . S" placement="bottom" className='z-30 px-2 text-[10px] bg-blue-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>
                                            <div onClick={(()=>{
                                                setactivestudents(value)
                                                setopenStudpis(true)})} className='rounded-full p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 '><IoIosPaper className='text-white'/></div>
                                            </Tooltip>
        
                                            <Tooltip content="Counseling" placement="bottom" className='z-30 px-2 text-[10px] bg-green-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>            
                                            <div onClick={(()=>{
                                                setactivecounsellingRec(value.counsellingRec)
                                                setactivestudents(value)
                                                setopenCounsellingR(true)})} className='rounded-full p-2 bg-green-500 cursor-pointer'><IoIosApps className='text-white'/></div>
                                            </Tooltip>  
                                            
                                            <Tooltip content="GoodMoral" placement="bottom" className='z-30 px-2 text-[10px] bg-red-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>   
                                            <div onClick={(()=>{
                                                setgoodMoral(true)
                                                setgoodMoralV(value)
                                                })} className='rounded-full p-2 bg-red-500 cursor-pointer hover:bg-red-600'><IoNewspaper className='text-white'/></div>
                                            </Tooltip>  
                                        </td>
                                    </tr>
                                </tbody>
                                })}</>}
                            
                            </table>
                           
                    </div>
                    <nav className='py-2 px-4 bg-[#068FFF] md:rounded-b-lg text-white'>
                                    <ul className='flex flex-row items-center justify-center gap-6 w-[300px] px-4'>
                                        <li>
                                            <span  onClick={()=> setCurrentPage(1)} className='cursor-pointer'>
                                                <BiSkipNext size={30} className='text-white rotate-180'/>
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={prePage} className='cursor-pointer rotate-180'>
                                                <BiSolidRightArrow size={15} className='text-white rotate-180'/>
                                            </span>
                                        </li>
                                            {diplayPages.map((n,i)=>(
                                                <li key={i} className={`${currentPage === n ? 'activePage':''} text-center rounded-md cursor-pointer w-[200px] `}>
                                                    {(n < 1) + ((numbers.length) < n) ? ' ':
                                                    <span onClick={()=>setCurrentPage((n)*1 ? n:1)} className={`${currentPage === n ? 'activePage':''} w-[20px] font-bold`}>
                                                    {n}
                                                    </span>}
                                                </li>
                                            ))}
                                        <li>
                                            <span onClick={nextPage} className='cursor-pointer'>
                                                <BiSolidRightArrow size={15}/>
                                            </span>
                                        </li>
                                        <li>
                                            <span onClick={()=> setCurrentPage(numbers.length)} className='cursor-pointer'>
                                                <BiSkipNext size={30}/>
                                            </span>
                                        </li>
                                    </ul>
                    </nav>

                </div>


                {/* PIS */}   
                <AnimatePresence>        
                        {openStudpis && <Mainpis close={setopenStudpis} student={activestudents && activestudents}/>}
                </AnimatePresence> 

                {/* Counselling Record */}  
                <AnimatePresence>        
                        {openCounsellingR && <CounselingR close={setopenCounsellingR} student={activecounselingRec && activecounselingRec} studentStat={activestudents && activestudents}/>}
                </AnimatePresence> 

                {/* Good Moral*/}  
                <AnimatePresence>        
                        {goodMoral && <GoodM close={setgoodMoral} value={goodMoralV && goodMoralV}/>}
                </AnimatePresence> 
            
            </div>
            
        </div>
    </div>
   </>
  )

}

