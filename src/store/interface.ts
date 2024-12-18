import { AccountParams } from 'types/account';
import { CartParams } from 'types/cart';
import { CategoryParams } from 'types/category';
import { PaginationParams } from 'types/common';
import { ProductParams } from 'types/product';
import { ProductAdminParams } from 'types/productAdmin';

export interface AuthState {
  isLogin: boolean;
  isAdmin: boolean;
  user: {
    email: string;
    id?: number;
    name: string;
    phone?: string;
  };
}

export interface ProductAdminState {
  listProductAdmin: ProductAdminParams[];
  pagination: PaginationParams;
}

export interface CategoryState {
  listCategory: CategoryParams[];
}

export interface AccountState {
  listAccount: AccountParams[];
}

export interface ProductState {
  listProduct: ProductParams[];
}

export interface CartState {
  listCart: CartParams[];
}
