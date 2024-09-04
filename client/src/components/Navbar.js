import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { IoFastFood } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
import { useEffect } from 'react';
export default function Navbar() {
    
    const navigate=useNavigate()
   
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const  [token,setToken]=useState("")
    const [searchbar,setSearchbar]=useState(false)

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  useEffect(()=>{

   
    setToken(localStorage.getItem('token'))

   console.log(token)

  },[token])

  const logout=()=>{

    localStorage.removeItem("token")
    setToken("")
  }
  return (
    <div>
<nav class='flex justify-between mt-3'>
<div class='text-3xl ml-[10%] sm:ml-[20%] flex'>
<IoFastFood color='red'/>Foodlie
</div>
<div className='md:visible invisible'>
  <ul className='flex flex-wrap'>
    <button className='p-3 hover:underline underline-offset-8 decoration-4' onClick={()=>navigate("/")}>Home</button>
    <button className='p-3 hover:underline underline-offset-8 decoration-4' onClick={()=>navigate("/dishes")} >Dishes</button>
    <button className='p-3 hover:underline underline-offset-8 decoration-4' onClick={()=>navigate("/orders")} >Orders</button>
    <button className='p-3 hover:underline underline-offset-8 decoration-4' onClick={()=>navigate("/contact")}>Contact</button>
  </ul>
</div>
<div className='flex gap-3 mr-[10%] mt-3'>
  <input className='max-w-200px max-h-[50px] border border-grey-700 rounded-full' onChange={(e)=>{setSearchbar(e.target.value);navigate("/search",{
    state:{
      searchterm:e.target.value
    }
  })}}/>
<IoIosSearch size={30}/>
<CiHeart size={30} onClick={()=>navigate("/wishlist")}/>
<CiShoppingCart size={30} onClick={()=>navigate("/cart")}/>

{ token?<button className='sm:bg-red-400 rounded-full md:p-2 p-0 text-black md:visible invisible' onClick={()=>logout()}>Logout</button>
    :<button className='sm:bg-red-400 rounded-full md:p-2 p-0 text-black md:visible invisible max-w-[80px] max-h-[55px]' onClick={()=>{navigate("/login")}}>Sign In</button>}
    
</div>
<div className='md:hidden visible'>

    <button onClick={toggleMenu}  className='right-[60px] relative'><RxHamburgerMenu /></button>
      <ul className={`flex flex-col  ${isMenuVisible ? '' : 'hidden'} relative right-[80px]`} id="menu">
    <l1 class='p-3 hover:underline underline-offset-8  decoration-4  ' onClick={()=>navigate("/")}>Home</l1>
    <l1 class='p-3 hover:underline underline-offset-8  decoration-4' onClick={()=>navigate("/dishes")}>Dishes</l1>
    <l1 class='p-3 hover:underline underline-offset-8  decoration-4' onClick={()=>navigate("/orders")} >Orders</l1>
    <l1 class='p-3 hover:underline underline-offset-8  decoration-4' onClick={()=>navigate("/contact")}>Contact</l1>
   { token?<button className='p-3 hover:underline underline-offset-8  decoration-4 visible sm:hidden  rounded-full text-black' onClick={()=>logout()}>Logout</button>
    :<button className='p-3 hover:underline underline-offset-8  decoration-4 visible sm:hidden rounded-full text-black' onClick={()=>{navigate("/login")}}>Sign In</button>}
    </ul>
    
</div>
</nav>

    </div>
  )
}
