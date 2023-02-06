import React, { useContext } from "react";
import CurrencyFormat from "react-currency-format";
import { GlobalContext } from "../context/GlobalState";
import { getBasketTotal } from "../context/AppReducer";
import { useNavigate } from "react-router-dom";
const Subtotal = () => {
  const navigate = useNavigate();
  const { basket } = useContext(GlobalContext);
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <React.Fragment>
      <CurrencyFormat
        prefix={"$"}
        thousandSeparator={true}
        value={getBasketTotal(basket)}
        renderText={(value) => (
          <p>
            Subtotal ({basket.length} Items) : <strong>{value}</strong>
          </p>
        )}
        displayType={"text"}
        decimalScale={2}
      />
      <div className="flex items-center mt-2">
        <input type="checkbox" name="check" className="mr-2" />
        <p className="text-[12px]"> This order contains a gift</p>
      </div>
      <button
        className="border border-gray-400 bg-[#F0C14B] w-full my-3"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
    </React.Fragment>
  );
};

export default Subtotal;
