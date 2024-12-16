import { Button, Form, Input, Space } from 'antd';
import { createCategoryAPI, getListCategoryAPI, updateCategoryAPI } from 'apis/category';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store/hooks';
import { setListCategory } from 'store/slices/categorySlice';
import { CategoryParams } from 'types/category';
import { handleErrorAPI } from 'utils/helpers';

interface CategoryDetailProps {
  open: boolean;
  category?: CategoryParams;
  setCategory: React.Dispatch<React.SetStateAction<CategoryParams | undefined>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const { TextArea } = Input;

const CategoryDetail = ({ category, open, setOpen, setCategory }: CategoryDetailProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleGetListCategory = async () => {
    try {
      setLoading(true);
      const res = await getListCategoryAPI();
      dispatch(setListCategory(res?.data?.map((category: any, index: number) => ({ ...category, key: index + 1 }))));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      setLoading(true);
      if (category) {
        const res: any = await updateCategoryAPI({
          id: category?.id as string,
          name: values?.name as string,
          description: values?.description as string,
          image: 'https://images.asics.com/is/image/asics/1011B796_001_SR_RT_GLB?$sfcc-product$',
        });
        if (res?.message) {
          toast.success(res?.message);
          handleGetListCategory();
          setOpen(false);
          setCategory(undefined);
          form.resetFields();
        }
      } else {
        const res: any = await createCategoryAPI({
          name: values?.name as string,
          description: values?.description as string,
          image: 'https://images.asics.com/is/image/asics/1011B796_001_SR_RT_GLB?$sfcc-product$',
        });
        if (res?.message) {
          toast.success(res?.message);
          handleGetListCategory();
          setOpen(false);
          setCategory(undefined);
          form.resetFields();
        }
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        name: category?.name,
        description: category?.description,
      });
    }
  }, [category?.description, category?.name, form, open]);

  const handleClose = () => {
    setOpen(false);
    setCategory(undefined);
    form.resetFields();
  };
  return (
    <div>
      <h2 className="mt-4 text-center">Thông tin danh mục</h2>
      <Form
        form={form}
        className="update-category__form"
        name="update-category-form"
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
          <TextArea />
        </Form.Item>
        <Space align="center" className="w-full justify-end">
          <Form.Item className="m-0">
            <Button
              className="m-auto flex items-center text-xl justify-center min-w-[140px] font-semibold"
              onClick={handleClose}
            >
              Hủy
            </Button>
          </Form.Item>
          <Form.Item className="m-0">
            <Button
              className="m-auto flex items-center text-xl justify-center min-w-[140px] font-semibold"
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              {category ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default CategoryDetail;
