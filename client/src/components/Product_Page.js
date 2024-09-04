import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { addProduct, removeProduct } from './CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { addItemToCart } from './CartSlice';
  import "react-toastify/dist/ReactToastify.css";
  import { useEffect } from 'react';
export default function Product_Page() {
    const location = useLocation();
    const {product} =location.state
    const items = useSelector(state => state.cart.products);
    const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
    const [token,setToken]=useState("")
    const dispatch = useDispatch();
    const navigate=useNavigate()
    

    
    useEffect(()=>{

      const token=localStorage.getItem("token")
      setToken(token)
    })
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
    <div className='container'>
    <div className='flex flex-row justify-center mt-[5%] flex-wrap'>
        <div>
            <img src={"/images/"+product.name+".jpg"} style={{width:"300px",height:"300px"}}/>
        </div>
        <div className='flex flex-col m-5'>
            <h1 className='text-4xl'>{product.name}</h1>
            <h2 className='mt-5'>${product.price}</h2>
            <h2 className='mt-5'>{product.description}</h2>
            <div className='flex mt-5 gap-5'>
                <button className='p-3 bg-red-400' onClick={()=>{add_to_cart(product)}}>Add to Cart</button>
                <button className='p-3 bg-red-400' onClick={()=>{add_to_cart(product)}}>Buy Now</button>
            </div>
        </div>

    </div>
    <ToastContainer />
    </div>
  )
}
