import React, { useEffect, useState } from 'react'
import images from './images.json'
import { useNavigate } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import { addWishlistItem } from './WishListSlice'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { addItemToCart } from './CartSlice';
export default function Search() {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location=useLocation()
   
    const [products,setProducts]=useState([...images.images])
    
    useEffect(()=>{

   //  alert(location.state.searchterm)
   console.log(location.state.searchterm)
   const filtereditems = images.images.filter((product) =>
    product.name.toLowerCase().includes(location.state.searchterm.toLowerCase())
  );
  
      console.log(filtereditems)
      setProducts(filtereditems)

    },[location.state.searchterm])
  return (
    <div>
      
        <div className='flex flex-row justify-center sm:justify-start flex-wrap gap-4 '>
        {products.map((image, index) => (
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
      <div><button className='rounded-full bg-green-500 px-3' onClick={()=>{dispatch(addItemToCart(image));toast.success("Added to cart",{
        position:"bottom-right"
      })}}>Buy</button></div>
       <div> <span className='text-red-400'>Offer_price:-</span>{image.off_price}</div>
    </div>
  </div>
))}
    </div>
    <ToastContainer/>
    </div>
  )
}
