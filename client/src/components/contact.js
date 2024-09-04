import React from 'react'

export default function contact() {
  return (
    <div>
      <div className='container'>
        <h1 className='text-3xl text-center mt-5'>Contact US</h1>
        <div className='flex justify-center gap-12 mt-5 sm:ml-[5%] ml-[15%] flex-wrap'>
          <input placeholder='Name' className='border' style={{width:"13rem",border:"2px solid black"}}></input>
          <input placeholder='Email' className='border'  style={{width:"13rem",border:"2px solid black"}}></input>
         
        </div>
      </div>
      <div className='flex flex-wrap justify-center sm:justify-start sm:ml-[10%] '>
      <div className='mt-5 order-2 md:order-1'>
        <h1 className='text-2xl ml-[10%]'>Get In Touch</h1>
        <p className=' mt-[5%] ml-[8%]'>Email:nkumawat34@gmail.com</p>
        <p className=' mt-[8%] ml-[8%]'>Phone No:7014069681</p>
      </div>
      <div className='flex flex-col justify-center mt-5 ml-[10%] order-1 md:order-2'><textarea className='border'  placeholder='Message' style={{width:"23rem",height:"300px",border:"2px solid black"}}></textarea><div className='flex justify-center mt-3'><button className='bg-red-400 rounded-full p-2 w-[10rem]' >Submit</button></div></div>
     
      </div>
      <div className='flex justify-center mt-4'></div>
    </div>
  )
}
