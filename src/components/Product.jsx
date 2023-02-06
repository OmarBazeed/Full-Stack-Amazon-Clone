import React, { useContext } from "react";
import imageIcon from "../assests/star.png";
import { GlobalContext } from "../context/GlobalState";

const Product = ({ id, title, rating, price, image }) => {
  const { dispatch } = useContext(GlobalContext);
  const handleAdd = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: id,
        title: title,
        rating: rating,
        price: price,
        image: image,
      },
    });
  };
  return (
    <div className="border border-gray-500 p-5 flex-1 min-w-[300px] hover:scale-105 transition-all duration-700 bg-white mt-4 hover:bg-black hover:text-white">
      <p className="text-[15px] h-[90px] overflow-hidden">{title}</p>
      <p className="my-4">
        $ <strong> {price}</strong>
      </p>
      <div className="flex my-1 flex-wrap">
        {Array(rating)
          .fill()
          .map((el, i) => (
            <img
              key={Math.random()}
              src={imageIcon}
              alt="..."
              className="w-8 h-8"
            />
          ))}
      </div>
      <img
        src={image}
        alt="..."
        className="w-48 h-48 mx-auto block my-3 max-w-full hover:scale-110 transition-all duration-700 "
      />
      <button
        className="border border-gray-400 bg-[#FFC107] w-8 whitespace-nowrap overflow-hidden rounded-md mx-auto block mt-8 transition-all duration-700 hover:w-fit hover:px-1 shadow-md shadow-gray-400"
        onClick={handleAdd}
      >
        Add To Busket
      </button>
    </div>
  );
};

export default Product;
