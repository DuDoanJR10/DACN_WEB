import { Button, Flex, Modal, Popconfirm, Space, Table } from 'antd';
import { deleteCategoryAPI, getListCategoryAPI } from 'apis/category';
import TextDisplay from 'components/TextDisplay';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setListCategory } from 'store/slices/categorySlice';
import { handleErrorAPI } from 'utils/helpers';
import CategoryDetail from '../components/CategoryDetail';
import { CategoryParams } from 'types/category';
import { toast } from 'react-toastify';

const Category = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryParams>();
  const { listCategory } = useAppSelector((state) => state.category);

  const handleGetListCategory = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await getListCategoryAPI();
      if (res?.success) {
        dispatch(setListCategory(res?.data?.map((category: any, index: number) => ({ ...category, key: index + 1 }))));
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetListCategory();
  }, [handleGetListCategory]);

  const handleEdit = (record: CategoryParams) => {
    setCategory(record);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res: any = await deleteCategoryAPI(id);
      if (res?.success) {
        toast.success(res?.message);
        handleGetListCategory();
      }
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
      title: 'Tên danh mục',
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
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: CategoryParams) => (
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

  return (
    <div>
      <h2 className="mb-4">Danh mục</h2>
      <Flex>
        <Button className="mb-4" type="primary" onClick={() => setOpen(true)}>
          Thêm
        </Button>
      </Flex>
      <Table columns={columns} loading={loading} dataSource={listCategory} />
      <Modal
        maskClosable={false}
        open={open}
        onClose={() => {
          setOpen(false);
          setCategory(undefined);
        }}
        onCancel={() => {
          setOpen(false);
          setCategory(undefined);
        }}
        footer={null}
      >
        <CategoryDetail category={category} setCategory={setCategory} open={open} setOpen={setOpen} />
      </Modal>
    </div>
  );
};

export default Category;
