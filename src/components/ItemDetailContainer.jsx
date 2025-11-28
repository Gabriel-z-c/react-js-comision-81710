 // src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Para capturar los parámetros de la URL
import { getProductById } from './services/firebase';  // Función para obtener un producto por su ID desde Firebase
import ItemCount from './ItemCount';  // Componente para seleccionar la cantidad
import { useCart } from '../contexts/CartContext';  // Contexto del carrito para agregar productos

const ItemDetailContainer = () => {
  const { id } = useParams();  // Capturamos el parámetro 'id' de la URL (ID del producto)
  const [producto, setProducto] = useState(null);  // Estado para el producto
  const [loading, setLoading] = useState(true);  // Estado de carga
  const { addToCart } = useCart();  // Función para agregar al carrito

  useEffect(() => {
    // Función para obtener el producto desde Firestore
    getProductById(id)
      .then((data) => {
        setProducto(data);  // Actualizamos el estado con los datos del producto
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
      })
      .finally(() => {
        setLoading(false);  // Finalizamos el estado de carga
      });
  }, [id]);  // Solo se ejecuta cuando cambia el parámetro 'id'

  const addToCartHandler = (quantity) => {
    if (producto) {
      addToCart({ ...producto, quantity });
      alert(`${quantity} ${producto.name}(s) agregado(s) al carrito`);
    }
  };

  if (loading) return <p>Cargando...</p>;  // Mientras carga, mostramos un mensaje

  if (!producto) return <p>Producto no encontrado.</p>;  // Si no encontramos el producto, mostramos un mensaje

  return (
    <div className="item-detail-container">
      <h2>{producto.name}</h2>
      <p>{producto.description}</p>
      <p>Precio: ${producto.price}</p>
      <p>Stock disponible: {producto.stock}</p>

      <img src={producto.img} alt={producto.name} className="item-detail-image" />

      <ItemCount
        stock={producto.stock}
        onAdd={addToCartHandler}  // Llamamos a la función para agregar al carrito
      />
    </div>
  );
};

export default ItemDetailContainer;
