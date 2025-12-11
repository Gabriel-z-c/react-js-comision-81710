function CartWidget({ cart = [] }) {
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span role="img" aria-label="carrito">🛒</span>
      <span style={{ marginLeft: "8px" }}>
        {totalItems} productos
      </span>
    </div>
  );
}

export default CartWidget;
