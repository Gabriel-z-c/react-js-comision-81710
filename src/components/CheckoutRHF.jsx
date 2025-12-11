import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext'; // Importamos el contexto del carrito
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './services/firebase'; // Asegúrate de tener bien configurado Firestore
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import { useForm } from 'react-hook-form';

const CheckoutRHF = () => {
  const [loading, setLoading] = useState(false);  // Estado para manejar la carga
  const [orderId, setOrderId] = useState(null);  // Estado para guardar el ID de la orden
  const { cart, total, clear } = useContext(CartContext); // Obtenemos el carrito, total y la función clear desde el contexto
  const { register, handleSubmit, formState: { errors }, getValues } = useForm(); // Usamos react-hook-form para manejar el formulario

  console.log(errors, 'errors'); // Imprimir errores para depuración

  // Función para finalizar la compra
  const finalizarCompra = (dataForm) => {
    setLoading(true);  // Empezamos el proceso de carga

    // Creamos el objeto de la orden
    let order = {
      comprador: {
        name: dataForm.name,
        lastname: dataForm.lastname,
        address: dataForm.address,
        email: dataForm.email,
      },
      compras: cart,
      total: total(),  // Usamos la función total del contexto para obtener el total
      fecha: serverTimestamp(),  // Timestamp de la compra
    };

    // Referencia a la colección de "orders" en Firestore
    const ventas = collection(db, 'orders');

    // Guardamos la orden en Firestore
    addDoc(ventas, order)
      .then((res) => {
        setOrderId(res.id); // Establecemos el ID de la orden
        clear(); // Limpiamos el carrito
      })
      .catch((error) => console.log(error))  // Manejamos cualquier error
      .finally(() => setLoading(false));  // Terminamos el proceso de carga
  };

  // Si no hay productos en el carrito y no se ha generado una orden, mostramos un mensaje
  if (!cart.length && !orderId) {
    return <EmptyCart />;
  }

  return (
    <>
      {
        orderId ? (
          <div>
            <h2>Muchas gracias por su compra</h2>
            <h4>Su orden es: {orderId}</h4>
            <Link className="btn btn-dark" to="/">Volver a Home</Link>
          </div>
        ) : (
          <div>
            <h1>Complete con sus datos</h1>
            <form className="p-4 border rounded shadow-sm bg-light" onSubmit={handleSubmit(finalizarCompra)}>
              {/* Nombre */}
              <input 
                className="form-control" 
                name="name" 
                type="text" 
                placeholder="Ingresa tu nombre" 
                {...register("name", { required: true, minLength: 3 })} 
              />
              {errors?.name?.type === "required" && <span style={{ color: 'red', fontWeight: 'bold' }}>El nombre es requerido</span>}
              {errors?.name?.type === "minLength" && <span style={{ color: 'red', fontWeight: 'bold' }}>El nombre debe contener mínimamente 3 caracteres</span>}
              
              {/* Apellido */}
              <input 
                className="form-control" 
                name="lastname" 
                type="text" 
                placeholder="Ingresa tu apellido" 
                {...register("lastname", { required: true, minLength: 2 })} 
              />
              {errors?.lastname?.type === "required" && <span style={{ color: 'red', fontWeight: 'bold' }}>El apellido es requerido</span>}
              {errors?.lastname?.type === "minLength" && <span style={{ color: 'red', fontWeight: 'bold' }}>El apellido debe contener mínimo 2 caracteres</span>}
              
              {/* Dirección */}
              <input 
                className="form-control" 
                name="address" 
                type="text" 
                placeholder="Ingresa su dirección" 
                {...register("address", { required: true, minLength: 9, maxLength: 30 })} 
              />
              {errors?.address?.type === "required" && <span style={{ color: 'red', fontWeight: 'bold' }}>La dirección es un campo requerido</span>}
              {errors?.address?.type === "minLength" && <span style={{ color: 'red', fontWeight: 'bold' }}>La dirección debe contener mínimo 9 caracteres</span>}
              {errors?.address?.type === "maxLength" && <span style={{ color: 'red', fontWeight: 'bold' }}>La dirección es demasiado larga</span>}
              
              {/* Correo */}
              <input 
                className="form-control" 
                name="email" 
                type="email" 
                placeholder="Ingresa tu correo" 
                {...register("email", { required: true })} 
              />
              {errors?.email?.type === "required" && <span style={{ color: 'red', fontWeight: 'bold' }}>Por favor complete el campo mail</span>}

              {/* Repetir correo */}
              <input 
                className="form-control" 
                name="secondemail" 
                type="email" 
                placeholder="Repetí tu correo" 
                {...register("secondemail", { required: true, validate: { equalsMails: (mail2) => mail2 === getValues().email } })} 
              />
              {errors?.secondemail?.type === "required" && <span style={{ color: 'red', fontWeight: 'bold' }}>Por favor complete el campo</span>}
              {errors?.secondemail?.type === "equalsMails" && <span style={{ color: 'red', fontWeight: 'bold' }}>Los correos no coinciden</span>}
              
              {/* Botón de enviar */}
              <button 
                type="submit" 
                className="btn btn-success" 
                disabled={loading}
              >
                {loading ? 'Procesando compra...' : 'Completar Compra'}
              </button>
            </form>
          </div>
        )
      }
    </>
  );
};

export default CheckoutRHF;