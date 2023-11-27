import React from "react";
import "./PopularProducts.css";
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const PopularProducts = ({ addToCart }) => {
  const productUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/products`;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  }, []);


  return (
    <div className="popular-container">
      <h1>Popular Products</h1>
      <div className="popular-img">
      
      {
  product.map((item, index) => (
    <div key={index} className="popular-img-content">
      <Link to={`/product/${item._id}`}>
      {console.log(product._id)}
      <img src={`http://localhost:5000//images/${item.image}`} alt={item.title} />
      <p>{item.title}</p>
      <p>Price: {item.price}</p>
      </Link>
      <button onClick={() => addToCart(item)}>Add to cart</button>
    </div>
  ))
}


      </div>
    </div>
  );
};

export default PopularProducts;
