// src/components/LoaderComponent.jsx
import React from 'react';
import { Spinner } from 'react-bootstrap';  // Importamos el Spinner de React-Bootstrap

const LoaderComponent = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '85vh',  // Ajusta el alto de la vista mientras se carga
        display: 'flex',
        justifyContent: 'center',  // Centrado horizontal
        alignItems: 'center',  // Centrado vertical
      }}
    >
      {/* Spinner de carga */}
      <Spinner animation="grow" variant="dark" />
    </div>
  );
};

export default LoaderComponent;
