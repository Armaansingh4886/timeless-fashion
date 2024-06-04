import React, { useContext, useEffect, useState } from 'react'
import "../styles/myitems.css"
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../App';
import axios from 'axios';


const Myitems = () => {
    const navigate = useNavigate();
const [user,setUser] = useContext(UserContext)
const [items,setItems] = useState([]);
const [reload,setReload] = useState(true);

    if(!user){
      toast.error("Login first");
      navigate("/seller/login")
      
    }
    useEffect(() => {
      window.scrollTo(0, 0);
      axios
        .post("http://localhost:5000/seller/items", { sellerId: user })
        .then((res) => {
          
          if (res.data.status === true) {
            setItems(res.data.data.Items);
          } else {
            toast.error(res.data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // toast.error('An error occurred. Please try again later.');
        });
    }, [reload]);
    if(items.length==0){
      return(
      <>
      <div className="emptylist"><h3><b>There is no item uploaded yet ....</b></h3></div>
      </>
      )
    }
  return (
    // <div>
    //   <div className="item-card">
    //   <img src={item.image} alt={item.name} className="item-image" />
    //   <div className="item-details">
    //     <h2 className="item-name">{item.name}</h2>
    //     <p className="item-description">{item.description}</p>
    //     <p className="item-category"><strong>Category:</strong> {item.category}</p>
    //     <div className="item-price-discount">
    //       <p className="item-price"><strong>Price:</strong> ${item.price}</p>
    //       <p className="item-discount"><strong>Discount:</strong> {item.discount}%</p>
    //     </div>
    //   </div>
    // </div>
    // </div>
    
    <div className="product-table-container">
    
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(product => (
            <tr key={product._id}>
              <td><img src={"http://localhost:5000/"+product.image} alt={product.name} className="product-image" /></td>
              <td>{product.name}</td>
              <td style={{maxWidth:"350px"}}>{product.description}</td>
              <td>Rs. {product.price}</td>
              <td>{product.discount}%</td>
              <td>
                <button className="edit-button" onClick={()=>{navigate(`/seller/updateitem/${product._id}`)}}><FaEdit /></button>
                <button className="delete-button" onClick={()=>{
                   axios
                   .post("http://localhost:5000/seller/deleteitem", { itemId: product._id })
                   .then((res) => {
                     
                     if (res.data.status === true) {
                       toast.success(res.data.message);
                       setReload(!reload);
                     } else {
                       toast.error(res.data.error);
                     }
                   })
                   .catch((error) => {
                     console.error("Error:", error);
                   });
                }}><FaTrashAlt /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Myitems
