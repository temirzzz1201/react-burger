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
  error: any;
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
  product: IIngredient;
}

export interface IModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  classModal?: string;
}

export interface IOrderDetailsProps {
  orderNumber: number;
}

export interface IProfileNavigation {
  isProfilePage?: boolean;
}

export interface IProtectedRoute {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
}
