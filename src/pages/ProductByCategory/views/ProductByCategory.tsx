import { Flex } from 'antd';
import { getListProductFilterAPI } from 'apis/product';
import SidebarUser from 'layouts/components/SidebarUser';
import ProductItem from 'pages/Home/components/ProductItem';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { CategoryParams } from 'types/category';
import { ProductParams } from 'types/product';
import { handleErrorAPI } from 'utils/helpers';

const ProductByCategory = () => {
  const { id } = useParams();
  const { listCategory } = useAppSelector((state) => state.category);
  const [listProduct, setListProduct] = useState<ProductParams[]>([]);
  const [category, setCategory] = useState<CategoryParams>({} as CategoryParams);

  const handleGetListProduct = async (id: string) => {
    try {
      const res = await getListProductFilterAPI({
        category_id: id,
      });
      setListProduct(res?.data);
    } catch (error: any) {
      handleErrorAPI(error);
    }
  };

  useEffect(() => {
    if (id) {
      const item = listCategory?.find((category) => category?.id === id);
      if (item) {
        setCategory(item);
      }
    }
  }, [id, listCategory]);

  useEffect(() => {
    handleGetListProduct(id as string);
  }, [id]);

  return (
    <Flex className="gap-4 p-4">
      <SidebarUser />
      <div className="ProductByCategory flex-grow bg-white p-4 rounded-xl">
        {category?.name && (
          <h2 className="text-2xl rounded-xl mb-4 font-semibold text-white bg-primary px-4 py-3">{`${category?.name} - ${category?.description}`}</h2>
        )}
        <div className="w-full grid grid-cols-4 gap-5">
          {listProduct?.map((product) => <ProductItem key={product?.id} product={product} />)}
        </div>
      </div>
    </Flex>
  );
};

export default ProductByCategory;
