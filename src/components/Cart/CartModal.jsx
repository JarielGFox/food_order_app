import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import FormAction from "../Checkout/Checkout";

const CartModal = forwardRef(function Modal(
  { title, actions, isCheckout },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      //metodo per mostrare la modale
      open: () => {
        dialog.current.showModal();
      },
      //metodo per chiudere la modale
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <h2 className="modal-title">{title}</h2>
      {/* se il checkout è attivo mostriamo il form */}
      {isCheckout ? <FormAction /> : <Cart />}
      <form className="modal-actions" method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
