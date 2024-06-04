import { useState } from "react";
import { Container } from "react-bootstrap";
import "./product-review.css";

const ProductReviews = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");
  console.log(selectedProduct);
  return (
    <section className="product-reviews">
      <Container>
        <ul>
          
          <li
            style={{ color: "black" }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({selectedProduct?.rating?.length})
          </li>
        </ul>
       
          <div className="rates">
            {selectedProduct?.rating?.map((rate) => (
              <div className="rate-comment" key={rate.rating}>
                <span>{rate.name}</span>
                <span>{rate.rating} (rating)</span>
                <p>{rate.name}</p>
              </div>
            ))}
          </div>
        
      </Container>
    </section>
  );
};

export default ProductReviews;
