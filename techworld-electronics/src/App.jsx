import {BrowserRouter, Routes, Route} from 'react-router-dom';

//Pages
import Home from './pages/Home';
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function App()
{
  return(
    <BrowserRouter basename='techworld-electronics'>
    
      <Routes>
        {/* Main Pages */}
        <Route path='/' element = {<Home />}/> {/* Home page */}
        <Route path='/products' element = {<Products />}/> {/* All Products */}
        <Route path='/products/:id' element = {<ProductDetails />}/> {/* Individual product */}

        {/* Shopping Pages */}
        <Route path='/wishlist' element = {<Wishlist />}/> {/* Wishlist page */}
        <Route path='/cart' element = {<Cart />}/> {/* Cart page */}

        {/* Authentication Pages */}
        <Route path='/login' element = {<Login />}/> {/* Login page */}
        <Route path='/register' element = {<Register />}/> {/* Register page */}
        <Route path='/account' element = {<Account />}/> {/* Acoount page */}

        {/* Checout and orders pages */}
        <Route path='checkout' element = {<Checkout />}/> {/* Checkout page */}
        <Route path='/order-confirmation' element = {<OrderConfirmation />}/>

        {/* Information Pages */}
        <Route path='/about' element = {<About />}/> {/* About page */}
        <Route path='/contact' element = {<Contact />}/> {/* Contact page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;