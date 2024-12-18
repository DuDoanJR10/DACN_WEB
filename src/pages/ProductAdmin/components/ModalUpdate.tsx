import { Button, Flex, Form, Input, Select, Space, Upload } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { ProductAttributesParams, ProductParams } from 'types/product';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { getListCategoryAPI } from 'apis/category';
import { setListCategory } from 'store/slices/categorySlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { handleErrorAPI } from 'utils/helpers';
import { getDetailProductAPI, getListProductAPI, updateProductAPI } from 'apis/product';
import { setListProduct } from 'store/slices/productSlice';

interface ModalUpdateProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: ProductParams;
}

const ModalUpdate = ({ setOpen, data }: ModalUpdateProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [fileImageThumbnail, setFileImageThumbnail] = useState('');
  const [listFile, setListFile] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductParams>({} as ProductParams);

  const { listCategory } = useAppSelector((state) => state.category);

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

  const handleGetListCategory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getListCategoryAPI();
      dispatch(setListCategory(res?.data?.map((category: any, index: number) => ({ ...category, key: index + 1 }))));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetListCategory();
  }, [handleGetListCategory]);

  const handleGetDetailProduct = useCallback(async () => {
    try {
      const res = await getDetailProductAPI(data?.id);
      form.setFieldsValue({
        name: res?.data?.name,
        description: res?.data?.description,
        price_original: res?.data?.price_original?.toString(),
        price: res?.data?.price?.toString(),
        quantity_in_stock: res?.data?.quantity_in_stock?.toString(),
        category_id: res?.data?.category_id,
        product_attributes: res?.data?.product_attributes,
      });
      setListFile(res?.data?.image_urls);
      setFileImageThumbnail(res?.data?.thumbnail);
      setProduct(res?.data);
    } catch (error: any) {
      handleErrorAPI(error);
    }
  }, [data?.id, form]);

  useEffect(() => {
    handleGetDetailProduct();
  }, [handleGetDetailProduct]);

  const validateNumberInput = (_: any, value: string) => {
    if (!value || /^\d*$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Vui lòng nhập số hợp lệ!'));
  };

  const handleChangeUploadThumbnail = ({ file }: any) => {
    if (file?.status === 'done') {
      setFileImageThumbnail(file?.response?.data?.filename);
      toast.success(file?.response?.message);
    }
    if (file?.status === 'error') {
      setFileImageThumbnail('');
      toast.error(file?.response?.message);
    }
    if (file?.status === 'removed') {
      setFileImageThumbnail('');
    }
  };
  const handleChangeUploadListFile = ({ file }: any) => {
    if (file?.status === 'done') {
      setListFile([...listFile, file?.response?.data?.filename]);
      toast.success(file?.response?.message);
    }
    if (file?.status === 'error') {
      setListFile([]);
      toast.error(file?.response?.message);
    }
    if (file?.status === 'removed') {
      setListFile([]);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleUpdate = async (values: any) => {
    try {
      setLoading(true);
      if (!fileImageThumbnail) {
        setLoading(false);
        return toast.error('Vui lòng tải ảnh thumbnail!');
      }
      if (listFile?.length <= 0) {
        setLoading(false);
        return toast.error('Vui lòng tải ảnh sản phẩm!');
      }
      const res: any = await updateProductAPI(
        {
          name: values?.name,
          description: values?.description,
          price: Number(values?.price),
          thumbnail: fileImageThumbnail,
          image_urls: listFile,
          category_id: values?.category_id,
          price_original: Number(values?.price_original),
          product_attribute: values?.product_attributes?.map((item: ProductAttributesParams) => ({
            ...item,
            quantity: Number(item?.quantity),
          })),
        },
        product?.id,
      );
      if (res?.success) {
        toast.success(res?.message);
        handleGetListProduct();
        form.resetFields();
        setListFile([]);
        setFileImageThumbnail('');
        setOpen(false);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      handleErrorAPI(error);
    }
  };

  const filterOption = (input: any, option: any) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <h2 className="mt-4 text-center">Thông tin sản phẩm</h2>
      <Form
        form={form}
        className="update-product__form"
        name="update-product-form"
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="quantity_in_stock"
          label="Số lượng tồn kho"
          rules={[{ validator: validateNumberInput }, { required: true, message: 'Vui lòng nhập số lượng tồn kho!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price_original"
          label="Giá nhập"
          rules={[{ validator: validateNumberInput }, { required: true, message: 'Vui lòng nhập giá nhập!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá bán"
          rules={[{ validator: validateNumberInput }, { required: true, message: 'Vui lòng nhập giá bán!' }]}
        >
          <Input />
        </Form.Item>
        <Flex className="gap-1 mb-2 items-center">
          <p className="text-[#ff4d4f] text-[10px]">*</p>
          <p>Thumbnail</p>
        </Flex>
        <Upload
          name="file"
          action={`${process.env.API_URL}api/upload/image`}
          method="POST"
          onChange={handleChangeUploadThumbnail}
          maxCount={1}
          listType="picture-card"
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
          </div>
        </Upload>
        <Flex className="gap-1 mb-2 items-center">
          <p className="text-[#ff4d4f] text-[10px]">*</p>
          <p>Danh sách ảnh sản phẩm</p>
        </Flex>
        <Upload
          name="file"
          action={`${process.env.API_URL}api/upload/image`}
          method="POST"
          onChange={handleChangeUploadListFile}
          listType="picture-card"
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
          </div>
        </Upload>
        <Form.Item label="Danh mục" name="category_id">
          <Select
            options={listCategory?.map((category) => ({
              value: category?.id,
              label: category?.name,
            }))}
            showSearch
            filterOption={filterOption}
          ></Select>
        </Form.Item>
        <Flex className="gap-1 mb-2 items-center">
          <p className="text-[#ff4d4f] text-[10px]">*</p>
          <p>Danh sách size</p>
        </Flex>
        <Form.List name="product_attributes">
          {(fields) => (
            <div>
              {fields.map((field) => (
                <Flex key={field.name} className="gap-3">
                  <Form.Item className="grow" label="Size" name={[field.name, 'size']}>
                    <Input readOnly />
                  </Form.Item>
                  <Form.Item className="grow" label="Số lượng" name={[field.name, 'quantity']}>
                    <Input />
                  </Form.Item>
                </Flex>
              ))}
            </div>
          )}
        </Form.List>
        <Space align="center" className="w-full justify-end">
          <Form.Item className="m-0">
            <Button
              className="m-auto flex text-second items-center text-xl justify-center min-w-[140px] font-semibold"
              onClick={handleClose}
            >
              Đóng
            </Button>
          </Form.Item>
          <Form.Item className="m-0">
            <Button
              className="m-auto flex  text-white items-center text-xl justify-center min-w-[140px] font-semibold"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Lưu
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default ModalUpdate;
