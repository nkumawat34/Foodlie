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
    localStorage.removeItem("email")

    setToken("")
  }
  return (
    <div>
<nav class='flex justify-between mt-3 max-w-screen-lg'>
<div className='lg:hidden visible'>

<button onClick={toggleMenu}  className='ml-[50px] border'><RxHamburgerMenu /></button>
  <ul className={`flex flex-col relative left-[10%] ${isMenuVisible ? '' : 'hidden'} relative `} id="menu">
<l1 class='p-3 hover:underline underline-offset-8  decoration-4  ' onClick={()=>navigate("/")}>Home</l1>
<l1 class='p-3 hover:underline underline-offset-8  decoration-4' onClick={()=>navigate("/dishes")}>Dishes</l1>
<l1 class='p-3 hover:underline underline-offset-8  decoration-4' onClick={()=>navigate("/orders")} >Orders</l1>
<l1 class='p-3 hover:underline underline-offset-8  decoration-4' onClick={()=>navigate("/contact")}>Contact</l1>
<li>
<input className='max-w-200px max-h-[50px] border border-grey-700 rounded-full' onChange={(e)=>{setSearchbar(e.target.value);navigate("/search",{
    state:{
      searchterm:e.target.value
    }
  })}}/></li>
  <div className='flex mt-5 gap-5'>
<li><IoIosSearch size={30}/></li>
<li><CiHeart size={30} onClick={()=>navigate("/wishlist")}/></li>
<li><CiShoppingCart size={30} onClick={()=>navigate("/cart")}/></li>
</div>
{ token?<button className='p-3 hover:underline underline-offset-8  decoration-4 visible sm:hidden  rounded-full text-black' onClick={()=>logout()}>Logout</button>
:<button className='p-3 hover:underline underline-offset-8  decoration-4 visible sm:hidden rounded-full text-black' onClick={()=>{navigate("/login")}}>Sign In</button>}
</ul>

</div>
<div class='text-3xl sm:ml-[10%] md:ml-[5%] lg:ml-[10%] sm:ml-[20%] flex ml-[10%]'>
<IoFastFood color='red'/>Foodlie

</div>

<div className=' invisible lg:visible   ml:ml-0 xl:ml-[5%]'>
  <ul className='flex gap-5'>
    <button className='p-3 hover:underline underline-offset-8 decoration-4' onClick={()=>navigate("/")}>Home</button>
    <button className='p-3 hover:underline underline-offset-8 decoration-4' onClick={()=>navigate("/dishes")} >Dishes</button>
    <button className='p-3 hover:underline underline-offset-8 decoration-4' onClick={()=>navigate("/orders")} >Orders</button>
    <button className='p-3 hover:underline underline-offset-8 decoration-4' onClick={()=>navigate("/contact")}>Contact</button>
  </ul>
</div>
<div className="flex gap-3 relative mt-3 ml-[10%] hidden lg:flex">
  <input className='max-w-200px max-h-[50px] border border-grey-700 rounded-full' onChange={(e)=>{setSearchbar(e.target.value);navigate("/search",{
    state:{
      searchterm:e.target.value
    }
  })}}/>
<IoIosSearch size={30}/>
<CiHeart size={30} onClick={()=>navigate("/wishlist")}/>
<CiShoppingCart size={30} onClick={()=>navigate("/cart")}/>

{ token?<button className='sm:bg-red-400 rounded-full md:p-2 p-0 text-black md:visible invisible max-w-[80px] max-h-[55px]' onClick={()=>logout()}>Logout</button>
    :<button className='sm:bg-red-400 rounded-full md:p-2 p-0 text-black md:visible invisible max-w-[80px] max-h-[55px]' onClick={()=>{navigate("/login")}}>Sign In</button>}
    
</div>

</nav>

    </div>
  )
}
