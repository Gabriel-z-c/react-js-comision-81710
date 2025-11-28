
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Este componente representa cada producto individualmente en una tarjeta
const Item = ({ product, addToCart }) => {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      {/* Si el producto tiene imagen, se muestra; de lo contrario, se muestra una imagen por defecto */}
      <Card.Img 
        variant="top" 
        src={product.image || 'https://via.placeholder.com/250'} 
        alt={product.name} 
        style={{ height: '250px', objectFit: 'cover' }} 
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Precio: ${product.price}
        </Card.Text>
        
        {/* Botón para añadir al carrito */}
        <Button variant="primary" onClick={() => addToCart(product)}>
          Añadir al carrito
        </Button>

        {/* Enlace para ver más detalles del producto */}
        <Link to={`/item/${product.id}`} className="btn btn-link">Ver detalles</Link>
      </Card.Body>
    </Card>
  );
};

export default Item;
