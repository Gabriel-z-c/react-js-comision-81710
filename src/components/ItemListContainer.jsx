// src/components/ItemListContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsFromFirestore } from './services/firebase'; // Asegúrate de que la ruta sea correcta
import ItemList from './ItemList'; // Asegúrate de que ItemList esté exportado correctamente
import { useCart } from '../contexts/CartContext'; // Importamos el contexto del carrito

const ItemListContainer = ({ greeting = "Bienvenido" }) => {
  const { categoryId } = useParams();
  const { addToCart } = useCart();  // Traemos la función addToCart

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProductsFromFirestore();
        if (categoryId) {
          const filteredProducts = fetchedProducts.filter((product) => product.category === categoryId);
          setProducts(filteredProducts);
        } else {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      <ItemList products={products} addToCart={addToCart} /> {/* Pasamos addToCart */}
    </div>
  );
};

export default ItemListContainer;
