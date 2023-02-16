import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { getBasketTotal } from "../context/AppReducer";
import { Link, useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";
import CurrencyFormat from "react-currency-format";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import swal from "sweetalert";

export const Checkout = () => {
  const { user, dispatch, basket } = useContext(GlobalContext);
  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  //-1
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [basket]);

  //-2
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(error ? error.message : "");
  };

  //-3
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!user) {
      const error = await swal("Oops!", "Please Sign In First!", "error");
      error && navigate("/login");
    }

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // Creating Database Using Firebase Methods doc() , setDoc() After The Request Successeded
        const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(ref, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };

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
      <div className="font-bold text-xl py-3 flex max-[768px]:flex-wrap items-center justify-between">
        <p className="flex-2 min-w-fit"> Review items and delivery</p>
        <div className="flex-3 ml-4 font-normal text-sm space-y-4">
          {basket.map(({ id, price, rating, image, title }) => (
            <CartProduct
              id={id}
              price={price}
              rating={rating}
              title={title}
              image={image}
              key={id}
            />
          ))}
        </div>
      </div>
      <hr />

      <div className="font-bold text-xl py-3 flex max-[425px]:flex-wrap">
        <p className="flex-2 min-w-fit">Payment Method</p>
        <form
          onSubmit={handleSubmit}
          className="font-normal ml-4 w-full flex-3"
        >
          <CardElement onChange={handleChange} />
          <div className="font-bold my-3">
            <CurrencyFormat
              prefix={"$"}
              thousandSeparator={true}
              value={getBasketTotal(basket)}
              renderText={(value) => <p> Order Total : {value} </p>}
              displayType={"text"}
              decimalScale={2}
            />
          </div>
          <button
            type="submit"
            className="border border-gray-400 bg-[#F0C14B] w-full my-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={succeeded || disabled || processing}
          >
            {processing ? "Processing" : "Buy Now"}
          </button>
          {error && <div> {error}</div>}
        </form>
      </div>
      <hr />
    </div>
  );
};
