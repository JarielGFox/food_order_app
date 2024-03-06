//il context va sempre prima creato con createContext
import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  //mi è utile per il completamento automatico, è un segnaposto
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

export default function CartContextProvider({ children }) {
  //inizializziamo il reducer, la seconda funzione di reducer sarà il dispatcher e ci serve anche una funzione di riduttore
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(meal) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: meal,
    });
  }

  //funzione per aggiornare la quantità
  function handleUpdateCartItemQuantity(id, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        id,
        amount,
      },
    });
  }

  function shoppingCartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
      const updatedItems = [...state.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const newItem = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
        };
        updatedItems.push(newItem);
      }

      return {
        ...state,
        items: updatedItems,
      };
      //qui usiamo un'action diversa
    } else if (action.type === "UPDATE_ITEM") {
      const updatedItems = state.items.reduce((acc, item) => {
        const newItem = {
          ...item,
        };
        if (item.id === action.payload.id) {
          const newQuantity = item.quantity + action.payload.amount;
          newItem.quantity = newQuantity < 0 ? 0 : newQuantity;
        }
        if (newItem.quantity > 0) {
          acc.push(newItem);
          return acc;
        }
        return acc;
      }, []);
      return {
        ...state,
        items: updatedItems,
      };
    }

    return state;
  }

  const ctxValue = {
    items: shoppingCartState.items,
    //dichiaro una funzione e la uso come valore ad addItemToCart
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}> {children} </CartContext.Provider>
  );
}
