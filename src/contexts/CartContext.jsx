import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto del carrito
export const CartContext = createContext();

// Usamos el hook para acceder al contexto del carrito
export const useCart = () => useContext(CartContext);

// El proveedor del contexto que envuelve a todos los componentes hijos
export const CartProvider = ({ children }) => {
  // Definimos la constante para obtener el carrito guardado en localStorage
  const getSavedCart = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  // Inicializamos el estado con la constante
  const [cart, setCart] = useState(getSavedCart);

  useEffect(() => {
    // Guardamos el carrito actualizado en el localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: product.quantity }];
      }
    });
  };

  // Función para calcular la cantidad total de productos en el carrito
  const cartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, cartQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};