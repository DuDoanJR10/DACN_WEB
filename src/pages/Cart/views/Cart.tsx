import React, { useCallback, useEffect, useState } from 'react';
import { Button, Flex, Popconfirm, Table, TableProps } from 'antd';
import { deleteItemCartAPI, getListCartAPI } from 'apis/cart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setListCart } from 'store/slices/cartSlice';
import { formatPrice, handleErrorAPI } from 'utils/helpers';
import { AccountParams } from 'types/account';
import TextDisplay from 'components/TextDisplay';
import { CartParams } from 'types/cart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { listCart } = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<CartParams[]>([]);

  const handleDelete = async (id: string) => {
    try {
      const res: any = await deleteItemCartAPI(id);
      if (res?.success) {
        toast.success(res?.message);
        handleGetListCart();
      }
    } catch (error) {
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
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      render: (text: number) => <TextDisplay text={formatPrice(text, 0, ',')} />,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      align: 'right',
      key: 'size',
      render: (text: number) => <TextDisplay text={text} />,
    },
    {
      title: 'Giá',
      align: 'right',
      dataIndex: 'price',
      key: 'price',
      render: (price: number, record: any) => <TextDisplay text={formatPrice(price * record?.quantity, 0, ',')} />,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: CartParams) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa không?"
          okText="Có"
          cancelText="Hủy"
          onConfirm={() => handleDelete(record?.productAttrId)}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  const rowSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelected(selectedRows);
    },
  };
  const handleGetListCart = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await getListCartAPI();
      if (res?.success) {
        dispatch(
          setListCart(
            res?.data?.items?.map((cart: AccountParams, index: number) => ({
              ...cart,
              key: index + 1,
            })),
          ),
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorAPI(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetListCart();
  }, [handleGetListCart]);

  const handleBuyCart = () => {
    navigate('/order-cart', {
      state: {
        selected,
      },
    });
  };
  return (
    <div className="Cart">
      <h2 className="text-2xl rounded-xl my-4 font-semibold text-white bg-primary px-4 py-3">Giỏ hàng</h2>
      <div className="bg-white p-4 rounded-xl">
        <Table
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          loading={loading}
          columns={columns}
          dataSource={listCart}
          pagination={false}
        />
        <Flex className="w-full justify-end">
          <Button onClick={handleBuyCart} className="mt-4" type="primary">
            Mua hàng
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default Cart;
