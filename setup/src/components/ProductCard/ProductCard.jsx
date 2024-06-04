import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../../App"

const ProductCard = ({ title, productItem }) => {
  const [user,setUser] = useContext(UserContext)
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem._id}`);
    window.scroll(0,0)
  };
  
  const handelAdd = (selectedProduct,quantity) => {
    if(!user){
      router("/Login")
      toast.error("Login First");
      return;
    }
    console.log(quantity);
    axios.post('http://localhost:5000/addCart',{userId:user,count:quantity,itemId:selectedProduct._id}).then((res) => {
      if (res.data.status === true) {
          console.log(res);
       
      } else {
          toast.error(res.data.error);
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      // toast.error('An error occurred. Please try again later.');
  });


    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

const [avgrate,setAvgrate] = useState(0);
useEffect(()=>{if(productItem?.rating?.length !="0"){
  const count = productItem?.rating?.length;
  const sumrate = productItem?.rating?.reduce((total, item) => total + item.rating, 0);
  setAvgrate(Math.floor(sumrate/count));

}},[])
  const elements=[]
const ratestar = ()=>{
  for (let i = 0; i < avgrate; i++) {
    elements.push(<i className="fa fa-star"></i>);
  }
  for (let i = 0; i < (5-avgrate); i++) {
    elements.push(<i class="fa-regular fa-star"></i>);
  }
}
ratestar();

  return (
    <Col md={2} sm={5} xs={10} className="product mtop">
      {title === "Big Discount" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={"http://localhost:5000/"+productItem.image}
        alt=""
      />
      {/* <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div> */}
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.name}</h3>
        <div className="rate">
          {elements}
          {/* <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i> */}
        </div>
        <div className="price">
          <h4>Rs.{productItem.price}</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={() => handelAdd(productItem,1)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
