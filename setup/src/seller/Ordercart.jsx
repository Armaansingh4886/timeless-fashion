import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { reloadContext } from './SellerOrders';

const Ordercart = ({order}) => {
    const [reload,setReload] = useContext(reloadContext);
    const [avgrate,setAvgrate] =useState(0);
    useEffect(() => {
      if (order.itemId?.rating?.length != "0") {
        const count = order.itemId?.rating?.length;
        const sumrate = order.itemId?.rating?.reduce(
          (total, item) => total + item.rating,
          0
        );
        setAvgrate(Math.floor(sumrate / count));
      }
    }, []);
    
    // console.log(avgrate);
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
 

    const [showDropdown,setShowDropdown] =useState(false);

    const handleButtonClick = () => {
      setShowDropdown(true);
    };
    const handleChange = (e)=>{
        console.log(e.target.value,order._id);
        axios
        .post("http://localhost:5000/seller/changestatus", { orderId: order._id ,status:e.target.value})
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
        setReload(!reload);
    }
    return (
      <div className="order-card">
        <div className="order-card-img">
          <img
            src={"http://localhost:5000/" + order?.itemId?.image}
            alt={order.itemId?.name}
          />
        </div>
        <div className="order-card-details">
          <h5>{order.itemId?.name}</h5>
          <p className="bold-text">
            <b>Quantity</b>: {order.count}
          </p>
          <p>Phone: {order.address?.phone}</p>
          <p>
            Address: {order.address?.address},{order.address?.apartment}{" "}
            {order.address?.city}-{order.address?.state}
          </p>
        </div>

        <div className="order-card-details">
          <p className="bold-text">
            <b>Price</b>: Rs.{order.itemId?.price}
          </p>
          {/* <p>{avgrate}</p> */}
          {elements}
        </div>

        <div className="order-card-info">
          <p className='bold-text'><b>Order Date</b>: {order.placedDate.substring(0, 10)}</p>
          
          <p className='bold-text'><b>Payment Mode</b>: {order.payment}</p>

          {/* <p className='bold-text'><b>Order Date</b>: {order.placedDate}</p> */}
          <p className="bold-text">
            <b>Status</b>: {order.status}
          </p>
          <div>
{!showDropdown && <button style={{backgroundColor:"#ff4084" ,color:"white",padding:"5px",borderRadius:"7px"}} onClick={handleButtonClick}>Change Status</button>}

{showDropdown && (
<>
  <label htmlFor="order-status">Order Status:</label>
  <select id="order-status" name="order-status" onChange={handleChange}>
    <option value="ordered">Ordered</option>
    <option value="proccessing">Proccessing</option>
    <option value="delivered">Delivered</option>
  </select>
</>
)}
</div>
        </div>
      </div>
    );
}

export default Ordercart
