import { useState } from "react";
import { CartContext } from "../../store/shopping-cart-context.jsx";
import { useContext } from "react";
import CheckoutForm from "./CheckoutForm.jsx";

const FormAction = () => {
  const { items } = useContext(CartContext);

  //calcolo del totale che viene preso dal context
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  //State per il messaggio di conferma dell'ordine
  const [messageData, setMessageData] = useState(null);

  //Stato per la gestione della validazione front-end
  const [errors, setErrors] = useState({});

  //Stato per dati del form da passare al backend
  const [orderData, setOrderData] = useState({
    order: {
      items: [...items],
      customer: {
        name: "",
        email: "",
        address: "",
        phone: "",
        zip: "",
        city: "",
      },
    },
  });

  //funzione per l'onChange
  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderData((prevState) => ({
      ...prevState,
      order: {
        ...prevState.order,
        customer: {
          ...prevState.order.customer,
          [name]: value,
        },
      },
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!orderData.order.customer.name.trim()) {
      formIsValid = false;
      errors["name"] = "Name is required.";
    }

    if (!orderData.order.customer.email.includes("@")) {
      formIsValid = false;
      errors["email"] = "Email is invalid. Please enter a valid email.";
    }

    if (!orderData.order.customer.address.trim()) {
      formIsValid = false;
      errors["address"] =
        "Address is required. Where are we going to deliver your food otherwise??";
    }
    if (!orderData.order.customer.phone.trim()) {
      formIsValid = false;
      errors["phone"] = "Phone is required.";
    }

    if (!orderData.order.customer.zip.trim()) {
      formIsValid = false;
      errors["zip"] = "Zipcode is required.";
    }

    if (!orderData.order.customer.city.trim()) {
      formIsValid = false;
      errors["city"] = "City is required.";
    }

    setErrors(errors);
    return formIsValid;
  };

  //funzione per il reset degli input
  const handleReset = () => {
    setOrderData({
      order: {
        items: [...items],
        customer: {
          name: "",
          email: "",
          address: "",
          phone: "",
          zip: "",
          city: "",
        },
      },
    });
  };

  //funzione per il submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      //Se la validazione fallisce, restituiamo l'errore ed usciamo dallo submit
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the order submission.");
      }
      setMessageData({ message: "Your order has been submitted!" });
    } catch (error) {
      setMessageData({ message: error.message });
    }
  };

  return (
    <CheckoutForm
      orderData={orderData}
      messageData={messageData}
      formattedTotalPrice={formattedTotalPrice}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
    />
  );
};

export default FormAction;
