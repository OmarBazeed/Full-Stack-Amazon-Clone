import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import { Checkout } from "./components/Checkout";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Prime from "./components/Prime";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/prime" element={<Prime />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="*"
          element={
            <h1 className="text-red-900 text-center animate-bounce mt-4 shadow-2xl w-full font-veryBold ">
              Page Not Found
            </h1>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
