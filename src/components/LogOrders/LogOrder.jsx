import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../store/shopping-cart-context.jsx";

const LogOrder = () => {
  //recuperiamo i dati dal context
  const { items } = useContext(CartContext);
  //Stato per recuperare gli ordini
  const [orders, setOrders] = useState([]);
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

  //capire perchè il deleteHistory NON funziona
  const deleteHistory = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders/clear", {
        method: "DELETE",
        headers: {
          data: JSON.stringify({ action: "clear" }),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "clear",
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      throw new Error("Something went wrong while deleting history");
    }
  };

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await fetch("http://localhost:3000/orders");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        throw new Error("Something went wrong while retrieving orders");
      }
    }
    getOrders();
  }, []);

  return (
    <div>
      <button onClick={deleteHistory} className="button-clear">
        Delete History
      </button>
      <h1>Customer Data</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <h2>Order ID: {order.id}</h2>
          <p>Name: {order.customer.name}</p>
          <p>Email: {order.customer.email}</p>
          <p>Address: {order.customer.address}</p>
          <p>Phone: {order.customer.phone}</p>
          <p>Zip: {order.customer.zip}</p>
          <p>City: {order.customer.city}</p>
          <h3>Items Ordered:</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LogOrder;
