import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import LogOrder from "./LogOrder";

const LogModal = forwardRef(function ModalHistory({ title, actions }, ref) {
  const dialoghina = useRef();

  //con useImperativeHandle passiamo la funzione ref per aprire o chiudere la modale
  useImperativeHandle(ref, () => {
    return {
      //mostro modale
      open() {
        dialoghina.current.showModal();
      },
      //chiudo modale
      close() {
        dialoghina.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialoghina}>
      <h2 className="modal-title">{title}</h2>
      <LogOrder />
      <form className="modal-actions" method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default LogModal;
