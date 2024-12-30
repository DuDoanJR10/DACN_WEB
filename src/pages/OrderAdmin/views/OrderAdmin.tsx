import { Button, Flex, Popconfirm, Select, Space, Table } from 'antd';
import { getListOrderAdminAPI, handleChangeStatusOrderAdminAPI } from 'apis/order';
import { StatusOrder } from 'common/constants';
import TextDisplay from 'components/TextDisplay';
import moment from 'moment';
import { handleGetStatusOrder } from 'pages/History/views/History';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatPrice, handleErrorAPI } from 'utils/helpers';

const OrderAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listOrder, setListOrder] = useState<any[]>([]);
  const handleGetListOrderAdmin = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await getListOrderAdminAPI();
      console.log('res === ', res);
      if (res?.success) {
        setListOrder(
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
    handleGetListOrderAdmin();
  }, [handleGetListOrderAdmin]);

  const handleChangeStatusOrder = async (id: string, value: string) => {
    try {
      setLoading(true);
      const res: any = await handleChangeStatusOrderAdminAPI(id, value);
      if (res?.success) {
        toast.success(res?.message);
        handleGetListOrderAdmin();
      }
      setLoading(false);
    } catch (error) {
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
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => <TextDisplay text={moment(text).format('HH:mm:ss DD/MM/YYYY')} />,
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
      key: 'action',
      render: (_: any, record: any) => (
        <Select
          value={record?.status}
          className="min-w-[150px]"
          onChange={(value) => handleChangeStatusOrder(record?.id, value)}
          options={[
            { value: StatusOrder.PENDING, label: 'Đang chờ xác nhận' },
            { value: StatusOrder.APPROVED, label: 'Đã xác nhận' },
            { value: StatusOrder.CANCELLED, label: 'Đã hủy' },
            { value: StatusOrder.DELIVER, label: 'Đang giao hàng' },
            { value: StatusOrder.DONE, label: 'Hoàn thành' },
          ]}
        />
      ),
    },
  ];
  return (
    <div className="OrderAdmin">
      <h2 className="mb-4">Đơn hàng</h2>
      <Table columns={columns} loading={loading} dataSource={listOrder} />
    </div>
  );
};

export default OrderAdmin;
