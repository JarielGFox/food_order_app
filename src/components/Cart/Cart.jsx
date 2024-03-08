import { CartContext } from "../../store/shopping-cart-context.jsx";
import { useContext } from "react";

export default function Cart() {
  //al suo interno ci sarà una proprietà chiamata items che ci siamo dichiarati nel context
  const { items, updateItemQuantity } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  const handleResetCart = () => {
    //per resettare il carrello, facciamo un forEach su tutti gli oggetti nell'array
    //per ogni item, chiamiamo la funzione updateItemQuantity con item.id, -item.quantity
    items.forEach((item) => {
      updateItemQuantity(item.id, -item.quantity);
    });
  };

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
      {items.length > 0 && (
        <button onClick={handleResetCart} className="button-clear">
          Clear Cart
        </button>
      )}
    </div>
  );
}
