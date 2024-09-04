import React, { useEffect, useState } from 'react'
import Menu from '../Assets/menu.jpg'
import { FaPlayCircle } from "react-icons/fa";
import Bread_Pakora from '../Assets/bread_pakora.jpg'
import Burger from '../Assets/burger.jpg'
import Dosa from '../Assets/dosa.jpg'
import Idli from '../Assets/idli.jpg'
import Tandoori_Chicken from '../Assets/tandoori_chicken.jpg'
import Pizza from '../Assets/pizza.jpg'
import { IoMdArrowBack } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";
import Images1 from './images.json'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Homepage() {

  const [images,setImages]=useState(["Bread_Pakora","Burger","Dosa","Pizza"])
  
 // This line copies the array from the JSON file into the state
 const [images1, setImages1] = useState([...Images1.images]);
const navigate=useNavigate()
  
  const backward=()=>{

    setImages([...images.slice(1), images[0]]);


  }

  const forward = () => {
    setImages([images[images.length - 1], ...images.slice(0, images.length - 1)]);
  };
  
  return (
    <div>
    <div className='flex justify-center flex-wrap'>
        <div className='flex flex-col items-center justify-center m-4'>
            <h1 className='text-6xl'>Claim Best Offer</h1>
            <h1 className='text-6xl'>on Fast <span className='text-red-400'>Food</span>&</h1>
            <h1 className='text-6xl text-red-400'>Restaurent</h1>
            <p1 className='text-2xl mt-4'>Our job is fulfill the customer need according</p1>
            <p1 className='text-2xl mt-1'>to their requirement so please carry on</p1>
            <div className='flex'><button className='bg-red-400 px-6 rounded-full mt-4 mx-3'>Get Started</button>
            <div className='mt-4 p-3 flex border rounded-full'><FaPlayCircle color='yellow' size={50} /><button className='mx-2'>Watch Video</button></div>
            </div>
        </div>
        <div className='mt-5'>
            <img src={Menu} width={"700px"}/>
        </div>
        <div>
           
        </div>
        </div>
        <h1 className='text-3xl ml-[10%] mt-5'>Food Categories</h1>
        
        <div className='text-black'><IoMdArrowBack onClick={()=>backward()}/></div>
        <div className='flex gap-3 m-3 flex-wrap text-white justify-center'>
          {images.map((image)=>{
            
            return <div> <img src={"/images/"+image+".jpg"} style={{width:"300px",height:"250px"}}/><h1 className='relative bottom-10 left-24 '>{image}</h1></div>

          })}
          <div className='text-black'><IoArrowForward onClick={()=>forward()}/></div>
        </div>
        <h1 className='text-center m-4 text-2xl'>MOST POPULAR</h1>
        <div className='flex flex-row flex-wrap gap-4 justify-center '>
        {images1.map((image, index) => (
  <div className='flex flex-col' key={index}>
    <button onClick={()=>navigate("/product",{state:{product:image}})}>
    <img 
      src={`/images/${image.name}.jpg`} 
      alt={image.name} 
      style={{ width: "300px", height: "250px" }} 
    />
    </button>
    <h1 className='text-center'>{image.name}</h1> {/* Render the name of the image */}
    <div className='w-[300px]'>{image.description}</div>
    <div className='font-bold flex justify-between'>
      <div>${image.price}</div> <div> <span className='text-red-400'>Offer_price:-</span>{image.off_price}</div>
    </div>
  </div>
))}

        </div>
    </div>
  )
}
