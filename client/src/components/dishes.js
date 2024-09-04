import React, { useEffect } from 'react'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from 'react';
import images1 from './images.json'
import { useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { addWishlistItem } from './WishListSlice'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addItemToCart } from './CartSlice';
import 'react-toastify/dist/ReactToastify.css';
export default function Dishes() { 

  const [minimum, setMinimum] = useState(0);
  const [maximum,setMaximum]=useState(1000)
  const [items,setItems]=useState([])
  const [images,setImages]=useState([])
  const [token,setToken]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{

      setImages(images1.images)
  },[])

  useEffect(()=>{

    const token=localStorage.getItem("token")
    setToken(token)
  })
   // Function to handle slider value change
   const handleChange = (newValue) => {
    
    setMinimum(newValue[0])
    setMaximum(newValue[1])
    let temp_images1=[];
    if(items.length>0)
    {
    
     temp_images1 = images1.images.filter((image) => items.includes(image.name));
      console.log(temp_images1)
      

    }
    else
    temp_images1=[...images1.images]

    const temp_images=temp_images1.filter((image)=>image.price>=newValue[0] && image.price<=newValue[1])
    setImages(temp_images)
    
  };
  const addfilter = (name) => {
    let updatedItems;
    
    if (!items.includes(name)) {
      // Add the name to items
      updatedItems = [...items, name];
    } else {
      // Remove the name from items
      updatedItems = items.filter(item => item !== name);
    }
  
    // Update the items state
    setItems(updatedItems);
  
    const temp_images1=images1.images.filter((image)=>image.price>=minimum && image.price<=maximum)
    
    // Filter the images based on the updated items
    const temp_images = temp_images1.filter((image) => updatedItems.includes(image.name));
  
    // Update the images state
    setImages(temp_images);
    console.log(temp_images.length)
    
  }
  const add_to_cart=(image)=>{
    if(token){

  
    dispatch(addItemToCart(image))
    toast.success("Added to cart",{
      position:"bottom-right"
    })}
    else
    navigate("/login")
  }
  return (
    <div>

      <div className='flex flex-wrap'>
      
        <div className='basis-[100%] sm:basis-1/3 flex flex-col gap-4 justify-center items-center border mb-5 sm:mb-0'>
        <h1 className='ml-[10%] mt-5 text-2xl m-5'>Food Categories</h1>
        <div>
        <button className='rounded-full mx-2 p-3 hover:bg-slate-400'  style={{border:"2px solid grey", backgroundColor: !items.includes('burger') ? 'white' : 'grey'}} onClick={()=>addfilter('burger')}>burger</button>
        <button className=' rounded-full mx-2 p-3 hover:bg-slate-400' style={{border:"2px solid grey,", backgroundColor: !items.includes('tandoori_chicken') ? 'white' : 'grey'}} onClick={()=>addfilter('tandoori_chicken')}>tandoori_chicken</button>
        </div>
        <div>
        <button className=' rounded-full mx-2 p-3 hover:bg-slate-400' style={{border:"2px solid grey", backgroundColor: !items.includes('idli') ? 'white' : 'grey'}} onClick={()=>addfilter('idli')}>idli</button>
        <button className=' rounded-full mx-2 p-3 hover:bg-slate-400' style={{border:"2px solid grey" , backgroundColor: !items.includes('pizza') ? 'white' : 'grey'}} onClick={()=>addfilter('pizza')}>pizza</button>
        </div>
        <div>

       
        <button className='rounded-full mx-2 p-3 hover:bg-slate-400' style={{border:"2px solid grey", backgroundColor: !items.includes('bread_pakora') ? 'white' : 'grey'}} onClick={()=>addfilter('bread_pakora')}>Bread_Pakora</button>
        <button className=' rounded-full mx-2 p-3 hover:bg-slate-400' style={{border:"2px solid grey", backgroundColor: !items.includes('dosa') ? 'white' : 'grey'}} onClick={()=>addfilter('dosa')}>dosa</button>
        </div>
        <div className='flex flex-col'>
          <h1 className='text-2xl'>Filter By Price</h1>
          <div className='mt-4'>
      <RangeSlider
        min={0}
        max={1000}
        
        onInput={handleChange} // Use onInput for continuous updates
      />
      <p className='mt-4'>Current Min Value: {minimum}</p>
      <p className='mt-4'>Current Max Value: {maximum}</p>
    </div>
        </div>
        </div>

        <div className='basis-[100%] sm:basis-2/3 border '>
        <div className='flex flex-row justify-center sm:justify-start flex-wrap gap-4 '>
        {images.map((image, index) => (
  <div className='flex flex-col' key={index}>
    <button onClick={()=>navigate("/product",{state:{product:image}})}>

    <img 
      src={`/images/${image.name}.jpg`} 
      alt={image.name} 
      style={{ width: "250px", height: "200px" }} 
      
    />
    
    </button>
    <h1 className='text-center'>{image.name}</h1> {/* Render the name of the image */}
    <div className='w-[250px]'>{image.description}</div>
    <div className='mx-auto'><CiHeart size={40} className='' color='red' onClick={()=>{dispatch(addWishlistItem(image))}}/></div>
    <div className='font-bold flex justify-between'>
      <div>${image.price}</div>
      <div><button className='rounded-full bg-green-500 px-3' onClick={()=>{add_to_cart(image)}}>Buy</button></div>
       <div> <span className='text-red-400'>Offer_price:-</span>{image.off_price}</div>
    </div>
  </div>
))}

        </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
