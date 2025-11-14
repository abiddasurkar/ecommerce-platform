import React, { useState } from "react";
import ProductList from "./components/ProductList";
import AdminPanel from "./components/AdminPanel";
import UserAuth from "./components/UserAuth";
import Layout from "./layout/Layout";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

function App() {
  const [currentView, setCurrentView] = useState("products");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "products":
        return <ProductList />;
      case "admin":
        return <AdminPanel />;
      case "auth":
        return <UserAuth />;
      default:
        return <ProductList />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Layout
            currentView={currentView}
            setCurrentView={setCurrentView}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          >
            {renderView()}
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;