import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from "./contexts/ShopContext.jsx";
import CartContextProvider from './contexts/CartContext.jsx';

createRoot(document.getElementById("root")).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ShopContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ShopContextProvider>
  </BrowserRouter>
);