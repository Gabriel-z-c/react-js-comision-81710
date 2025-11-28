import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { addOrderToFirestore } from "../components/services/firebase";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(""); // Estado para errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetear error

    // Validación simple
    if (!name || !email || !address) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    const orderDetails = {
      customer: { name, email, address },
      products: cart,
      total: cart.reduce((sum, product) => sum + product.price * product.quantity, 0),
      date: new Date(),
    };

    try {
      const orderId = await addOrderToFirestore(orderDetails);
      setOrderId(orderId);
      clearCart();
    } catch (error) {
      setError("Hubo un problema al procesar tu compra");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return <p>Compra realizada con éxito. Tu ID de orden es: {orderId}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}
      <button type="submit" disabled={loading}>Confirmar compra</button>
    </form>
  );
};

export default Checkout;
