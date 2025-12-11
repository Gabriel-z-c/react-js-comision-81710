import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Importa useParams para acceder a los parámetros de la URL
import { getProductsFromFirestore, getProductsByCategory } from './services/firebase';  // Importa las funciones para obtener productos de Firebase
import ItemList from './ItemList';  // Componente que renderiza los productos
import { useCart } from '../contexts/CartContext';  // Contexto de carrito
import LoaderComponent from './LoaderComponent';  // Componente de carga (spinner)

const ItemListContainer = ({ greeting = "Bienvenido" }) => {
  const { categoryId } = useParams();  // Obtén categoryId de la URL (si estás usando categorías en la URL)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Estado para gestionar la carga de productos
  const { addToCart } = useCart();  // Función para agregar productos al carrito

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);  // Activamos el estado de carga
      try {
        let fetchedProducts = [];
        
        if (categoryId) {
          // Si hay un categoryId, obtenemos los productos por categoría
          const products = await getProductsByCategory(categoryId);
          fetchedProducts = products.map((product) => ({
            id: product.id,
            ...product,
            imgUrl: product.imgUrl || 'https://via.placeholder.com/250',  // Usa una imagen de placeholder si no existe una imagen
          }));
        } else {
          // Si no hay un categoryId, traemos todos los productos
          const products = await getProductsFromFirestore();
          fetchedProducts = products.map((product) => ({
            id: product.id,
            ...product,
            imgUrl: product.imgUrl || 'https://via.placeholder.com/250',  // Usa una imagen de placeholder
          }));
        }
        
        setProducts(fetchedProducts);  // Guardamos los productos obtenidos
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);  // Al finalizar la carga, desactivamos el estado de carga
      }
    };

    fetchProducts();
  }, [categoryId]);  // El efecto se ejecuta cuando cambia el categoryId

  if (loading) {
    return <LoaderComponent />;  // Muestra el Loader mientras los productos se están cargando
  }

  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      <ItemList products={products} addToCart={addToCart} />  {/* Muestra los productos */}
    </div>
  );
};

export default ItemListContainer;
