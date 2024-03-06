import { CartContext } from "../../store/shopping-cart-context";
import { useContext } from "react";

const Card = ({ meal }) => {
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <h3>{meal.name}</h3>
        <div className="meal-item-price">${meal.price}</div>
        <p className="meal-item-description">{meal.description}</p>
        <button
          className="meal-item-actions"
          onClick={() => addItemToCart(meal)}
        >
          Add to Cart
        </button>
      </article>
    </div>
  );
};

export default Card;
