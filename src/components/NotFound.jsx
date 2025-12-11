// src/components/NotFound.jsx
import React from 'react';

const NotFound = ({ message }) => {
  return (
    <div>
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
};

export default NotFound;
