import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RateReview = ({ productId, productImage, productName }) => {
    const {id} =useParams();
    
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
    const [product,setProduct] = useState("");

    useEffect(()=>{ 
      
    window.scrollTo(0, 0);
      axios.post('http://localhost:5000/getItem',{itemId:id})
  .then((res) => {
      if (res.data.status === true) {
          setProduct(res.data.data);
          
        
      } else {
          // toast.error(res.data.error);
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      // toast.error('An error occurred. Please try again later.');
  });},[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      itemId:id,
      rating,
      description,
      name,
    };
    
    try {
      const res = await axios.post('http://localhost:5000/postRating', reviewData);
      console.log(res.data.message);
      toast.success('Review submitted successfully');
      setRating(null);
      setDescription("");
      setName("");
    } catch (error) {
      console.error(error);
      alert('Failed to submit review');
    }
  };

  return (
    <div style={styles.container}>
      <img src={"http://localhost:5000/"+product.image} alt={product.name} style={styles.image} />
      <h2>{product.name}</h2>
      <h3>Rate this product</h3>
      <div style={styles.stars}>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={styles.radio}
              />
              <FaStar
                size={30}
                color={ratingValue <= (hover || rating) ? "#ffcc33" : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <h3>Review this product</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your review here..."
          style={styles.textarea}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  stars: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  radio: {
    display: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff69b4',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default RateReview;