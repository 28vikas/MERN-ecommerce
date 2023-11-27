import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const ProductDetails = ({ addToCart }) => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details based on the id parameter
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={`http://localhost:5000/images/${product.image}`} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p className="font-weight-bold">Price: ₹&nbsp;{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
