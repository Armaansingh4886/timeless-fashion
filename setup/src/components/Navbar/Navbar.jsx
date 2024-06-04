import { useContext, useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/Logo.png"
import { CartContext, UserContext } from "../../App";
const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [user,SetUser] = useContext(UserContext);
  const [cartLength,setCartLength]= useContext(CartContext);
  console.log(cartLength);
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    localStorage.removeItem('userId')
    navigate('/')// Update state to reflect logged-out status
  }
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isLogin,setIsLogin] = useState(false);
  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100 ) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  useEffect(()=>{if(window.location.pathname === "/Login" || window.location.pathname === "/Register"){
    setIsLogin(true)
  }else{setIsLogin(false)}},[window.location.pathname])
  
  window.addEventListener("scroll", scrollHandler);

  const navRefs = {
    home: useRef(null),
    shop: useRef(null),
    cart: useRef(null),
    orders: useRef(null),
    login: useRef(null),
    register: useRef(null),
  };


  const loc =window.location.pathname;

 useEffect(()=>{
  if(loc == "/"){
 navRefs.home.current?.classList.add("selected")}
 else{
  navRefs.home.current?.classList.remove("selected")
 }
 if(loc == "/shop"){
  navRefs.shop.current?.classList.add("selected")}
  else{
   navRefs.shop.current?.classList.remove("selected")
  }
  if(loc == "/about"){
    navRefs.about?.current?.classList.add("selected")}
    else{
     navRefs.about?.current?.classList.remove("selected")
    }
    
      if(user){
      
        if(loc == "/orders"){
          navRefs.orders.current?.classList.add("selected")}
          else{
           navRefs.orders.current?.classList.remove("selected")
          }
      }
      else{if(loc == "/Login"){
      navRefs.login.current?.classList.add("selected")}
      else{
       navRefs.login.current?.classList?.remove("selected")
      }
      if(loc == "/Register"){
        navRefs.register.current.classList.add("selected")}
        else{
         navRefs.register.current?.classList?.remove("selected")
        }}
          

},[loc])
 

  return (
    <>


    <Navbar
      fixed="top"
      expand="md"
      className={isFixed ? "navbar fixed" : "navbar"}
    >
      <Container className="navbar-container py-1">
        <Navbar.Brand to="/">
        <img src={Logo} alt="logo" class="img-fluid" style={{height:"70px"}}/>
         
        </Navbar.Brand>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center flex-grow-1 pe-3">
            <Nav.Item>
              <Link
                aria-label="Go to Home Page"
                className="navbar-link"
                to="/"
                onClick={() => setExpand(false)}
              >
                <span ref={navRefs.home} 
                // onClick={window.scroll(0,0)}
                 className='nav-link-label'>Home</span>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                aria-label="Go to Shop Page"
                className="navbar-link"
                to="/shop"
                onClick={() => setExpand(false)}
              >
                <span ref={navRefs.shop}
                //  onClick={window.scroll(0,0)} 
                  className="nav-link-label">Shop</span>
              </Link>
            </Nav.Item>


            <Nav.Item>
              <Link
                aria-label="Go to Cart Page"
                className="navbar-link"
                to="/about"
                onClick={() => setExpand(false)}
              >
                <span ref={navRefs.about}
                //  onClick={window.scroll(0,0)}
                   className="nav-link-label">About</span>
              </Link>
            </Nav.Item>
            {token ? (
              <>
               <Nav.Item>
              <Link
                aria-label="Go to Cart Page"
                className="navbar-link"
                to="/orders"
                onClick={() => setExpand(false)}
              >
                <span ref={navRefs.orders} 
                // onClick={window.scroll(0,0)} 
                 className="nav-link-label">Orders</span>
              </Link>
            </Nav.Item>
                {/* Show Logout button if user is logged in */}
                <li className='nav-item nav-link' ref={navRefs.logout}
                  style={{color:"#ff4081" }}onClick={handleLogout}><u><b>Logout</b></u>
                </li>
              </>
            ) : (
              <>
                {/* Show Login button if user is not logged in */}

                <Nav.Item>
                  <Link
                    aria-label="Go to Cart Page"
                    className="navbar-link"
                    to="/Login"
                    onClick={() => setExpand(false)}
                  >
                    <span ref={navRefs.login}
                    //  onClick={window.scroll(0,0)} 
                     className="nav-link-label">Login</span>
                  </Link>
                </Nav.Item>


                <Nav.Item>
                  <Link
                    aria-label="Go to Cart Page"
                    className="navbar-link"
                    to="/Register"
                    onClick={() => setExpand(false)}
                  >
                    <span ref={navRefs.register} 
                    // onClick={window.scroll(0,0)} 
                     className="nav-link-label">Register</span>
                  </Link>
                </Nav.Item>


                <Nav.Item>
                  <Link
                    aria-label="Go to Cart Page"
                    className="navbar-link"
                    to="/seller/login"
                    onClick={() => setExpand(false)}
                  >
                    <span 
                    // onClick={window.scroll(0,0)} 
                     className="nav-link-label" style={{color:"#ff4084"}}>Selling</span>
                  </Link>
                </Nav.Item>

              </>
            )}
</Nav>
            
            <Nav.Item className="expanded-cart ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="nav-icon mx-2"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                aria-label="Go to Cart Page"
                to="/cart"
                className="cart"
                data-num={cartLength}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="nav-icon"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </Link>
            </Nav.Item>
          
        </Navbar.Collapse>
      </Container>

      </Navbar>
     


    </>
  );
};

export default NavBar;
