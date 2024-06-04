import React, { useContext, useEffect, useState } from 'react'
import "../styles/sellerhome.css"
import { UserContext } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const SellerHome = () => {
const [user,setUser] = useContext(UserContext)
  // const items = [
  //   { id: 1, name: 'Item 1', description: 'Description for item 1', imageUrl: 'https://via.placeholder.com/150' },
  //   { id: 2, name: 'Item 2', description: 'Description for item 2', imageUrl: 'https://via.placeholder.com/150' },
  //   { id: 3, name: 'Item 3', description: 'Description for item 3', imageUrl: 'https://via.placeholder.com/150' },
  // ];
  const navigate = useNavigate();
  
  if(!user){
  toast.error("Login First");
  navigate("/seller/login");
  
}
const [order,setOrders] = useState();
const [item,setItems] = useState();
const [totalPrice,setTotalPrice] = useState();
const [items,setItemsList] = useState();
const [account,setAccount] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .post("http://localhost:5000/seller/home", { sellerId: user })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.status === true) {
          setOrders(res.data.data.ordercount);
          setItems(res.data.data.items);
          setTotalPrice(res.data.data.totalPrice);
          
          setAccount(res.data.data.User[0]);
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // toast.error('An error occurred. Please try again later.');
      });


      axios
        .post("http://localhost:5000/seller/items", { sellerId: user })
        .then((res) => {
          
          if (res.data.status === true) {
            setItemsList(res.data.data.Items);
          } else {
            toast.error(res.data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // toast.error('An error occurred. Please try again later.');
        });
    
  }, []);

  return (
    <>
     <div className="admin-container">
      <div className="left-pane">
      <div className="user-info">
        <div className="user">
      <h2>My Account</h2>
      <span><i class="fa-solid fa-user"></i></span></div>
      <p> <b>Name:</b> {account?.name}</p>
      <p> <b>Email:</b> {account?.email}</p>
      <p> <b>Phone:</b> {account?.phone}</p>
      <p> <b>City:</b> {account?.city}</p>
      <p> <b>State:</b> {account?.state}</p>
    </div>
      </div>
      <div className="right-pane">
      <div className="dashboard">
      <div className="upper-pane">
      <div className="stats">
      <div className="stat-card" style={{backgroundColor:"#58c558"}}>
        <div className="data">
        <p>{order}</p>
        <h3>Total Orders</h3></div>
        <p><i class="fa-solid fa-bag-shopping"></i></p>
      </div>
      <div className="stat-card" style={{backgroundColor:"#4995df"}}>
       <div className="data"> <p>{item}</p><h3>Total Items</h3>
        
        </div>
        <p><i class="fa-solid fa-cubes-stacked"></i></p>
      </div>
      <div className="stat-card" style={{backgroundColor:"#ff6a6a"}}>
        <div className="data"> <p>Rs. {totalPrice}</p><h3>Total Earnings</h3>
       </div>
        <p><i class="fa-solid fa-indian-rupee-sign"></i></p>
      </div>
    </div>
      </div>
      <div className="lower-pane">
      <div className="user-items">
        {(items?.length==0)&&(<div classNmae="emptyList"><h3>No items uploaded yet ....</h3></div>)}
      {items?.map(item => (
        <div key={item.id} className="item-card">
          <div className="item-desc" >
          <img className='itemImage' src={`http://localhost:5000/`+item.image} alt={item.name} />
          <span><h4>{item.name}</h4>
          </span></div>
          <div className="ratings">
            {(item.rating?.length==0)&&(<div className="norating"><h4>No ratings to this product ...</h4></div>)}
            {item.rating?.map(rate=>(<div>
              <span><h5><b>User:</b> {rate.name}</h5>
              <div className="stars">
              {function(){
                const elements=[];
                for (let i = 0; i < rate.rating; i++) {
    elements.push(<i className="fa fa-star"></i>)
  }
  for (let i = 0; i < (5-rate.rating); i++) {
  elements.push(<i class="fa-regular fa-star"></i>)
  }
  return elements}()}</div>
              </span>
              <p><b>Review:</b>{rate.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
      </div>
    </div>
    </>
  )
}

export default SellerHome
