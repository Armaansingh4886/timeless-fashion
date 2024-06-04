import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ("../styles/Section.css")
const Section = ({ title, bgColor, type }) => {
  
  const [data,setData] = useState([{}]);
  
  useEffect(()=>{ 
     axios.get('http://localhost:5000/getfeatureditems').then((res) => {
    if (res.data.status === true) {
      if(type==="bigdiscount"){
       setData(res.data.data.bigdiscount);}
       if(type==="newarrival"){
        setData(res.data.data.newarrival);
       }
       if(type==="bestsales"){
        setData(res.data.data.bestsales);
       }

    } else {
        // toast.error(res.data.error);
    }
})
.catch((error) => {
    console.error('Error:', error);
    // toast.error('An error occurred. Please try again later.');
});
},[])
  return (
    <section style={{ background: bgColor }}>
      <div>
        <div className="video">
          <video autoPlay loop muted className="video-background_content">
            <source src={require("../assets/banner.mp4")} type="video/mp4"/>
          </video>
        <div className="heading" >
          {/* <h1>{title}</h1> */}
          <p>{title}</p>
        </div>
        </div>
        <Row className="justify-content-center">
          {data.map((productItem) => {
            return (
              <ProductCard
                key={productItem.id}
                title={title}
                productItem={productItem}
              />
            );
          })}
        </Row>
      </div>
    </section>
  );
};

export default Section;
