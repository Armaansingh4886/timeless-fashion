import React, { createContext, useContext, useEffect, useState } from "react";
import "../styles/order.css";
import { UserContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import Ordercart from "./Ordercart";

const order = {
  _id: "1",
  createdAt: "2024-05-13T12:00:00Z",
  isDelivered: false,
  orderItems: [
    {
      name: "Sample Product",
      qty: 2,
      price: 50.0,
      image: "https://via.placeholder.com/150",
      seller: "Seller123",
    },
  ],
};
export const reloadContext = createContext();
const Orders = ({}) => {

  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [reload,setReload] = useState(false);
  if (!user) {
    toast.error("LogIn first");
    navigate("/seller/login");
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .post("http://localhost:5000/seller/orders", { sellerId: user })
      .then((res) => {
        if (res.data.status === true) {
          setOrders(res.data.data.result);
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // toast.error('An error occurred. Please try again later.');
      });
  }, [reload]);

  const handleRateClick = () => {
    // navigate(`/rateReview/${orders.itemId._id}`)
    console.log(orders);
  };
    if(orders.length==0){
      return(
        <>
        <div className="emptylist"><h3><b>There are no orders in your list .......</b></h3></div>
        </>
      )
    }
  // const [avgrate, setAvgrate] = useState(0);
  return (
    <>
      <Banner title="Orders" />
      <div className="orders">
        {orders &&
          orders.map((order) => {
            
            let avgrate =0;
            // useEffect(() => {
              if (order.itemId?.rating?.length != "0") {
                const count = order.itemId?.rating?.length;
                const sumrate = order.itemId?.rating?.reduce(
                  (total, item) => total + item.rating,
                  0
                );
                avgrate =(Math.floor(sumrate / count));
              }
            // }, []);
            const elements = [];
            const ratestar = () => {
              for (let i = 0; i < avgrate; i++) {
                elements.push(<i className="fa fa-star"></i>);
              }
              for (let i = 0; i < 5 - avgrate; i++) {
                elements.push(<i class="fa-regular fa-star"></i>);
              }
            };
            ratestar();
         

            let showDropdown = false;

            const handleButtonClick = () => {
              showDropdown =true;
            };
            return (
            <>
            <reloadContext.Provider value={[reload,setReload]}>
            <Ordercart order={order}/>
            </reloadContext.Provider>
              {/* <div className="order-card">
                <div className="order-card-img">
                  <img
                    src={"http://localhost:5000/" + order.itemId.image}
                    alt={order.itemId.name}
                  />
                </div>
                <div className="order-card-details">
                  <h5>{order.itemId.name}</h5>
                  <p className="bold-text">
                    <b>Quantity</b>: {order.count}
                  </p>
                  <p>Phone: {order.address.phone}</p>
                  <p>
                    Address: {order.address.address},{order.address.apartment}{" "}
                    {order.address.city}-{order.address.state}
                  </p>
                </div>

                <div className="order-card-details">
                  <p className="bold-text">
                    <b>Price</b>: Rs.{order.itemId.price}
                  </p>
                 
                  {elements}
                </div>

                <div className="order-card-info">
                  <p className='bold-text'><b>Order Date</b>: {order.placedDate.substring(0, 10)}</p>

                  <p className="bold-text">
                    <b>Status</b>: {order.status}
                  </p>
                  <div>
      {!showDropdown && <button onClick={handleButtonClick}>Show Order Status Dropdown</button>}
      
      {showDropdown && (
        <>
          <label htmlFor="order-status">Order Status:</label>
          <select id="order-status" name="order-status">
            <option value="ordered">Ordered</option>
            <option value="proccessing">Proccessing</option>
            <option value="delivered">Delivered</option>
          </select>
        </>
      )}
    </div>
                </div>
              </div> */}
              </>
            );
          })}
      </div>
    </>
  );
};

export default Orders;
