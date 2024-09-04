
import './App.css';
import Homepage from './components/Homepage';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Orders from './components/orders';
import Login from './components/login';
import Contact from './components/contact';
import Dishes from './components/dishes';
import Product_Page from './components/Product_Page';
import Cart from './components/cart';
import Wishlist from './components/wishlist';
import Search from './components/Search';
function App() {
  return (
    <>
    
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<><Navbar/><Homepage /></>} />
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/contact" element={<><Navbar/><Contact/></>}></Route>
      <Route path="/dishes" element={<><Navbar/><Dishes/></>}></Route>
      <Route path="/orders" element={<><Navbar/><Orders/></>}></Route>
      <Route path="/product" element={<><Navbar/><Product_Page/></>}></Route>
      <Route path="/cart" element={<><Navbar/><Cart/></>}></Route>
      <Route  path="/wishlist" element={<><Navbar/><Wishlist/></>}></Route>
      <Route path="/search" element={<><Navbar/><Search/></>}></Route>
    </Routes>
    
  </BrowserRouter>

    </>
  );
}

export default App;
