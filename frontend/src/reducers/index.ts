import { combineReducers } from 'redux';
import {
  dachshundDetailsReducer,
  dachshundListReducer,
  dachshundSanctuaryOrPassedAwayReducer,
  dachshundSuccessfulAdoptionsReducer,
} from './dachshundReducer';
import {
  eventCreateReducer,
  eventDeleteReducer,
  eventDetailsReducer,
  eventListReducer,
  eventUpdateReducer,
} from './eventReducer';
import {
  checkUsersConfirmationReducer,
  generatTokenForNewSessionReducer,
  userConfirmedReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userLogoutReducer,
  userPasswordReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
  userVerifyEmailReducer,
  userWhoWeAreListReducer,
} from './userReducer';
import {
  donateCreateReducer,
  donateDeleteReducer,
  donateDetailsReducer,
  donateListReducer,
  donateUpdateReducer,
} from './donationReducer';
import {
  productCreateReducer,
  productDeletesReducer,
  productDetailsReducer,
  productListReducer,
  productPublicDetailsReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './productReducter';
import { cartReducer } from './cartReducer';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderEmailConfirmationReducer,
  orderGuestDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
  orderShipReducer,
} from './orderReducer';
import { createPaymentIntentReducer } from './stripeReducer';
import {
  resetPasswordReducer,
  sendEmailReducer,
  verifyTokenReducer,
} from './resetPasswordReducer';
import {
  newsletterCreateReducer,
  newsletterEmailDeleteReducer,
  newsletterEmailListReducer,
} from './newsletterReducer';
import {
  eCardOrderCreateReducer,
  eCardOrderDetailsReducer,
  eCardOrdersListReducer,
} from './eCardOrderReducer';
import {
  eCardCreateReducer,
  eCardDeleteReducer,
  eCardDetailsReducer,
  eCardListReducer,
  eCardUpdateReducer,
} from './eCardReducer';
import {
  raffleWinnerCreateReducer,
  raffleWinnerDeleteReducer,
  raffleWinnerDetailsReducer,
  raffleWinnerListReducer,
  raffleWinnerUpdateReducer,
} from './raffleWinnerReducer';
import {
  blogCreateReducer,
  blogDeleteReducer,
  blogDetailsReducer,
  blogListReducer,
  blogUpdateReducer,
} from './blogReducer';
import {
  educationTipCreateReducer,
  educationTipDeleteReducer,
  educationTipDetailsReducer,
  educationTipListReducer,
  educationTipUpdateReducer,
} from './educationTipReducer';
import { guestUserRegisterReducer } from './guestUserReducer';
import {
  guestOrderCreateReducer,
  guestOrderListReducer,
  guestOrderShipReducer,
} from './guestOrderReducer';

const allReducers = combineReducers({
  dachshunds: dachshundListReducer,
  dachshundDetails: dachshundDetailsReducer,
  dachshundSuccessfulAdoptions: dachshundSuccessfulAdoptionsReducer,
  dachshundSanctuaryOrPassedAway: dachshundSanctuaryOrPassedAwayReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userPassword: userPasswordReducer,
  userList: userListReducer,
  userWhoWeAreList: userWhoWeAreListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userLogout: userLogoutReducer,
  userVerifyEmail: userVerifyEmailReducer,
  userConfirmed: userConfirmedReducer,
  userNewSession: generatTokenForNewSessionReducer,
  userCheckUsersConfirmation: checkUsersConfirmationReducer,
  eventList: eventListReducer,
  eventDelete: eventDeleteReducer,
  eventCreate: eventCreateReducer,
  eventDetails: eventDetailsReducer,
  eventUpdate: eventUpdateReducer,
  donationCreate: donateCreateReducer,
  donationDetails: donateDetailsReducer,
  donationList: donateListReducer,
  donationUpdate: donateUpdateReducer,
  donationDelete: donateDeleteReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productPublicDetails: productPublicDetailsReducer,
  productDelete: productDeletesReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderGuestDetails: orderGuestDetailsReducer,
  orderPay: orderPayReducer,
  orderShip: orderShipReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderEmailConfirmation: orderEmailConfirmationReducer,
  stripePayment: createPaymentIntentReducer,
  sendEmail: sendEmailReducer,
  verifyToken: verifyTokenReducer,
  resetPassword: resetPasswordReducer,
  newsletterCreate: newsletterCreateReducer,
  newsletterEmailList: newsletterEmailListReducer,
  newsletterEmailDelete: newsletterEmailDeleteReducer,
  eCardOrderCreate: eCardOrderCreateReducer,
  eCardOrderDetails: eCardOrderDetailsReducer,
  eCardOrdersList: eCardOrdersListReducer,
  eCardList: eCardListReducer,
  eCardCreate: eCardCreateReducer,
  eCardDetails: eCardDetailsReducer,
  eCardUpdate: eCardUpdateReducer,
  eCardDelete: eCardDeleteReducer,
  raffleWinnerList: raffleWinnerListReducer,
  raffleWinnerCreate: raffleWinnerCreateReducer,
  raffleWinnerDetails: raffleWinnerDetailsReducer,
  raffleWinnerUpdate: raffleWinnerUpdateReducer,
  raffleWinnerDelete: raffleWinnerDeleteReducer,
  blogList: blogListReducer,
  blogCreate: blogCreateReducer,
  blogDetails: blogDetailsReducer,
  blogUpdate: blogUpdateReducer,
  blogDelete: blogDeleteReducer,
  educationTipList: educationTipListReducer,
  educationTipCreate: educationTipCreateReducer,
  educationTipDetails: educationTipDetailsReducer,
  educationTipUpdate: educationTipUpdateReducer,
  educationTipDelete: educationTipDeleteReducer,
  guestUserRegister: guestUserRegisterReducer,
  guestOrderCreate: guestOrderCreateReducer,
  guestOrderList: guestOrderListReducer,
  guestOrderShip: guestOrderShipReducer,
});

export default allReducers;