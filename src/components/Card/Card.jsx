import { CartContext } from "../../store/shopping-cart-context";
import { useContext } from "react";

const Card = ({ meal }) => {
  const { items, addItemToCart, updateItemQuantity } = useContext(CartContext);
  const cartQuantity = items.find((item) => item.id === meal.id)?.quantity || 0;

  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <h3>{meal.name}</h3>
        <div className="meal-item-price">${meal.price}</div>
        <p className="meal-item-description">{meal.description}</p>
        <div>
          <button className="button" onClick={() => addItemToCart(meal)}>
            Add to Cart {cartQuantity > 0 && `(${cartQuantity})`}
          </button>

          {/* mettere i bottoni in flex così non si sminchia il layout */}
          {cartQuantity > 0 && (
            <button
              className="button-clear"
              onClick={() => updateItemQuantity(meal.id, -1)}
            >
              X
            </button>
          )}
        </div>
      </article>
    </div>
  );
};

export default Card;
