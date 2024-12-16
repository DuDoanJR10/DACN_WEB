import { CategoryParams } from './category';

export interface ProductParams {
  id: string;
  name: string;
  description: string;
  quantity_in_stock: number;
  price: string;
  thumbnail: string;
  image_urls: string[];
  category_id: string;
  category: CategoryParams;
}
