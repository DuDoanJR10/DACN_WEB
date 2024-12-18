import { Button, Flex, Input, Select, Spin } from 'antd';
import { getListProductFilterAPI } from 'apis/product';
import ProductItem from 'pages/Home/components/ProductItem';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { ProductParams } from 'types/product';
import { handleErrorAPI } from 'utils/helpers';
import { FaSearchengin } from 'react-icons/fa6';
import '../styles/Explore.scss';
import useDebounce from 'hooks/useDebounce';

const Explore = () => {
  const { listCategory } = useAppSelector((state) => state.category);
  const [categoryID, setCategoryID] = useState<string>();
  const [keyword, setKeyword] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [listProduct, setListProduct] = useState<ProductParams[]>([]);

  const keywordValues = useDebounce(keyword, 450);

  const handleGetListProduct = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getListProductFilterAPI({
        category_id: categoryID,
        name: keywordValues,
      });
      setListProduct(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  }, [categoryID, keywordValues]);

  useEffect(() => {
    handleGetListProduct();
  }, [handleGetListProduct]);

  return (
    <div className="Explore">
      <div className="bg-white rounded-2xl p-4 mt-4 gap-4 flex items-center">
        <Flex className="relative w-[400px]" align="center">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-full bg-white border border-solid border-primary text-base h-10 pr-16"
            placeholder="Nhập từ khóa để tìm kiếm..."
          />
          <Button type="primary" className="absolute right-0 top-0 bottom-0 rounded-full p-0 w-14">
            <FaSearchengin className="text-base" />
          </Button>
        </Flex>
        <Select
          showSearch
          allowClear
          onChange={(value) => setCategoryID(value)}
          placeholder="Chọn danh mục"
          className="text-base !h-auto Explore__select"
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={listCategory?.map((category) => ({
            value: category?.id,
            label: category?.name,
          }))}
        />
        <Select
          allowClear
          placeholder="Sắp xếp theo giá"
          className="text-base !h-auto Explore__select"
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={[
            { value: 'asc', label: 'Giá tăng dần' },
            { value: 'desc', label: 'Giá giảm dần' },
          ]}
        />
      </div>
      <div className="bg-white rounded-2xl p-4 mt-4 min-h-screen">
        <h2 className="text-2xl rounded-xl mb-4 font-semibold text-white bg-primary px-4 py-3">Khám phá</h2>
        <Spin spinning={loading}>
          <div className="w-full grid grid-cols-4 gap-5 ">
            {listProduct?.map((product) => <ProductItem key={product?.id} product={product} />)}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Explore;
