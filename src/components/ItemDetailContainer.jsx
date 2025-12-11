// src/components/ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './services/firebase';  // Asegúrate de importar correctamente tu instancia de Firebase
import ItemDetail from './ItemDetail';  // Componente que muestra los detalles del producto
import LoaderComponent from './LoaderComponent';  // Componente de carga

const ItemDetailContainer = () => {
  const { id } = useParams();  // Obtenemos el ID del producto desde la URL
  const [detalle, setDetalle] = useState(null);  // Para almacenar los detalles del producto
  const [cargando, setCargando] = useState(true);  // Para manejar el estado de carga
  const [invalid, setInvalid] = useState(false);  // Para verificar si el producto es inválido
  const [error, setError] = useState(null);  // Para manejar errores generales

  useEffect(() => {
    setCargando(true);  // Empezamos el proceso de carga
    const docRef = doc(db, "productos", id);  // Creamos la referencia al documento del producto

    // Traemos el documento desde Firebase
    getDoc(docRef)
      .then((res) => {
        if (res.exists()) {
          // Si el producto existe, lo almacenamos en el estado
          setDetalle({ id: res.id, ...res.data() });
        } else {
          // Si no existe, marcamos el estado como inválido
          setInvalid(true);
        }
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
        setError("Hubo un problema al cargar el producto. Intenta nuevamente.");  // Manejo de error
      })
      .finally(() => {
        setCargando(false);  // Finalizamos la carga, independientemente de si el producto existe o no
      });
  }, [id]);  // El efecto depende del ID del producto en la URL

  if (cargando) return <LoaderComponent />;  // Muestra el LoaderComponent mientras cargamos los datos

  if (error) {
    // Si hay un error al cargar el producto
    return (
      <div>
        <h1>{error}</h1>
        <Link className="btn btn-dark" to="/">
          Volver a Home
        </Link>
      </div>
    );
  }

  if (invalid) {
    // Si el producto no existe, mostramos un mensaje de error
    return (
      <div>
        <h1>El producto no existe! 😱</h1>
        <Link className="btn btn-dark" to="/">
          Volver a Home
        </Link>
      </div>
    );
  }

  // Si el producto existe, mostramos el detalle del producto
  return <ItemDetail detalle={detalle} />;
};

export default ItemDetailContainer;
