import { CategoryParams } from 'types/category';
import { PaginationParams } from 'types/common';
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
