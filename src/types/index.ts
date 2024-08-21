import { AxiosRequestConfig } from 'axios';
import { ReactNode } from 'react';

export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  code?: string;
  token?: string;
}

export interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null | Error;
}

export interface IForgotPasswordProps {
  onResetPasswordClick: () => void;
}

export interface IIngredient {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  uniqueId?: string;
  quantity?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  position?: string;  
  number?: number
}

export interface IBurgerIngredientsProps {
  buns: IIngredient[];
  sauces: IIngredient[];
  main: IIngredient[];
}

export interface IBurgerIngredients {
  data: IIngredient[];
  isLoading: boolean;
  error: string | null;
}

export interface ISetNewPasswordData {
  password: string;
  token: string;
}

export interface IUserResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IFetchOptions extends AxiosRequestConfig {
  headers?: { [key: string]: string };
}

export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IPlaceOrderPayload {
  ingredients: string[];
}

export interface IConstructorCartProps {
  text: string;
  price: number;
  thumbnail: string;
  isLocked?: boolean;
  type?: "top" | "bottom";
  onRemove?: () => void;
  index: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

export interface IDragItem {
  index: number;
  type: string;
}

export interface IIngredientProps {
  product?: IIngredient;
}

export interface IOrdersProps {
  order?: IIngredient;
}


export interface IModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  classModal?: string;
}

export interface IOrderDetailsProps {
  orderNumber?: number;
}

export interface IProfileNavigation {
  isProfilePage?: boolean;
}

export interface IProtectedRoute {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
}

interface IOrder {
  number: number;
}

export interface IOrderData {
  success: boolean;
  name: string;
  order: IOrder;
}

export interface PasswordRecoveryState {
  fromForgotPassword: boolean;
  redirectPath: string | null;
}

export interface IBurgerConstructorState {
  bun: IIngredient | null;
  ingredients: IIngredient[];
  ingredientCounts: { [key: string]: number };
}

export interface IOrderState {
  isLoading: boolean;
  error: string | null;
  orderData: IOrderData | null;
}

export type TCreated = {
  created?: boolean
  order?: {
    createdAt: string
    ingredients: string[]
    name: string
    number: number
    status: string
    updatedAt: string
    _id: string
  }
}

export interface IIngredientImages {
  [key: string]: string;
}

export interface OrderInfoProps {
  isModal?: boolean;
}

export interface IWsOrder {
  _id: string;
  number: number;
  status: string;
  name: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrders {
  orders: IWsOrder[];
  total: number;
  totalToday: number;
}

export interface InfoCartProps {
  ingredient: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  count: number; 
}

export enum WebSocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}


export interface IWebSocketMessage {
  type: string;
  message: string
}

export interface IWebSocketPayload {
  message?: string; 
}