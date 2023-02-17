import React, { useContext, useRef } from "react";
import Swal from "sweetalert2";
import StartImage from "../assests/star.png";
import { GlobalContext } from "../context/GlobalState";

const CartProduct = ({ id, title, rating, price, image, hidden }) => {
  const { dispatch } = useContext(GlobalContext);
  const removedDiv = useRef();
  const handleRemove = () => {
    removedDiv.current.style.animation = "fadeOutLeftBig 1 1s  linear both";
    setTimeout(() => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: id,
      });
    }, 1000);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: "One Item Deleted",
    });
  };

  return (
    <div className="flex items-start max-[570px]:flex-wrap" ref={removedDiv}>
      <div className="mr-3">
        <img src={image} alt="..." className="w-96 h-64 mx-auto block my-3" />
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
        {!hidden && (
          <button
            className="border border-gray-400 bg-[#FFC107] mt-8 rounded-lg p-2"
            onClick={handleRemove}
          >
            Remove From Basket
          </button>
        )}
      </div>
    </div>
  );
};

export default CartProduct;
