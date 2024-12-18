import { Button, Flex, Modal, Popconfirm, Space, Table } from 'antd';
import { deleteProductAPI, getListProductAPI } from 'apis/product';
import TextDisplay from 'components/TextDisplay';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setListProduct } from 'store/slices/productSlice';
import { ProductParams } from 'types/product';
import { formatPrice, handleErrorAPI } from 'utils/helpers';
import ModalUpdate from '../components/ModalUpdate';
import ModalCreate from '../components/ModalCreate';
import { toast } from 'react-toastify';

const ProductAdmin = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { listProduct } = useAppSelector((state) => state.product);
  const [product, setProduct] = useState<ProductParams>({} as ProductParams);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const handleGetListProduct = useCallback(async () => {
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
  }, [dispatch]);

  useEffect(() => {
    handleGetListProduct();
  }, [handleGetListProduct]);

  const handleEdit = (record: ProductParams) => {
    setProduct(record);
    setOpenUpdate(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res: any = await deleteProductAPI(id);
      if (res?.success) {
        toast.success(res?.message);
        handleGetListProduct();
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  };

  const columns: any[] = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <TextDisplay text={text} />,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <TextDisplay text={text} />,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string) => (
        <img
          className="max-w-[150px] max-h-[150px] object-scale-down"
          src={`${process.env.API_URL}uploads/${text}`}
          alt="thumbnail"
        />
      ),
    },
    {
      title: 'Số lượng tồn kho',
      dataIndex: 'quantity_in_stock',
      align: 'right',
      key: 'price_origiquantity_in_stocknal',
      render: (price: number) => <TextDisplay text={formatPrice(price, 0, ',')} />,
    },
    {
      title: 'Giá nhập',
      dataIndex: 'price_original',
      align: 'right',
      key: 'price_original',
      render: (price: number) => <TextDisplay text={formatPrice(price, 0, ',')} />,
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      align: 'right',
      key: 'price',
      render: (price: number) => <TextDisplay text={formatPrice(price, 0, ',')} />,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: ProductParams) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Xem</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record?.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="mb-4">Sản phẩm</h2>
      <Flex>
        <Button className="mb-4" type="primary" onClick={() => setOpenAdd(true)}>
          Thêm
        </Button>
      </Flex>
      <Table columns={columns} loading={loading} dataSource={listProduct} />
      <Modal
        footer={null}
        open={openUpdate}
        onCancel={() => setOpenUpdate(false)}
        onClose={() => setOpenUpdate(false)}
        maskClosable={false}
      >
        <ModalUpdate open={openUpdate} setOpen={setOpenUpdate} data={product} />
      </Modal>
      <Modal
        footer={null}
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        onClose={() => setOpenAdd(false)}
        maskClosable={false}
      >
        <ModalCreate setOpen={setOpenAdd} />
      </Modal>
    </div>
  );
};

export default ProductAdmin;
