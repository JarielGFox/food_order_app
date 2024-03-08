import { useRef, useState } from "react";
import { CartContext } from "../../store/shopping-cart-context.jsx";
import { useContext } from "react";
import CartModal from "../Cart/CartModal.jsx";
import LogModal from "../LogOrders/LogModal.jsx";

export default function Header() {
  //Bottone di chiusura modale
  let modalActions = <button className="button-close">Close</button>;
  //proprietà items che ci siamo dichiarati nel context
  const { items } = useContext(CartContext);

  //Ref per la modale del carrello
  const modal = useRef();
  //Ref per la modale degli ordini
  const modalLogs = useRef();

  //State per il checkout:
  const [isCheckout, setIsCheckout] = useState(false);

  const cartQuantity = items.length;

  //funzione per aprire modale carrello
  function handleOpenCartClick() {
    modal.current.open();
  }

  //funzione per chiudere modale carrello
  function closeModal() {
    modal.current.close();
    setIsCheckout(false);
  }

  //funzione per andare al checkout
  function goToCheckOut(event) {
    event.preventDefault();
    setIsCheckout(true);
  }

  if (cartQuantity > 0) {
    modalActions = (
      <>
        {isCheckout ? null : (
          <button className="button" onClick={goToCheckOut}>
            Checkout
          </button>
        )}
        <button className="button-close" onClick={closeModal}>
          Close
        </button>
      </>
    );
  }

  //funzione per aprire modale history
  function openModalHistory() {
    modalLogs.current.open();
  }

  //funzione per chiudere modale history
  function closeModalHistory() {
    modalLogs.current.close();
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
        isCheckout={isCheckout}
      />

      <LogModal ref={modalLogs} title="Your History" actions={modalActions} />
      <header id="main-header">
        <div id="title">
          <img src="logo.jpg" alt="React Food" />
          <h1>React Food</h1>
        </div>
        <p>
          <button className="button" onClick={handleOpenCartClick}>
            Cart ({cartQuantity})
          </button>
          <button onClick={openModalHistory} className="button-history">
            History
          </button>
        </p>
      </header>
    </>
  );
}
