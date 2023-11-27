import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import About from './Pages/About';
import Products from './Pages/Products';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Pages/SignUp';
import { useState } from 'react';
import CartList from './Pages/CartList/CartList';
import Sucess from './Components/Sucess';
import Cancel from './Components/Cancel';
import AdminDashboard from './admin/pages/Admindashboard';
import Admindashboard from './admin/pages/Admindashboard';
import { Toast } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import AddProduct from './admin/pages/AddProduct';
import ViewProduct from './admin/pages/ViewProduct';
import EditProduct from './admin/pages/EditProduct';
import AdminLogin from './admin/pages/AdminLogin';
import PrivateRoute from './Components/PrivateRoute';
import AdminSignup from './admin/pages/AdminSignup';
import ProductDetails from './Pages/ProductDetails';


function App() {
  const [cart, setCart] = useState([]);


  // Check if the current route is an admin route
  const isAdminRoute = window.location.pathname.startsWith('/admin');

   const addToCart = (data) => {
       setCart([...cart, {...data, quantity:1}])
   }
   const updateCart = (newCart) => {
    setCart(newCart);
  };
  return (
    <Router>
      {!isAdminRoute && <NavBar count={cart.length}/>}
      
      <Routes>
        <Route path='/' element={<Home addToCart={addToCart}/> }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='products/' element={<Products addToCart={addToCart}/>} />
        <Route path='/product/:id' element={<ProductDetails addToCart={addToCart}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cartlist' element={<CartList cart={cart}  updateCart={updateCart}/>}/>
        <Route path='/sucess' element={<Sucess/>}/>
        <Route path='/cancel' element={<Cancel/>}/>

        {/* Admin */}
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/signup' element={<AdminSignup/>}/>
        <Route path='/admin/dashboard' element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />
        <Route path='/admin/products' element={<PrivateRoute><ViewProduct/></PrivateRoute>}/>
        <Route path='/admin/product/new' element={<PrivateRoute><AddProduct/></PrivateRoute>} />
        <Route path='/admin/products/edit/:id' element={<PrivateRoute><EditProduct/></PrivateRoute>}/>

      </Routes>
      {!isAdminRoute && <Footer/>}
      <Toaster/>
    </Router>
  );
}

export default App;
