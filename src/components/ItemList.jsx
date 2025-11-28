import React from 'react';
import { Link } from 'react-router-dom'; // Aquí está la importación necesaria

const ItemList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          {/* Mostrar la imagen del producto */}
          <img src={product.img} alt={product.name} className="product-image" />

          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>

          {/* Si deseas agregar al carrito */}
          <button>Añadir al carrito</button>

          {/* Enlace para ver detalles del producto */}
          <Link to={`/item/${product.id}`}>Ver detalles</Link> {/* Aquí se usa Link */}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
