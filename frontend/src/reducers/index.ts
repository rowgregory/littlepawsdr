import { combineReducers } from 'redux';
import {
  dachshundDetailsReducer,
  dachshundListReducer,
  dachshundPicturesVideosStatusReducer,
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
  dashboardDetailsReducer,
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
  productAndEcardListReducer,
  productCreateReducer,
  productDeletesReducer,
  productListReducer,
  productPublicDetailsReducer,
  productUpdateGuestReducer,
  productUpdateReducer,
} from './productReducter';
import { cartReducer } from './cartReducer';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderEmailConfirmationReducer,
  orderListMyReducer,
  orderListReducer,
  orderShipReducer,
  orderTrackingNumberReducer,
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
} from './eCardOrderReducer';
import {
  ecardDeleteReducer,
  ecardCreateReducer,
  ecardDetailsReducer,
  ecardListReducer,
  ecardUpdateReducer,
  ecardFilteredListReducer,
} from './eCardReducer';
import { searchBarListReducer } from './searchBarReducer';
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
import {
  manuallyAddUserCreateReducer,
  manuallyAddUserDeleteReducer,
  manuallyAddUserDetailsReducer,
  manuallyAddUserListReducer,
  manuallyAddUserUpdateReducer,
} from './manuallyAddUserReducer';
import { deferPayPayButtonReducer } from './paypalReducer';
import {
  welcomeWienerProductCreateReducer,
  welcomeWienerProductDeleteReducer,
  welcomeWienerProductDetailsReducer,
  welcomeWienerProductListReducer,
  welcomeWienerProductUpdateReducer,
} from './welcomeWienerProductReducer';
import {
  welcomeWienerDachshundCreateReducer,
  welcomeWienerDachshundDeleteReducer,
  welcomeWienerDachshundDetailsReducer,
  welcomeWienerDachshundListReducer,
  welcomeWienerDachshundToggledReducer,
  welcomeWienerDachshundUpdateReducer,
} from './welcomeWienerDachshundReducer';
import { dashboardReducer } from './dashboardReducer';
import {
  jwtCheckValidityAdoptionFeeReducer,
  jwtCheckValidityReducer,
} from './jwtReducer';
import passwordReducer from './passwordReducer';
import {
  adoptionFeeCheckActiveSessionReducer,
  adoptionFeeCreateReducer,
  adoptionFeeListReducer,
} from './adoptionReducer';

const allReducers = combineReducers({
  dachshunds: dachshundListReducer,
  dachshundDetails: dachshundDetailsReducer,
  dachshundSuccessfulAdoptions: dachshundSuccessfulAdoptionsReducer,
  dachshundSanctuaryOrPassedAway: dachshundSanctuaryOrPassedAwayReducer,
  dachshundPicturesVideosStatuses: dachshundPicturesVideosStatusReducer,
  dashboard: dashboardReducer,
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
  userDashboardDetails: dashboardDetailsReducer,
  eventList: eventListReducer,
  eventDelete: eventDeleteReducer,
  eventCreate: eventCreateReducer,
  eventDetails: eventDetailsReducer,
  eventUpdate: eventUpdateReducer,
  productList: productListReducer,
  productPublicDetails: productPublicDetailsReducer,
  productDelete: productDeletesReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productUpdateGUest: productUpdateGuestReducer,
  productEcardList: productAndEcardListReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderShip: orderShipReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderEmailConfirmation: orderEmailConfirmationReducer,
  orderTrackingNumber: orderTrackingNumberReducer,
  stripePayment: createPaymentIntentReducer,
  sendEmail: sendEmailReducer,
  verifyToken: verifyTokenReducer,
  resetPassword: resetPasswordReducer,
  newsletterCreate: newsletterCreateReducer,
  newsletterEmailList: newsletterEmailListReducer,
  newsletterEmailDelete: newsletterEmailDeleteReducer,
  eCardOrderCreate: eCardOrderCreateReducer,
  eCardOrderDetails: eCardOrderDetailsReducer,
  ecardList: ecardListReducer,
  ecardCreate: ecardCreateReducer,
  ecardDetails: ecardDetailsReducer,
  ecardUpdate: ecardUpdateReducer,
  ecardDelete: ecardDeleteReducer,
  ecardFilteredList: ecardFilteredListReducer,
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
  manuallyAddedUserList: manuallyAddUserListReducer,
  manuallyAddedUserCreate: manuallyAddUserCreateReducer,
  manuallyAddedUserUpdate: manuallyAddUserUpdateReducer,
  manuallyAddedUserDelete: manuallyAddUserDeleteReducer,
  manuallyAddedUserDetails: manuallyAddUserDetailsReducer,
  deferPayPalButton: deferPayPayButtonReducer,
  welcomeWienerProductList: welcomeWienerProductListReducer,
  welcomeWienerProductCreate: welcomeWienerProductCreateReducer,
  welcomeWienerProductUpdate: welcomeWienerProductUpdateReducer,
  welcomeWienerProductDelete: welcomeWienerProductDeleteReducer,
  welcomeWienerProductDetails: welcomeWienerProductDetailsReducer,
  welcomeWienerDachshundList: welcomeWienerDachshundListReducer,
  welcomeWienerDachshundCreate: welcomeWienerDachshundCreateReducer,
  welcomeWienerDachshundUpdate: welcomeWienerDachshundUpdateReducer,
  welcomeWienerDachshundDelete: welcomeWienerDachshundDeleteReducer,
  welcomeWienerDachshundDetails: welcomeWienerDachshundDetailsReducer,
  welcomeWienerDachshundToggle: welcomeWienerDachshundToggledReducer,
  searchBar: searchBarListReducer,
  jwtCheckValidity: jwtCheckValidityReducer,
  jwtCheckValidityAdoptionFee: jwtCheckValidityAdoptionFeeReducer,
  password: passwordReducer,
  adoptionFeeCreate: adoptionFeeCreateReducer,
  adoptionFeeCheckActiveSession: adoptionFeeCheckActiveSessionReducer,
  adoptionFeeList: adoptionFeeListReducer,
});

export default allReducers;
