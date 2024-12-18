import { Button, Flex, Modal, Popconfirm, Space, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import ModalUpdate from '../components/ModalUpdate';
import ModalAdd from '../components/ModalAdd';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getListAccountAPI } from 'apis/account';
import { setListAccount } from 'store/slices/accountSlice';
import { handleErrorAPI } from 'utils/helpers';
import { AccountParams } from 'types/account';
import TextDisplay from 'components/TextDisplay';

const Account = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountParams>({} as AccountParams);

  const { listAccount } = useAppSelector((state) => state.account);

  const handleEdit = (record: AccountParams) => {};
  const handleDelete = (id: string) => {};
  const columns: any[] = [
    {
      title: 'STT',
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <TextDisplay text={text} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <TextDisplay text={text} />,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => <TextDisplay text={text} />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      render: (text: string) => <TextDisplay text={text ? 'ON' : 'OFF'} />,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: AccountParams) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
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

  const handleGetListAccount = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await getListAccountAPI();
      if (res?.success) {
        dispatch(
          setListAccount(
            res?.data?.map((account: AccountParams, index: number) => ({
              ...account,
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
    handleGetListAccount();
  }, [handleGetListAccount]);

  return (
    <div>
      <h2 className="mb-4">Tài khoản</h2>
      <Flex>
        <Button className="mb-4" type="primary" onClick={() => setOpenAdd(true)}>
          Thêm
        </Button>
      </Flex>
      <Table columns={columns} loading={loading} dataSource={listAccount} />
      <Modal
        footer={null}
        open={openUpdate}
        onCancel={() => setOpenUpdate(false)}
        onClose={() => setOpenUpdate(false)}
        maskClosable={false}
      >
        <ModalUpdate setOpen={setOpenUpdate} data={account} />
      </Modal>
      <Modal
        footer={null}
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        onClose={() => setOpenAdd(false)}
        maskClosable={false}
      >
        <ModalAdd setOpen={setOpenAdd} />
      </Modal>
    </div>
  );
};

export default Account;
