import React, { useContext } from "react";
import AdImage from "../assests/adImage.jpg";
import { GlobalContext } from "../context/GlobalState";
import CartProduct from "./CartProduct";
import Subtotal from "./Subtotal";

const Cart = () => {
  const { user, basket } = useContext(GlobalContext);
  return (
    <div className="w-full flex px-4 max-[768px]:flex-wrap ">
      <div className="flex-3">
        <img src={AdImage} alt="..." />
        <p className="my-4">
          Hello , <strong> {user && user.email} </strong>
        </p>
        <hr />
        <div className="cardItems space-y-8 mt-8">
          {basket.length === 0 ? (
            <p className="text-red-600 font-bold text-xl animate-bounce shadow-lg w-fit bg-green-200 rounded-xl p-4">
              There Are No Items
            </p>
          ) : (
            basket.map(({ id, title, rating, price, image }, i) => (
              <CartProduct
                key={Math.random()}
                title={title}
                rating={rating}
                price={price}
                image={image}
                id={id}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex-2 min-w-[250px] bg-[#F3F3F3] h-fit p-3">
        <Subtotal />
      </div>
    </div>
  );
};

export default Cart;
