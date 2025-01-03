import { CategoryParams } from './category';

export interface ProductParams {
  id: string;
  name: string;
  description: string;
  quantity_in_stock: number;
  price_original: number;
  price: number;
  thumbnail: string;
  image_urls: string[];
  category_id: string;
  category: CategoryParams;
  product_attributes: ProductAttributesParams[];
}
export interface ProductAttributesParams {
  id: string;
  quantity: number;
  size: string;
}
