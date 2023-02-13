import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { db } from "../firebase";
import Order from "./Order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(GlobalContext);
  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "orders");
      const orderedRef = query(collRef, orderBy("created", "desc"));
      onSnapshot(orderedRef, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div>
      <h1 className="font-bold text-2xl p-3">Your Orders</h1>
      <div className="h-fit bg-orange-50 w-[90%] p-5 mx-auto">
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
