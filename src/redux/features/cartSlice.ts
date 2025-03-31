import { IProduct } from "@/types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IInitialState {
  products: IProduct[];
  city: string;
  shippingAddress: string;
}

const initialState: IInitialState = {
  products: [],
  city: "",
  shippingAddress: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct)
        existingProduct.orderQuantity =
          (existingProduct.orderQuantity ?? 0) + 1;
      else state.products.push({ ...action.payload, orderQuantity: 1 });
    },

    incrementCartItem: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload
      );
      if (existingProduct)
        existingProduct.orderQuantity =
          (existingProduct.orderQuantity ?? 0) + 1;
    },
    decrementCartItme: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload
      );
      if (existingProduct)
        existingProduct.orderQuantity =
          (existingProduct.orderQuantity ?? 0) - 1;
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    updateAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    updateCity: (state, action) => {
      state.city = action.payload;
    },

    clearCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },
});

//Products
export const cartSelector = (state: RootState) => state.cart.products;

const selectCart = (state: RootState) => state.cart;

export const orderSelector = createSelector([selectCart], (cart) => ({
  products: cart.products.map((product) => ({
    product: product._id,
    quantity: product.orderQuantity ?? 1,
    color: "black",
  })),
  paymentMethod: "Online",
  shippingAddress: `${cart.shippingAddress} - ${cart.city}`,
}));

//Payment
export const subTotalSelector = (state: RootState) =>
  state.cart.products.reduce((sum, { price, offerPrice, orderQuantity }) => {
    const unitPrice = offerPrice ?? price ?? 0;
    const quantity = orderQuantity ?? 0;
    return sum + unitPrice * quantity;
  }, 0);

export const shippingCostSelector = (state: RootState) => {
  if (state.cart.city === "Dhaka" && state.cart.products.length) return 50;
  else if (state.cart.city !== "Dhaka" && state.cart.products.length)
    return 100;
  else return 0;
};

export const gradTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);
  return subTotal + shippingCost;
};

//Address
export const citySelector = (state: RootState) => state.cart.city;
export const shippingAddressSelector = (state: RootState) =>
  state.cart.shippingAddress;

export const {
  addToCart,
  incrementCartItem,
  decrementCartItme,
  removeFromCart,
  updateAddress,
  updateCity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
