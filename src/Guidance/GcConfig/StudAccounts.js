import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import AddStudents from './AddStudents'
import {RxCross2} from 'react-icons/rx'
import PacmanLoader from "react-spinners/PacmanLoader"
import { MdDelete , MdDeleteSweep } from 'react-icons/md';
import { BsPersonFillAdd } from 'react-icons/bs';
import { Tooltip } from "@material-tailwind/react";
import { motion } from "framer-motion"
import { BiSkipNext , BiSolidRightArrow } from "react-icons/bi";

export default function StudAccounts({close}) {

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
        }
    }

    const [students,setStudents] = useState([])
    const [toFilter,settoFilter] = useState([])

    const getPisContent = async (ress)=>{
        try{
            const response= await Axios.get(`https://backend-def.onrender.com/getStud`)
                if(!response.data) return alert('ERROR')

                setTimeout(()=>{
                    setloading(false)
                    setgradefilter('all')
                    setStudents(response.data)
                    settoFilter(response.data)
                    if(ress === 'add')
                    return   Swal.fire({
                        icon: 'success',
                        title: 'Student Added!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    if(ress === 'delete')
                    return Swal.fire({
                        icon: 'success',
                        title: 'DELETE!', 
                        text: 'Account deleted!!',
                        showConfirmButton: false,
                        timer: 1500
                })
                },500)
                
          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }
    useEffect(()=>{
        getPisContent()
    },[])

    const [addStud,setaddStud] = useState(false)
    const [gradefilter,setgradefilter] = useState('all')
    const [filterSearch,setfilterSearch] = useState('')

    const filterstud = (e)=>{
        setfilterSearch(e)
        setgradefilter('all')
        if(e){
           if(gradefilter === 'all' ){
               return setStudents(toFilter.filter((stud)=> (stud.lastname).includes(e)))
            }else{
                return setStudents(toFilter.filter((stud)=> stud.gradeLevel === gradefilter).filter((stud)=> (stud.lastname).includes(e)))
            }
        }
      
        if(gradefilter === 'all' ){
            return setStudents(toFilter)
         }else{
             return setStudents(toFilter.filter((stud)=> stud.gradeLevel === gradefilter))
         }
    
    }

    const filtergrade = (e)=>{
        setgradefilter(e)
        if(e === 'all') return setStudents(toFilter)

        setStudents(toFilter.filter((stud)=> (stud.gradeLevel) === (e)))
        setfilterSearch('')
    }

    //   const resetPass = (value) =>{
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text:"Are you sure you want to reset?",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, reset it!'
    //       }).then( async (result) => {
    //         if (result.isConfirmed) {
    //             try{
    //                 const response= await Axios.patch(`https://backend-def.onrender.com/studentAccount`,{
    //                     accID:value.accountID,
    //                     type:'changePass'
    //                 })
    //                 if(response)
    //                     return Swal.fire({
    //                         icon: 'success',
    //                         title: 'Success!', 
    //                         text: 'Password reset!!',
    //                         showConfirmButton: false,
    //                         timer: 1500
    //                     })
    //               }catch (err){
    //                 if (!err?.response) {
    //                   console.log(err)
    //                 }
    //               }
    //         }
    //       })
    //   }

    const deleteAcc = (value)=>{
                    Swal.fire({
                        title: 'Are you sure?',
                        text:"Are you sure you want to delete?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                      }).then( async (result) => {
                        if (result.isConfirmed) {
                            setloading(true)
                            try{
                                const response= await Axios.delete(`https://backend-def.onrender.com/deleteAccounts/${value.LRN}/${value.accountID}/${value.pisID}`)
                                if(response)
                                  return getPisContent('delete')
                                        
                                }catch (err){
                                    if (!err?.response) {
                                    console.log(err)
                                    }
                                }
                        }
                      })
    }

    const deleteAll = () =>{
        Swal.fire({
            title: 'Are you sure?',
            text:"Are you sure you want to delete?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                setloading(true)
                try{
                    const response= await Axios.delete(`https://backend-def.onrender.com/deleteAccounts`)
                    if(!response.data) {
                     setloading(false)
                    return Swal.fire({
                       icon: 'warning',
                       title: 'No account found!', 
                       text: 'There are no existing Gr 12 account!!',
                       showConfirmButton: false,
                       timer: 1500
                    })}
                    if(response.data) 
                    close(false)
                     return  Swal.fire({
                        icon: 'success',
                        title: 'Success!', 
                        text: 'Accounts deleted!!',
                        showConfirmButton: false,
                        timer: 1500})
                   
                          
                    }catch (err){
                        if (!err?.response) {
                        console.log(err)
                        }
                    }
            }
          })
    }
    const [loading,setloading] = useState(true)

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
            {loading ?
            <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                    <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
            </>:
            <div className="absolute h-[100vh] left-0 top-0 w-full z-20 font-[poppins] min-w-[300px] ">
  

  {/* <div className='text-white absolute top-0 left-0 z-10 cursor-pointer'><RxCross2 size={40}/></div>*/}

        <motion.div className="z-20 relative w-full h-[100vh] flex items-start py-10 justify-center "
          variants={container}
          initial="hidden"
          animate="show"> 
            
            <div onClick={(()=>close(false))} className="absolute top-0 left-0 z-30 text-red-500 md:text-white cursor-pointer"><RxCross2 size={35}/></div>

        <div className='w-full md:w-[80%] max-h-[600px] h-fit items-start z-20 font-[poppins] bg-red-50'>
        

            <div className='mx-auto flex flex-col md:flex-row w-full justify-between items-center px-2 py-2 bg-white rounded t-md '>
                
                    <p className='text-[22px] text-gray-600 font-bold text-center'>Students account</p>
                  
        
                <div className='flex flex-col md:flex-row items-center'>
                    <div className='flex flex-row'>
                        <Tooltip content="Remove gr.12 accounts" placement="bottom" className=' text-[10px] z-50 px-1 bg-red-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                            <div onClick={()=> deleteAll()} className='bg-red-500 hover:bg-red-600 p-1 rounded-md mx-2 textS font-bold flex flex-row items-center cursor-pointer justify-center gap-1'><MdDeleteSweep size={25}/><span>Gr.12</span></div>
                        </Tooltip>
                        <select name="grade" onChange={(e)=> filtergrade(e.target.value)} value={gradefilter} className='h-[37px] mx-1 text-[14px] rounded-md cursor-pointer '>
                                <option value='all'>All Grade</option>
                                <option value="7">grade 7</option>
                                <option value="8">grade 8</option>
                                <option value="9">grade 9</option>
                                <option value="10">grade 10</option>
                                <option value="11">grade 11</option>
                                <option value="12">grade 12</option>
                        </select>
                    </div>  
                    <div className='flex flex-row'>
                        <Tooltip content="Add Account" placement="bottom" className=' text-[10px] z-50 px-1 bg-blue-600 ' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }, }}>
                            <button onClick={()=> setaddStud(true)} className='bg-green-500 hover:bg-green-600 p-1 rounded-md textS font-bold mx-1'><BsPersonFillAdd size={25}/></button>
                        </Tooltip>
                    
                        <input type='text' placeholder='Search lastname' onChange={(e)=> filterstud(e.target.value)} value={filterSearch} className='w-[230px]  shadow-inner shadow-gray-500/50 border-[1px] p-[4px] border-gray-200 rounded-md px-2'/>
                    </div>
                </div>   
            </div>


            <div className='w-full mx-auto h-[70vh] max-h-[800px] bg-white overflow-auto'>
                    <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] border-t-[2px] border-black'>
                        <thead className='border-b font-medium dark:border-neutral-500  sticky top-0 bg-white'>
                            <tr className='font-bold'>
                                {filterSearch && <th scope="col" className="px-2 py-[10px]">Grade Level </th>}
                                <th scope="col" className="px-6 py-[10px]">Lastname</th>
                                <th scope="col" className="px-6 py-[10px]">Firstname</th>
                                <th scope="col" className="px-6 py-[10px]">Middlename</th>
                                <th scope="col" className="px-6 py-[10px]"></th>
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
                            return  <tbody key={index} className='overflow-auto'>
                            <tr className="border-b dark:border-neutral-500 text-[18px]">
                                {filterSearch && <td className="whitespace-nowrap px-4 ">{value.gradeLevel}</td>}
                                <td className="whitespace-wrap break-word px-6 ">{value.lastname}</td>
                                <td className="whitespace-wrap break-word px-6 ">{value.firstname}</td>
                                <td className="whitespace-wrap break-word px-6 ">{value.middlename}</td>
                                <td className="whitespace-wrap break-word flex flex-row justify-around items-center py-1">
                                    <p onClick={()=> deleteAcc(value)} className='text-red-500 hover:text-red-600 py-1 px-2 textS rounded-md cursor-pointer'>
                                        <MdDelete size={25}/>
                                    </p>
                                </td>
                                {/* <td className="whitespace-nowrap flex flex-row justify-around items-center py-1">
                                    <p onClick={()=> resetPass(value)} className='bg-red-500 hover:bg-red-600 py-1 px-2 textS rounded-md cursor-pointer'>reset password</p>
                                </td> */}
                            </tr>
                        </tbody>
                        })}</>}
                       
                    </table>
            </div>
            <nav className='py-2 px-4 bg-[#068FFF] rounded-b-lg text-white w-full mx-auto'>
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
       
        
        </motion.div>
        </div>    
    }

        {addStud && <AddStudents close={setaddStud} refresh={getPisContent} load={setloading} className='z-50'/>}

    </>
  )
}
