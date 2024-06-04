import { useContext, useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SellerNavbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/Logo.png";
import { UserContext } from "../../App";
const SellerNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    localStorage.removeItem("userId");
    setUser("");
    navigate("/"); // Update state to reflect logged-out status
  };
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  useEffect(() => {
    if (
      window.location.pathname === "/Login" ||
      window.location.pathname === "/Register"
    ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [window.location.pathname]);

  window.addEventListener("scroll", scrollHandler);

  const navRefs = {
    sellerhome: useRef(null),
    myitem: useRef(null),
    uploaditem: useRef(null),
    sellerorders: useRef(null),
    sellerlogin: useRef(null),
    sellerregister: useRef(null),
  };

  const loc = window.location.pathname;

  useEffect(() => {
    if (loc === "/seller/") {
      navRefs.sellerhome?.current?.classList.add("selected");
    } else {
      navRefs.sellerhome?.current?.classList.remove("selected");
    }
    if (loc === "/seller/myitems") {
      navRefs.myitem?.current?.classList.add("selected");
    } else {
      navRefs.myitem?.current?.classList.remove("selected");
    }
    if (loc === "/seller/uploaditem") {
      navRefs.uploaditem?.current?.classList.add("selected");
    } else {
      navRefs.uploaditem?.current?.classList.remove("selected");
    }

    if (user) {
      if (loc === "/seller/orders") {
        navRefs.sellerorders?.current?.classList.add("selected");
      } else {
        navRefs.sellerorders?.current?.classList?.remove("selected");
      }
    } else {
      if (loc === "/seller/login") {
        navRefs.sellerlogin?.current?.classList.add("selected");
      } else {
        navRefs.sellerlogin?.current?.classList?.remove("selected");
      }
      if (loc === "/seller/register") {
        navRefs.sellerregister?.current?.classList.add("selected");
      } else {
        navRefs.sellerregister?.current?.classList?.remove("selected");
      }
    }
  }, [loc]);

  return (
    <>
      

      <Navbar
        fixed="top"
        expand="md"
        className={isFixed ? "navbar fixed" : "navbar"}
      >
        <Container className="navbar-container py-1">
          <Navbar.Brand to="/">
          <div class="main-logo">
                <Link to="/">
                  {/* <a href="/"> */}
                  <img
                    src={Logo}
                    alt="logo"
                    class="img-fluid"
                    style={{ height: "70px" }}
                  />
                  {/* </a> */}
                </Link>
              </div>
            {/* <ion-icon name="bag"></ion-icon> */}
            {/* <img src={Logo} style={{height:"70px"}}/> */}

            {/* <h1 className="logo">E-Commerce</h1> */}

            {/* <select class="filter-categories border-0 mb-0 me-5">
              <option>Shop by Category</option>
              <option>Salwar Kameez</option>
              <option>Casual wear</option>
              <option>Party Wear</option>
              <option>Bridal Wear</option>
<option>Pakistani Suits</option>
<option>Anarkali Suits</option>
<option>Straight Salwar</option>
<option>Kurta with plazo</option>
<option>Kurtas</option>
<option>Embroidered Suits</option>
<option>Sharara Suits</option>
<option>Haldi Dresses</option>
<option>Mehndi Outfits</option>
            </select> */}
          </Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Item>
                <Link
                  aria-label="Go to Home Page"
                  className="navbar-link"
                  to={user?"/seller/":"/seller/login"}
                  onClick={() => setExpand(false)}

                  
                >
                  <span ref={navRefs.sellerhome} className="nav-link-label">
                    Home
                  </span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  aria-label="Go to Shop Page"
                  className="navbar-link"
                  to={user?"/seller/orders":"/seller/login"}
                  onClick={() => setExpand(false)}
                >
                  <span ref={navRefs.sellerorders} className="nav-link-label">
                    Orders
                  </span>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  aria-label="Go to Shop Page"
                  className="navbar-link"
                  to={user?"/seller/uploaditem":"/seller/login"}
                  onClick={() => setExpand(false)}
                >
                  <span ref={navRefs.uploaditem} className="nav-link-label">
                    Upload Items
                  </span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  aria-label="Go to Cart Page"
                  className="navbar-link"
                  to={user?"/seller/myitems":"/seller/login"}
                  onClick={() => setExpand(false)}
                >
                  <span ref={navRefs.myitem} className="nav-link-label ">
                    My items
                  </span>
                </Link>
              </Nav.Item>
              {token ? (
                <>
                 
                  {/* Show Logout button if user is logged in */}
                  <li
                    className="nav-item nav-link"
                    ref={navRefs.logout}
                    style={{ color: "#ff4081" }}
                    onClick={handleLogout}
                  >
                    <u>
                      <b>Logout</b>
                    </u>
                  </li>
                </>
              ) : (
                <>
                  {/* Show Login button if user is not logged in */}

                  <Nav.Item>
                    <Link
                      aria-label="Go to Cart Page"
                      className="navbar-link"
                      to="/seller/login"
                      onClick={() => setExpand(false)}
                    >
                      <span ref={navRefs.sellerlogin} className="nav-link-label">
                        Login
                      </span>
                    </Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Link
                      aria-label="Go to Cart Page"
                      className="navbar-link"
                      to="/seller/register"
                      onClick={() => setExpand(false)}
                    >
                      <span ref={navRefs.sellerregister} className="nav-link-label">
                        Register
                      </span>
                    </Link>
                  </Nav.Item>

                  
                </>
              )}
            </Nav>

           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default SellerNavbar;
