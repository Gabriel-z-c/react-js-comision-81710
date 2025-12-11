import React from 'react';
import Item from './Item';

const ItemList = ({ products, addToCart }) => {
  if (!products || products.length === 0) {
    return <p>No se encontraron productos. Intenta otra categoría o vuelve más tarde.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <Item key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ItemList;
