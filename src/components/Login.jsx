import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assests/amazon-black.png";
import { auth } from "../firebase";
import { GlobalContext } from "../context/GlobalState";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const usernameRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext);

  // handle Create New User
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      usernameRef.current.value,
      passRef.current.value
    )
      .then(navigate("/"))
      .catch((Error) => console.log(Error.Message));
  };
  // handle Sign In With A Current User
  const handleSignIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      usernameRef.current.value,
      passRef.current.value
    )
      .then(navigate("/"))
      .catch((Error) => console.log(Error.Message));
  };

  // Changing Or ReSetting User EveryTime You Click Or Create User So useEffect();
  useEffect(() => {
    // authUser ==> Refers To The User We Created With Firebase So We Get Or Access It From Firebase Method (auth.onAuthStateChanged(user=>{}))
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          payload: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          payload: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center flex-col mt-16">
      <Link to="/" className="mb-8">
        <img src={Logo} alt="HeaderLogo" className="w-32 h-16 p-2" />
      </Link>
      <form className="border flex flex-col p-4 w-80">
        <h2 className="mb-4 text-[30px]"> Sign in </h2>
        <label className="font-bold" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="myForm-input"
          placeholder="Enter Your Mail"
          ref={usernameRef}
        />
        <label className="font-bold" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="myForm-input"
          placeholder="Enter Your PassCode"
          ref={passRef}
        />
        <input type="submit" className="myForm-submit" onClick={handleSignIn} />
        <p className="text-[12px] my-4">
          By continuing, you agree to Amazon's Fake Clone Conditions of Use and
          Privacy Notice.
        </p>
        <button
          className="border border-gray-500 p-2 bg-slate-200"
          onClick={handleSubmit}
        >
          Create Your Amazon Account
        </button>
      </form>
    </div>
  );
};

export default Login;
