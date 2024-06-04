import React, { useContext, useEffect, useState } from 'react';
import "../styles/order.css"
import { UserContext } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner/Banner';

const order = {
    _id: '1',
    createdAt: '2024-05-13T12:00:00Z',
    isDelivered: false,
    orderItems: [
      {
        name: 'Sample Product',
        qty: 2,
        price: 50.0,
        image: 'https://via.placeholder.com/150',
        seller: 'Seller123',
      },
    ],
  };
  
const Orders = ({  }) => {
    const [user,setUser] = useContext(UserContext);
    const navigate = useNavigate();
const [orders,setOrders] = useState(null);
if(!user){
    toast.error("LogIn first");
    navigate("/")
}
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .post("http://localhost:5000/getOrders", { userId: user })
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
  }, []);

  const handleRateClick =()=>{
    // navigate(`/rateReview/${orders.itemId._id}`)
    console.log(orders);
  }
  return (
    <>
    <Banner title="Orders"/>
    <div className='orders'>
    {
    orders&&orders.map((order)=>{
        return(
            <div className="order-card">
      <div className="order-card-img">
        <img src={"http://localhost:5000/"+order?.itemId?.image} alt={order?.itemId?.name} />
      </div>
      <div className="order-card-details">
        <h5>{order?.itemId?.name}</h5>
        <p className='bold-text'><b>Quantity</b>: {order.count}</p>
        <p>Phone: {order.address.phone}</p>
        <p>Address: {order.address.address},{order.address.apartment} {order.address.city}-{order.address.state}</p>
      </div>

      <div className="order-card-details">
      <p className='bold-text'><b>Price</b>: Rs.{order?.itemId?.price}</p>
      </div>

      


      <div className="order-card-info">
        <p className='bold-text'><b>Order Date</b>: {order.placedDate.substring(0, 10)}</p>
        <p className='bold-text'><b>Status</b>: {order.status}</p>
        
        <p className='bold-text'><b>Payment Mode</b>: {order.payment}</p>
        <p className='bold-text'><b>Seller ID</b>: {order?.itemId?.sellerId}</p>
      </div>

      <div className="rate-button" >
      <button className="review-button" onClick={()=>{navigate(`/rateReview/${order.itemId._id}`)}}>Rate & Review Product</button>
      </div>
    </div>
        )
    })}</div>
    
    </>
  );
};

export default Orders;