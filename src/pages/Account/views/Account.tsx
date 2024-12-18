import { Button, Flex, Modal, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import ModalUpdate from '../components/ModalUpdate';
import ModalAdd from '../components/ModalAdd';
import { useAppDispatch } from 'store/hooks';
import { getListAccountAPI } from 'apis/account';
import { setListAccount } from 'store/slices/accountSlice';
import { handleErrorAPI } from 'utils/helpers';

const Account = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [account, setAccount] = useState();

  const columns: any[] = [];

  const handleGetListAccount = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await getListAccountAPI();
      if (res?.success) {
        dispatch(setListAccount(res?.data));
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
      <Table columns={columns} loading={loading} />
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
