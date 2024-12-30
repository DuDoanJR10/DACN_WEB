import { Button, Flex, Popconfirm, Table } from 'antd';
import { cancelOrderUserAPI, getListOrderAPI } from 'apis/order';
import { StatusOrder } from 'common/constants';
import TextDisplay from 'components/TextDisplay';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatPrice, handleErrorAPI } from 'utils/helpers';

export const handleGetStatusOrder = (status: string) => {
  switch (status) {
    case StatusOrder.PENDING:
      return 'Đang chờ xác nhận';
    case StatusOrder.APPROVED:
      return 'Đã xác nhận';
    case StatusOrder.CANCELLED:
      return 'Đã hủy';
    case StatusOrder.DELIVER:
      return 'Đang giao hàng';
    case StatusOrder.DONE:
      return 'Hoàn thành';
  }
};

const History = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listHistory, setListHistory] = useState<any[]>([]);
  const handleGetListHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await getListOrderAPI();
      if (res?.success) {
        setListHistory(
          res?.data?.map((item: any, index: number) => ({
            ...item,
            key: index + 1,
          })),
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleErrorAPI(error);
    }
  }, []);

  useEffect(() => {
    handleGetListHistory();
  }, [handleGetListHistory]);

  const handleCancelOrder = async (id: string) => {
    try {
      const res: any = await cancelOrderUserAPI(id);
      if (res?.success) {
        toast.success(res.message);
        handleGetListHistory();
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
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Flex className="flex-col gap-1">
          {record?.items?.map((item: any, index: number) => (
            <Flex className="gap-2" key={index}>
              <img
                className="w-20 h-20 object-cover rounded"
                alt=""
                src={`${process.env.API_URL}uploads/${item?.product?.thumbnail}`}
              />
              <Flex className="flex-col">
                <TextDisplay text={item?.product?.name} />
                <TextDisplay text={`Size: ${item?.productAttr?.size}`} />
                <TextDisplay text={`x ${item?.quantity}`} />
              </Flex>
            </Flex>
          ))}
        </Flex>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'name',
      align: 'right',
      key: 'name',
      render: (_: any, record: any) => {
        let price = 0;
        record?.items?.map((item: any) => {
          price = price + item?.quantity * item?.product?.price;
        });
        return <TextDisplay text={`${formatPrice(price, 0, ',')} đ`} />;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => <TextDisplay text={handleGetStatusOrder(text)} />,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) =>
        record?.status === 'pending' ? (
          <Popconfirm
            title="Bạn có chắc chắn muốn hủy không?"
            okText="Có"
            cancelText="Hủy"
            onConfirm={() => handleCancelOrder(record?.id)}
          >
            <Button danger>Hủy đơn hàng</Button>
          </Popconfirm>
        ) : (
          <></>
        ),
    },
  ];
  return (
    <div className="History ">
      <h2 className="text-2xl rounded-xl my-4 font-semibold text-white bg-primary px-4 py-3">Lịch sử mua hàng</h2>
      <Table columns={columns} loading={loading} dataSource={listHistory} />
    </div>
  );
};

export default History;
