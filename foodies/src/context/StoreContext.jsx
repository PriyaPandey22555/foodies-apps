import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { fetchFoodList } from "../service/FoodService";
import {
  addToCart,
  getCartData,
  removeQtyFromCart,
} from "../service/cartService";
export const StoreContext = createContext(null);
export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");

  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
    await addToCart(foodId, token);
  };
  const decreaseQty = async (foodId) => {
    if (!quantities[foodId] || quantities[foodId] <= 0) return; // ✅ 0 pe backend call nahi hoga
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] - 1,
    }));
    await removeQtyFromCart(foodId, token);
  };

  const removeFromCart = async (foodId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/item/${foodId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
    setQuantities((prevQuantities) => {
      const updateQuantities = { ...prevQuantities };
      delete updateQuantities[foodId];
      return updateQuantities;
    });
  };

  const loadCartData = async (token) => {
    const items = await getCartData(token);
    setQuantities(items || {});
  };

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodList();
      setFoodList(data);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
