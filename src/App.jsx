import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Menu />
    </CartContextProvider>
  );
}

export default App;
