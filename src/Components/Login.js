import React,{useState,useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from '../Picture/cabanganLogo.png'
import Axios from 'axios';
import Swal from 'sweetalert2'
import PacmanLoader from "react-spinners/PacmanLoader";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";


import useStore from '../Store/store';

export default function Login() {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const userRef = useRef()

  const navigate = useNavigate();

  const addcredentials = useStore( state => state.addCredentials)
  
  const [loading,setloading] = useState(true)

    useEffect(() => {

     setTimeout(()=>{
        setloading(false)
    },500)
      setTimeout(()=>{
        userRef.current.focus();
    },1000)

  },[])

  
    const handleSubmit = async (e) =>{
      e.preventDefault(); 
        if(!user || !pwd){
          return  Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter Credentials'
          })
        }
      setloading(true)
        try{
          const response= await Axios.get(`https://backend-def.onrender.com/login/${user}/${pwd}`)
                
                setTimeout(()=>{
                  setloading(false)
              
                     if(response.data[0]) {
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Logged In',
                            showConfirmButton: false,
                            timer: 1500
                          })

                        addcredentials(response.data[0])
                        if(response.data[0].type === 'gc'){
                          return navigate(`/nav/home/${response.data[0].type}/dashboard`)
                        }
                        navigate(`/nav/home/${response.data[0].type}`)
                      }else{
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'No user found'
                        })
                      }
                      console.log(response)
                        setUser('');
                        setPwd('');
                    },1500)

        }catch (err){
          if (err) {
              setloading(false)
              setUser('');
              setPwd('');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'SERVER ERROR'
            })
          }
        }
      }

      const [forgotPass,setforgotPass] = useState(false)

      const GetNewPass = async () =>{
        Swal.fire({
          title: 'Double check your input!',
          text: "New password will be sent to your contact number!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proceed'
        }).then( async (result) => {
          if (result.isConfirmed) {

                if(!user)
                return  Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Please Enter username/Lrn'
                })
                try{
                    const response= await Axios.patch(`https://backend-def.onrender.com/getstudAccDetails/${user}`)
                    setUser('')
                    setforgotPass(!forgotPass)
                    if(response.status===205){
                      setUser('')
                      return  Swal.fire({
                        icon: 'info',
                        title: 'Invalid action',
                        text: 'User does not exist!'
                      })
                    }

                    if(response.status===204){
                      setUser('')
                      return  Swal.fire({
                        icon: 'info',
                        title: 'Invalid action',
                        text: 'There is no registered Contact number in your account'
                      })
                    }

                    if(response.data){
                      setUser('')
                      return  Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your new password is sent to your Contact Number'
                      })
                    }
                    
                }catch (err){
                    console.log(err)
                }
          }})
      }

      const [showpass,setShowpass] = useState(false)

  return (
    <>
         
            {
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 '>
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>
}
                
      <div className=' bg h-[100vh] flex justify-center items-center z-10 overflow-hidden'>

        <form  onSubmit={handleSubmit} className='sm:rounded-lg w-[370px] h-full sm:h-[400px] flex flex-col justify-around items-center text-white glass-cardS'>

          <img src={logo} alt='logo' className='w-[170px] z-40'/>
              {!forgotPass ? 
                <>
                     <div className=' z-40'>
                      <div className='relative flex justify-center z-40'>
                         <input
                          ref={userRef}
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          type="text"
                          placeholder='Username or LRN'
                          className='bg-transparent border-b-2 border-white text-white  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white placeholder-opacity-75 focus:outline-none'/>
                        <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                      </div>

                      <div className='relative flex justify-center mt-[15px] z-40'>
                        <input
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          type={showpass ? "text":"password"}
                          placeholder='Password'
                          className='bg-transparent border-b-2 border-white w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white placeholder-opacity-75 text-white focus:outline-none'/>
                        <RiLockPasswordFill size={30} className='text-white absolute left-[15px] top-[7px]'/>
                        <div className='absolute right-0 h-full w-[30px] flex justify-center items-center'>
                          {showpass ? 
                              <AiFillEyeInvisible size={22} className='cursor-pointer' onClick={()=> setShowpass(!showpass)}/>
                            :
                             <AiFillEye size={22} className='cursor-pointer' onClick={()=> setShowpass(!showpass)}/>}
                        </div>
                      </div>
                      {/* <div className='z-50  cursor-pointer my-2'>
                        <p className='hover:underline w-fit' 
                        onClick={()=> {
                          setUser('')
                          setforgotPass(!forgotPass)}}
                        > Forgot password ?</p>
                      </div> */}
                      
                        <div className='relative flex justify-center mt-[15px] z-40'>
                          <input
                            type="submit"
                            value="LOG IN"
                            className='bg-blue-400 p-2 px-32 m-auto rounded-sm cursor-pointer text-white mt-[15px] hover:bg-blue-500 focus:outline-none'/>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className=' z-40'>
                      <div className='relative flex justify-center z-40'>
                         <input
                          ref={userRef}
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          type="text"
                          placeholder='Username or LRN'
                          className='bg-[#71A1CC] text-white  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                        <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                      </div>

                      <div className='relative flex justify-center mt-[15px] z-40  cursor-pointer'>
                            <p onClick={()=>{
                            Swal.fire({
                              icon: 'info',
                              title: 'Enter your Username',
                              text: 'Enter your LRN or Username and Click "Get new pass" your new password will be send to registered number in your account if none nothing will happen'
                            })
                          }} className='hover:underline'> Help?</p>
                      </div>
                      <div className='z-50  cursor-pointer'>
                        <p className='w-fit hover:underline' onClick={()=> {
                        setUser('')
                        setforgotPass(!forgotPass)}}>Back</p>
                        </div>
                      
                        <div className='relative flex justify-center mt-[15px] z-40'>
                          <div onClick={()=> GetNewPass()} className='bg-[#71A1CC] text-center p-2 w-full m-auto rounded-sm cursor-pointer text-white mt-[15px] hover:bg-blue-500 focus:outline-none'>Get new pass</div>
                        </div>
                    </div>
                </>
                  }
                 

          </form>

      </div>
     
      {/* <div className="opacity-50 fixed inset-0 z-0 bg-black "></div> */}
    </>
    
  )
}
