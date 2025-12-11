import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const CartWidgetRI = () => {
  const { cartQuantity } = useContext(CartContext); // Obtiene la cantidad del carrito

  return (
    <div className="cart-widget-container">
      <div className="cart-icon-container">
        <FaShoppingCart fontSize={"1.3rem"} />
        {cartQuantity() > 0 && (
          <Badge pill bg="danger" className="cart-badge">
            {cartQuantity()}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CartWidgetRI;
