import React, { useContext } from "react";
import moment from "moment";
import CartProduct from "./CartProduct";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
  return (
    <div className="my-2">
      <h2 className=" font-bold text-lg  capitalize bg-indigo-200 w-fit mx-auto p-3 rounded-3xl">
        order
      </h2>
      <p>{moment.unix(order.data.created).format("DD MM YYYY hh:mm:ss")}</p>
      <p className="text-right">
        <small>{order.id}</small>
      </p>
      <div>
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
      <p className="text-center">
        <CurrencyFormat
          prefix={"$"}
          thousandSeparator={true}
          value={order.data.amount}
          renderText={(value) => (
            <p>
              Order total : <strong>{value}</strong>
            </p>
          )}
          displayType={"text"}
          decimalScale={2}
        />
      </p>
    </div>
  );
};

export default Order;
