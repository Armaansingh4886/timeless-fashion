import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import {UserContext} from "../../App"
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ProductDetails = ({ selectedProduct }) => {
const [user ,setUser] = useContext(UserContext)

const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handelAdd = (selectedProduct, quantity) => {
    if(!user){
      navigate("/Login")
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


    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  const [avgrate,setAvgrate] = useState(0);
useEffect(()=>{if(selectedProduct?.rating?.length !="0"){
  const count = selectedProduct?.rating?.length;
  const sumrate = selectedProduct?.rating?.reduce((total, item) => total + item.rating, 0);
  setAvgrate(Math.floor(sumrate/count));

}},[])
console.log(avgrate);
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
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" src={"http://localhost:5000/"+ selectedProduct?.image} alt="" />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.name}</h2>
            <p>{selectedProduct?.description} </p>
              <span className="category"><i>{selectedProduct?.category}</i></span>
            <div className="rate">
              <div className="stars">
                {elements}
                {/* <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i> */}
              </div>
              
            </div>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <div className="info">
              <span className="price">Rs.{selectedProduct?.price}</span>
            </div>
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handelAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
