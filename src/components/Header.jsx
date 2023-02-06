import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assests/amazonLogo.png";
import Search from "../assests/search.png";
import Cart from "../assests/shopping-cart.png";
import { GlobalContext } from "../context/GlobalState";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = () => {
  const { user, basket } = useContext(GlobalContext);
  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="bg-[#131921] py-2 flex items-center text-white px-2 flex-wrap">
      <Link to="/" className="">
        <img
          src={Logo}
          alt="HeaderLogo"
          className="w-28 h-12 p-2 mt-[8px] drop-shadow-logoShadow"
        />
      </Link>

      <div className="searchHeader flex items-start flex-auto ml-2 m-3">
        <input
          type="text"
          className="w-full focus:outline-none transition-all duration-700 border-none hover:bg-slate-400 hover:shadow-lg hover:shadow-gray-400 hover:placeholder:text-amber-400 hover:placeholder:tracking-[5px] px-2 py-1 rounded-xl capitalize text-black"
          placeholder="Search For Items"
        />
        <img
          src={Search}
          alt="Search"
          className="inline-block w-8 cursor-pointer searchIcon"
        />
      </div>
      <div className="flex space-x-4 mr-2 max-[768px]:w-full max-[768px]:justify-between max-[768px]:px-3  ">
        <Link to={!user && "/login"} onClick={handleSignOut}>
          <p className="text-[15px]">
            Hello <strong>{user ? user.email : "Guset"} </strong>
          </p>
          <p className="font-bold"> {user ? "sign out" : "sign in"}</p>
        </Link>
        <Link to="orders">
          <p className="text-[15px]"> Returns</p>
          <p className="font-bold"> & Orders</p>
        </Link>
        <Link to="prime">
          <p className="text-[15px]"> Your</p>
          <p className="font-bold"> Prime</p>
        </Link>
        <Link to="cart">
          <img src={Cart} alt="Cart" className="inline-block" />
          <span className="font-bold ml-2">{basket.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
