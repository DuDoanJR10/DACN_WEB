import { CategoryParams } from './category';

export interface ProductAdminParams {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: string;
  quantity_in_stock: number;
  thumbnail: string;
  image_urls: string[];
  category: CategoryParams;
}
