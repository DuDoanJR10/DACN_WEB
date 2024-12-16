import { Table } from 'antd';
import { getListProductAPI } from 'apis/product';
import TextDisplay from 'components/TextDisplay';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setListProduct } from 'store/slices/productSlice';
import { ProductParams } from 'types/product';
import { handleErrorAPI } from 'utils/helpers';

const ProductAdmin = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { listProduct } = useAppSelector((state) => state.product);

  const handleGetListProduct = async () => {
    try {
      setLoading(true);
      const res = await getListProductAPI();
      dispatch(
        setListProduct(res?.data?.map((product: ProductParams, index: number) => ({ ...product, key: index + 1 }))),
      );
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  };

  useEffect(() => {
    handleGetListProduct();
  }, []);

  const columns: any[] = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <TextDisplay text={text} />,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <TextDisplay text={text} />,
    },
  ];

  return (
    <div>
      <h2 className="mb-4">Sản phẩm</h2>
      <Table columns={columns} loading={loading} dataSource={listProduct} />
    </div>
  );
};

export default ProductAdmin;
