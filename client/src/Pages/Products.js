import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button,Image  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = ({addToCart}) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  }, []);

  return (
    <div className="container my-5">
   <h1 className="text-center my-5" style={{ color: 'blue', fontSize: '36px', fontWeight: 'bold' }}>
      All Products List
    </h1>
      <div className="row">
      <Container>
      <Row>
      
      {
  product.map((item, key) => (
    <Col key={key} md={3}>
      <Link to={`/product/${item._id}`}>
      <Card style={{ marginBottom: '20px' }}>
        <Image src={`http://localhost:5000//images/${item.image}`} alt={item.title} style={{ width: '100%', height: '200px' }}/>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>Price: ₹ {item.price}</Card.Text>
          <Button
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
      </Link>
    </Col>
  ))
}

      </Row>
    </Container>
      </div>
    </div>
  );
};

export default Products;
