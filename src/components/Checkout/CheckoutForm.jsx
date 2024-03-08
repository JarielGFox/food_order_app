import DisplayMessage from "../DisplayMessage/DisplayMessage";

const CheckoutForm = ({
  orderData,
  messageData,
  errors,
  handleChange,
  handleSubmit,
  handleReset,
  formattedTotalPrice,
}) => {
  //Todo mercoledì:
  //checkout rimane il checkout ed il form rimane il form. SE l'ordine va a buon fine o no, restituisco invece del form un altro componente che è display message con messaggio di successo o di errore

  return (
    <form onSubmit={handleSubmit} className="control">
      <h2 className="cart-final-total">Total: {formattedTotalPrice}</h2>
      <div className="control-row">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={orderData.order.customer.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="control-row">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={orderData.order.customer.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="control-row">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter your full Address"
          value={orderData.order.customer.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="control-row">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={orderData.order.customer.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="control-row">
        <label htmlFor="zip">Zip code</label>
        <input
          type="number"
          name="zip"
          placeholder="Zip code"
          value={orderData.order.customer.zip}
          onChange={handleChange}
          required
        />
      </div>

      <div className="control-row">
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={orderData.order.customer.city}
          onChange={handleChange}
          required
        />
      </div>

      {Object.keys(errors).map((key) => (
        <p key={key} style={{ color: "red" }}>
          {errors[key]}
        </p>
      ))}

      <div className="control-row">
        <button className="button" onClick={handleSubmit} type="submit">
          Submit Order
        </button>

        <button className="button" onClick={handleReset} type="reset">
          Clear Form
        </button>
      </div>
      {messageData ? (
        <DisplayMessage
          error={messageData.error}
          message={messageData.message}
        />
      ) : null}
    </form>
  );
};

export default CheckoutForm;
