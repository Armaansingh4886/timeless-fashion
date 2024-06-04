import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";


const Product = () => {
  const { id } = useParams();
  const [data,setData] = useState([])
 useEffect(()=>{ axios.post('http://localhost:5000/getItem',{itemId:id})
  .then((res) => {
      if (res.data.status === true) {
          setData(res.data.data);
          
        
      } else {
          // toast.error(res.data.error);
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      // toast.error('An error occurred. Please try again later.');
  });},[window.location.pathname])

  


  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.post('http://localhost:5000/getCategoryItems',{category:data.category}).then((res) => {
      if (res.data.status === true) {
          setRelatedProducts(res.data.data.Items);
       
      } else {
          // toast.error(res.data.error);
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      // toast.error('An error occurred. Please try again later.');
  });
    
  }, [data,window.location.pathname]);

  useWindowScrollToTop();

  return (
    <Fragment>
      {/* <Banner title={data?.name} /> */}
      <ProductDetails selectedProduct={data} />
      <ProductReviews selectedProduct={data} />
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
