import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';  // Accedemos al carrito desde el contexto
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'; // Firestore
import { db } from './services/firebase';  // Asegúrate de que tu Firebase esté bien configurado
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';  // Si no hay productos, muestra un mensaje

const Checkout = () => {
  const { cart, total, clear } = useCart();  // Obtenemos el carrito, el total y la función para limpiar el carrito
  const [buyer, setBuyer] = useState({ name: '', lastname: '', email: '', address: '' });  // Datos del comprador
  const [secondMail, setSecondMail] = useState('');  // Correo para confirmar
  const [error, setError] = useState(null);  // Manejo de errores
  const [orderId, setOrderId] = useState(null);  // ID de la orden generada

  // Maneja la actualización de los datos del comprador
  const handleInputChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  // Finaliza la compra
  const finalizarCompra = (e) => {
    e.preventDefault();  // Evitamos el comportamiento predeterminado del formulario
    if (!buyer.name || !buyer.lastname || !buyer.email || !buyer.address) {
      setError('Todos los campos son obligatorios');
    } else if (buyer.email !== secondMail) {
      setError('Los correos no coinciden');
    } else {
      setError(null);  // Limpiamos cualquier error previo

      const order = {
        comprador: buyer,
        compras: cart,
        total: total(),  // Calculamos el total desde el contexto
        fecha: serverTimestamp(),  // Usamos Firestore para agregar la fecha actual
      };

      const ventas = collection(db, 'orders');  // Refiere a la colección "orders" en Firestore

      // Guardamos la orden en Firestore
      addDoc(ventas, order)
        .then((res) => {
          setOrderId(res.id);  // Establecemos el ID de la orden
          clear();  // Limpiamos el carrito
        })
        .catch((error) => console.log(error));
    }
  };

  // Si el carrito está vacío y no se ha creado una orden, mostramos un mensaje
  if (!cart.length && !orderId) {
    return <EmptyCart />;
  }

  return (
    <>
      {orderId ? (
        <div>
          <h2>Muchas gracias por su compra</h2>
          <h4>Su orden es: {orderId}</h4>
          <Link className="btn btn-dark" to="/">
            Volver a Home
          </Link>
        </div>
      ) : (
        <div>
          <h1>Complete con sus datos</h1>
          {error && <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>}
          <form className="p-4 border rounded shadow-sm bg-light" onSubmit={finalizarCompra}>
            <input
              className="form-control"
              name="name"
              type="text"
              placeholder="Ingresa tu nombre"
              value={buyer.name}
              onChange={handleInputChange}
            />
            <input
              className="form-control"
              name="lastname"
              type="text"
              placeholder="Ingresa tu apellido"
              value={buyer.lastname}
              onChange={handleInputChange}
            />
            <input
              className="form-control"
              name="address"
              type="text"
              placeholder="Ingresa su dirección"
              value={buyer.address}
              onChange={handleInputChange}
            />
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Ingresa tu correo"
              value={buyer.email}
              onChange={handleInputChange}
            />
            <input
              className="form-control"
              name="secondmail"
              type="email"
              placeholder="Repite tu correo"
              value={secondMail}
              onChange={(e) => setSecondMail(e.target.value)}
            />
            <button type="submit" className="btn btn-success">
              Completar Compra
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Checkout;
