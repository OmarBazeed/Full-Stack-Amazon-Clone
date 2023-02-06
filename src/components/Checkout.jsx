import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { getBasketTotal } from "../context/AppReducer";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";

import CurrencyFormat from "react-currency-format";
import { CardElement } from "@stripe/react-stripe-js";
export const Checkout = () => {
  const { basket } = useContext(GlobalContext);

  return (
    <div className="p-6">
      <p className="bg-[#EAEDED] text-[22px] text-center p-3">
        Checkout (
        <Link to="/cart">
          <span className="text-purple-700"> {basket.length} items </span>
        </Link>
        )
      </p>
      <p className="font-bold text-xl py-3">
        Deliver Adress
        <span className="font-normal text-sm ml-4"> Alexandria , Egypt</span>
      </p>
      <hr />
      <div className="font-bold text-xl py-3 flex items-center justify-between">
        <p className="flex-2 min-w-fit"> Review items and delivery</p>
        <div className="flex-3 ml-4 font-normal text-sm space-y-4">
          {basket.map(({ id, price, rating, image, title }) => (
            <CartProduct
              id={id}
              price={price}
              rating={rating}
              title={title}
              image={image}
            />
          ))}
        </div>
      </div>
      <hr />

      <div className="font-bold text-xl py-3 flex">
        <p className="flex-2 min-w-fit">Payment Method</p>
        <form className="font-normal ml-4 w-full flex-3">
          <CardElement />
          <div className="font-bold my-3">
            <CurrencyFormat
              prefix={"$"}
              thousandSeparator={true}
              value={getBasketTotal(basket)}
              renderText={(value) => <p> Order Total : {value}</p>}
              displayType={"text"}
              decimalScale={2}
            />
          </div>
          <button className="border border-gray-400 bg-[#F0C14B] w-full my-3">
            Buy Now
          </button>
        </form>
      </div>
      <hr />
    </div>
  );
};
