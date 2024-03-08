import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContextProvider>
      <Header id="main-header" />
      <Menu />
    </CartContextProvider>
  );
}

export default App;
