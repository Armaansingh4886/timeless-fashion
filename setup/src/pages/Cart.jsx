import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import axios from "axios";
import { CartContext, UserContext } from "../App";
import "../styles/cart.css"
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Cart = () => {
  const [user, setUser] = useContext(UserContext);
  const [cartLength,setCartLength]= useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [reload,setReload] = useState(false);
  const [measurements, setMeasurements] = useState({
    length: '',
    waist: '',
    chest: '',

  });
  const [measurementChange,setMeasurementChange] = useState(false);
const navigate = useNavigate()

  const id = user;
  useEffect(() => {
    window.scrollTo(0, 0);
    if(user){
    axios
      .post("http://localhost:5000/getcart", { userId: id })
      .then((res) => {
        if (res.data.status === true) {
          setCart(res.data.data.cart);
          setCartLength(res.data.data.cart?.length);
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // toast.error('An error occurred. Please try again later.');
      });}
  }, [reload]);
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // middlware to localStorage
  const totalPrice = cart.reduce(
    (price, item) => price + item.count * item.itemId.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
if(user){
    axios
      .post("http://localhost:5000/getmeasurements", { userId: id })
      .then((res) => {
        if (res.data.status === true) {
        if(res.data.data){
          setMeasurements(res.data.data);}
          console.log(res.data.data);
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // toast.error('An error occurred. Please try again later.');
      });}
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
  }, []);

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements({
      ...measurements,
      [name]: value,
    });
    setMeasurementChange(true);
  };
const handleBuyNow = ()=>{
  for (let key in measurements) {
    if (measurements[key]=="") {
      // console.log(`${key}: ${obj[key]}`);
      toast.error("fill all fields");
      return;
    }
  }
  if(measurementChange===true){
    setMeasurementChange(false)
    console.log("yes");
    axios
    .post("http://localhost:5000/addmeasurements", { userId: id ,measurements:measurements})
    .then((res) => {
      if (res.data.status === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // toast.error('An error occurred. Please try again later.');
    });
  }
  console.log("buy now");
  navigate(`/placeorder`)
}
  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cart.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cart.map((item) => {
              const productQty = item.itemId.price * item.count;
              return (
                <div className="cart-list" key={item._id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={"http://localhost:5000/"+item.itemId.image} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.itemId.name}</h3>
                          <h4>
                            Rs.{item.itemId.price}.00 * {item.count}
                            <span>Rs. {productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={()=>{
                              axios.post('http://localhost:5000/addCart',{userId:user,count:item.count+1,itemId:item.itemId._id}).then((res) => {
                                if (res.data.status === true) {
                                    
                                 toast.success("added")
                                 setReload(!reload)
                                } else {
                                    toast.error(res.data.error);
                                }
                            })
                            .catch(() => {
                                toast.error('An error occurred. Please try again later.');
                            });
                            }}
                                                     >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={()=>{
                              
                              axios.post('http://localhost:5000/addCart',{userId:user,count:item.count-1,itemId:item.itemId._id}).then((res) => {
                                if (res.data.status === true) {
                                    
                                 toast.success("removed")
                                 setReload(!reload)
                                } else {
                                    toast.error(res.data.error);
                                }
                            })
                            .catch(() => {
                                toast.error('An error occurred. Please try again later.');
                            });
                            }}
                            // onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={()=>{
                        axios.post('http://localhost:5000/deleteCart',{userId:user,id:item._id}).then((res) => {
                          if (res.data.status === true) {
                              
                           toast.success("removed")
                           setReload(!reload)
                          } else {
                              toast.error(res.data.error);
                          }
                      })
                      .catch(() => {
                          toast.error('An error occurred. Please try again later.');
                      });
                      }}
                      // onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>Rs. {totalPrice}.00</h3>
              </div>
            </div>
            <div classNmae="cart-total d_flex justify-content-center w-100 bg-primary">
            <div className="measurements">
          <h3>Enter Your Measurements:</h3>
          <h5>In Inches</h5>
          <form>
            <div class="form-row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="input1" class="form-label">Shirt Length</label>
                        <input type="text" required class="form-control" id="input1" name="shirtlength" value={measurements.shirtlength}
            onChange={handleChange}
            />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="input2" class="form-label">Waist</label>
                        <input type="text" required class="form-control" id="input2" name="waist" value={measurements.waist}
            onChange={handleChange}
            />
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="input3" class="form-label">Chest</label>
                        <input type="text" required class="form-control" id="input3" name="chest" value={measurements.chest}
            onChange={handleChange}
            />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="input4" class="form-label">Hip</label>
                        <input type="text" required class="form-control" id="input4" name="hip" value={measurements.hip}
            onChange={handleChange}
            />
                              </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="input5" class="form-label">Sleve Length</label>
                        <input type="text" required class="form-control" id="input5" name="slevelength" value={measurements.slevelength}
            onChange={handleChange}
            />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="input6" class="form-label">Front Neck Depth</label>
                        <input type="text" required class="form-control" id="frontneckdepth" name="frontneckdepth" value={measurements.frontneckdepth}
            onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="input5" class="form-label">Bottom Length</label>
                        <input type="text" required class="form-control" id="input5" name="bottomlength" value={measurements.bottomlength}
            onChange={handleChange}/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="input6" class="form-label">Size Around Ankle</label>
                        <input type="text" required class="form-control" id="sizearoundankle" name="sizearoundankle" value={measurements.sizearoundankle}
            onChange={handleChange}/>
                    </div>
                </div>
            </div>
            {/* <input type="submit" className="buy-button" onClick={handleBuyNow} value="Buy Now" /> */}
             <button type="submit" className="buy-button" onClick={handleBuyNow}>Buy Now</button>
        </form>

          
          {/* <input
            type="text"
            name="length"
            value={measurements.length}
            onChange={handleChange}
            placeholder="Length"
          />
          <input
            type="text"
            name="waist"
            value={measurements.waist}
            onChange={handleChange}
            placeholder="Waist"
          />
          <input
            type="text"
            name="breast"
            value={measurements.breast}
            onChange={handleChange}
            placeholder="Breast"
          /> */}
        </div>
       
          
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
