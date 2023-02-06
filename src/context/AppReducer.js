const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => {
    return amount + item.price;
  }, 0);

const InitailState = {
  basket: [],
  user: null,
};
const AppReducer = (state = InitailState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    case "REMOVE_FROM_CART":
      const filteredBasket = state.basket.filter((el) => {
        return el.id !== action.payload;
      });
      return {
        ...state,
        basket: filteredBasket,
      };
    default:
      return state;
  }
};
export { InitailState, AppReducer, getBasketTotal };
