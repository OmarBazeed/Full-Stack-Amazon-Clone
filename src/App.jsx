import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import { Checkout } from "./components/Checkout";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Prime from "./components/Prime";
import { GlobalContext } from "./context/GlobalState";

const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51MYXyaAjNt0UgB6McGDIJqOcDcgqnLgy1zGJo5KKxKq2TH7kdA111KH3T8ORrDeQmzM4Aah8g2AeuAOgumooDWql00QVXlnuw6"
  );
  const { user } = useContext(GlobalContext);
  return (
    <div className="relative">
      <Header />

      <div
        className={`absolute top-[72px] w-full ${
          user ? "max-[500px]:top-[143px]" : "max-[500px]:top-[119px]"
        } `}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/prime" element={<Prime />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <React.Fragment>
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
              </React.Fragment>
            }
          />
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
    </div>
  );
};

export default App;
