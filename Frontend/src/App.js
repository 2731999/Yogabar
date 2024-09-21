import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import NewLaunchesOffers from "./Pages/NewLaunchesOffers"; 
import Login from './Pages/Login';
import Register from './Pages/Register';
import Product1 from "./Pages/Product1"; 
import Product2 from "./Pages/Product2"; 
import Product3 from "./Pages/Product3"; 
import Product4 from "./Pages/Product4"; 
import Product5 from "./Pages/Product5"; 
import Product6 from "./Pages/Product6"; 
import Cart from "./Pages/Cart"; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new-launches-offers' element={<NewLaunchesOffers />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route path='/register' element={<Register />} /> 
        <Route path='/product1' element={<Product1 />} /> 
        <Route path='/product2' element={<Product2 />} /> 
        <Route path='/product3' element={<Product3 />} /> 
        <Route path='/product4' element={<Product4 />} /> 
        <Route path='/product5' element={<Product5 />} /> 
        <Route path='/product6' element={<Product6 />} /> 
        <Route path='/cart' element={<Cart />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
