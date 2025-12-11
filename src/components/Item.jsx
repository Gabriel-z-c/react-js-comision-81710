import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = ({ product, addToCart }) => {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={product.image || 'https://via.placeholder.com/250'} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Precio: ${product.price}</Card.Text>
        <Button variant="primary" onClick={() => addToCart(product)}>
          Añadir al carrito
        </Button>
        {/* Enlace para ir al detalle del producto */}
        <Link to={`/item/${product.id}`} className="btn btn-link">Ver detalles</Link>
      </Card.Body>
    </Card>
  );
};

export default Item;
