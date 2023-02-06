import React, { useContext } from "react";
import StartImage from "../assests/star.png";
import { GlobalContext } from "../context/GlobalState";

const CartProduct = ({ id, title, rating, price, image }) => {
  const { dispatch } = useContext(GlobalContext);
  const handleRemove = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };
  return (
    <div className="flex items-start">
      <div className="mr-3">
        <img src={image} alt="..." className="w-96 h-64 mx-auto block my-3 " />
      </div>
      <div>
        <p>
          <strong>{title}</strong>
        </p>
        <p className="mt-4">
          $ <strong>{price}</strong>
        </p>
        <div className="flex mt-4">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <img
                src={StartImage}
                alt="starImage"
                key={Math.random()}
                className="w-8 h-8"
              />
            ))}
        </div>
        <button
          className="border border-gray-400 bg-[#FFC107] mt-8 rounded-lg p-2"
          onClick={handleRemove}
        >
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
