import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsSlice from "./burgerIngredients";
import burgerConstructorSlice from './burgerConstructor';
import ingredientDetailsSlice from './ingredientDetails';
import orderDetailsSlice from './orderDetails';
import authSlice from "./auth";
import passwordRecoverySlice from "./passwordRecovery";
import wsOrderDetails from "./wsOrderDetails";
import ordersSlice from './orders';
import feedSlice from './feed';

import { socketMiddleware } from "../middleware/socketMiddleware";

import {
  connectLiveOrder,
  disconnectLiveOrder,
  wsLiveOrderConnecting,
  wsLiveOrderOpen,
  wsLiveOrderClose,
  wsLiveOrderMessage,
  wsLiveOrderError,
} from './actions';

import {
  connectFeedTable,
  disconnectFeedTable,
  wsFeedTableConnecting,
  wsFeedTableOpen,
  wsFeedTableClose,
  wsFeedTableMessage,
  wsFeedTableError,
} from './actions';

const wsOrderActions = {
  wsConnect: connectLiveOrder,
  wsDisconnect: disconnectLiveOrder,
  wsConnecting: wsLiveOrderConnecting,
  onOpen: wsLiveOrderOpen,
  onClose: wsLiveOrderClose,
  onMessage: wsLiveOrderMessage,
  onError: wsLiveOrderError,
};

const wsFeedActions = {
  wsConnect: connectFeedTable,
  wsDisconnect: disconnectFeedTable,
  wsConnecting: wsFeedTableConnecting,
  onOpen: wsFeedTableOpen,
  onClose: wsFeedTableClose,
  onMessage: wsFeedTableMessage,
  onError: wsFeedTableError,
};

const orderMiddleware = socketMiddleware(wsOrderActions);
const feedMiddleware = socketMiddleware(wsFeedActions);

const store = configureStore({
  reducer: {
    ingredient: burgerIngredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    ingredientsModal: ingredientDetailsSlice,
    order: orderDetailsSlice,
    auth: authSlice,
    passwordRecovery: passwordRecoverySlice,
    orderDetails: wsOrderDetails,
    ordersWebsocket: ordersSlice,
    feedWebsocket: feedSlice,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(orderMiddleware, feedMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
