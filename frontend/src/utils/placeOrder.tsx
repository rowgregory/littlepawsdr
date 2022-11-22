/* eslint-disable array-callback-return */
import { STATES } from './states';

const addDecimals = (num: number) => Number(num).toFixed(2);

const itemsPrice = (cartItems: any) =>
  addDecimals(
    cartItems.reduce((acc: any, item: any) => acc + item.price * item.qty, 0)
  );

const taxAmount = (state: any) => {
  let result: any;

  STATES.some((obj: any) => {
    if (obj.value === state) return (result = obj.taxRate);
  });

  return result / 100;
};

const shippingPrice = Number(3.5).toFixed(2);

const taxPrice = (state: any, cartItems: any) =>
  state === undefined
    ? (0).toFixed(2)
    : addDecimals(taxAmount(state) * +itemsPrice(cartItems));

let totalPrice = (state: any, cartItems: any) =>
  addDecimals(
    +itemsPrice(cartItems) + +shippingPrice + +taxPrice(state, cartItems)
  );

let totalItems = (cartItems: any) =>
  +cartItems?.reduce((acc: any, item: any) => acc + +item.qty, 0);

let subTotal = (cartItems: any) =>
  cartItems
    .reduce((acc: any, item: any) => acc + item?.qty * item?.price, 0)
    .toFixed(2);

export {
  addDecimals,
  itemsPrice,
  shippingPrice,
  taxAmount,
  taxPrice,
  totalItems,
  totalPrice,
  subTotal,
};
