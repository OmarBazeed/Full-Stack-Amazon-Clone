import React, { useContext } from "react";
import moment from "moment";
import CartProduct from "./CartProduct";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
  return (
    <div className="my-2">
      <h2 className=" font-bold text-lg  capitalize bg-transparent border border-slate-400 w-fit mx-auto p-3 rounded-3xl -tracking-tighter mb-2">
        order
      </h2>
      <div className="flex items-center justify-between mb-4 max-[425px]:text-[12px]">
        <p className="bg-slate-500 p-2 text-white rounded-2xl shadow-md">
          {moment
            .unix(order.data.created)
            .format("DD - MM - YYYY --  hh:mm:ss")}
        </p>
        <p className="bg-slate-500 p-2 text-white rounded-2xl shadow-md">
          <small>{order.id}</small>
        </p>
      </div>
      <div className="space-y-8">
        {order.data.basket.map((item) => (
          <CartProduct
            key={item.id}
            id={item.id}
            price={item.price}
            image={item.image}
            rating={item.rating}
            title={item.title}
            hidden
          />
        ))}
      </div>
      <p className="text-right mr-6">
        <CurrencyFormat
          prefix={"$"}
          thousandSeparator={true}
          value={order.data.amount}
          renderText={(value) => (
            <p className="text-slate-500">
              Order total : <strong className="text-black">{value}</strong>
            </p>
          )}
          displayType={"text"}
          decimalScale={2}
        />
      </p>
      <hr className="my-4" />
    </div>
  );
};

export default Order;
