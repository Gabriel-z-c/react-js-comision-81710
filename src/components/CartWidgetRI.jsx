import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";  // Usamos el contexto del carrito

const CartWidgetRI = () => {
  const { cartQuantity, cart } = useContext(CartContext);  // Accedemos al carrito y la función cartQuantity

  return (
    <>
      <FaShoppingCart fontSize={"1.3rem"} />
      {/* Solo mostramos el Badge si hay productos en el carrito */}
      {cart.length > 0 && <Badge pill bg="danger">{cartQuantity()}</Badge>}
    </>
  );
};

export default CartWidgetRI;
