import React from 'react';
import '../styles/ProductItem.scss';
import { ProductParams } from 'types/product';
import { Flex } from 'antd';
import { FaBagShopping } from 'react-icons/fa6';
import { formatPrice } from 'utils/helpers';
import { Link } from 'react-router-dom';

interface ProductItemProps {
  product: ProductParams;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link to={`/product-detail/${product?.id}`} className="ProductItem">
      <img className="w-full object-cover" src={`${process.env.API_URL}uploads/${product?.thumbnail}`} alt="product" />
      <div className="p-3">
        <p className="text-base line-clamp-2 h-12 font-semibold text-black">{product?.name}</p>
        <p className="text-xs line-clamp-2 h-8 text-black">{product?.name}</p>
        <Flex className="w-full justify-end">
          <p className="text-[#ff0000] font-semibold text-base">{`${formatPrice(product?.price)} đ`}</p>
        </Flex>
      </div>
      <Flex className="ProductItem__quantity px-2 py-1 items-center gap-1 bg-white">
        <FaBagShopping className="text-black" />
        <p className="text-black">{product?.quantity_in_stock}</p>
      </Flex>
    </Link>
  );
};

export default ProductItem;
