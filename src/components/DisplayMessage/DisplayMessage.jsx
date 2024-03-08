const DisplayMessage = ({ message }) => {
  return (
    <div id="modal-message">
      <p
        className={
          message === "Your order has been submitted!"
            ? "success-message"
            : "error-message"
        }
      >
        {message}
      </p>
    </div>
  );
};

export default DisplayMessage;
