import React, { useCallback, useEffect, useState } from 'react';
import SidebarUser from 'layouts/components/SidebarUser';
import { Flex } from 'antd';
import Slide from '../components/Slide';
import '../styles/Home.scss';
import { handleErrorAPI } from 'utils/helpers';
import { getListProductAPI } from 'apis/product';
import { ProductParams } from 'types/product';
import ProductItem from '../components/ProductItem';

const Home = () => {
  const [listProduct, setListProduct] = useState<ProductParams[]>([]);
  const handleGetListProduct = useCallback(async () => {
    try {
      const res: any = await getListProductAPI();
      if (res?.success) {
        setListProduct(res?.data);
      }
    } catch (error: any) {
      handleErrorAPI(error);
    }
  }, []);

  useEffect(() => {
    handleGetListProduct();
  }, [handleGetListProduct]);

  return (
    <Flex className="gap-4 p-4">
      <SidebarUser />
      <Flex className="Home__slide flex-col gap-4 flex-grow">
        <Slide />
        <div className="Home__content w-full bg-white rounded-xl p-4">
          <div className="w-full grid grid-cols-4 gap-5">
            {listProduct?.map((product) => <ProductItem key={product?.id} product={product} />)}
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default Home;
