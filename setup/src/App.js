import { createContext, lazy, Suspense, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLoaderData, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import Protected from "./components/Protected";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

import SellerHome from "./seller/SellerHome";

import SellerLogin from "./seller/SellerLogin";
import UploadItem from "./seller/UploadItem"
import SellerRegister from "./seller/SellerRegister";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import RateReview from "./pages/RateReview"
import SellerNavbar from "./components/SellerNavbar/SellerNavbar"; 
import Myitems from "./seller/Myitems";
import SellerOrders from "./seller/SellerOrders";
import Updateitem from "./seller/Updateitem"
import About from "./pages/About"
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));

export const  UserContext = createContext();
export const CartContext = createContext()

function App() {
  const location = useLocation().pathname;
const userId = localStorage.getItem('userId');
const [user,setUser] = useState(!userId?'':userId);
const [cartLength,setCartLength]= useState(0);
// if(userId){
//   setUser({userId:userId})
// }
const nb = ()=>{
if(location.match(/seller/)){
  return <SellerNavbar/>
}else{
  return <NavBar/>
}}
const nav = nb()
  return (
  <UserContext.Provider value={[user,setUser]}>
  <CartContext.Provider value={[cartLength,setCartLength]}>
    <Suspense fallback={<Loader />}>
      {/* <Router> */}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {}
        {nav}
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/cart" element={<Protected Component={Cart} />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/seller/" element={<SellerHome/>}/>
          <Route path="/seller/login" element={<SellerLogin/>}/>
          <Route path="/seller/register" element={<SellerRegister/>}/>
<Route path="/seller/uploaditem" element={<UploadItem/>}/>
<Route path="/placeorder" element={<PlaceOrder/>}/>
<Route path="/orders" element={<Orders/>}/>
<Route path="/rateReview/:id" element={<RateReview/>}/>
<Route path="/seller/myitems" element={<Myitems/>}/>
<Route path="/seller/updateitem/:id" element={<Updateitem/>} />
<Route path="/seller/orders" element={<SellerOrders/>} />
<Route path="/about" element={<About/>}/>
        </Routes>
        <Footer />
      {/* </Router> */}
    </Suspense>
    </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
