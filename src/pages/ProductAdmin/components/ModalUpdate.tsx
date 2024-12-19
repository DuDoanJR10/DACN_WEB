import { Button, Flex, Form, Input, message, Modal, Select, Space, Upload } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ProductAttributesParams, ProductParams } from 'types/product';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { getListCategoryAPI } from 'apis/category';
import { setListCategory } from 'store/slices/categorySlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { handleErrorAPI } from 'utils/helpers';
import { getDetailProductAPI, getListProductAPI, updateProductAPI } from 'apis/product';
import { setListProduct } from 'store/slices/productSlice';
import { RcFile, UploadFile } from 'antd/es/upload';
import { uploadImageApi } from 'apis/upload';
import { v4 as uuid } from 'uuid';

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
  const [loadingThumbnail, setLoadingThumbnail] = useState(false);
  const [loadingAlbum, setLoadingAlbum] = useState(false);
  // Image
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const debounceRef = useRef(null);

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

      setImageUrl(`${process.env.API_URL}uploads/${res?.data?.thumbnail}`);
      setFileList(
        res?.data?.image_urls?.map((item: string, index: number) => ({
          uid: index,
          name: 'image.png',
          status: 'done',
          url: `${process.env.API_URL}uploads/${item}`,
        })) as UploadFile[],
      );

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
          thumbnail: imageUrl ? imageUrl.split('uploads/')[1] : '',
          image_urls: fileList.map((item) => (item.url ? item.url.split('uploads/')[1] : '')) as any,
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

  const uploadButtonThumbnail = (
    <div>
      {loadingThumbnail ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadButtonAlbum = (
    <div>
      {loadingAlbum ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = async (file: RcFile) => {
    return new Promise((resolve, reject) => {
      const typeNameFile = file.name.split('.')[file.name.split('.').length - 1];

      const isTypeNameFile =
        typeNameFile === 'jpg' || typeNameFile === 'jpeg' || typeNameFile === 'png' || typeNameFile === 'svg';

      const isJpgOrPng =
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/svg+xml';
      if (!isJpgOrPng || !isTypeNameFile) {
        message.error('Invalid file format. Please try again!');
        reject(new Error('Error'));
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('The maximum allowed photo upload size is 5MB');
        reject(new Error('Error'));
      }

      resolve(file);
    }).catch(() => {
      return false;
    });
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
    setPreviewTitle('Image product');
  };

  const customUploadImage = async (file: RcFile) => {
    setLoadingThumbnail(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadImageApi(formData);
      console.log('resresresresresresres image', res);

      if (res.data.data) {
        setImageUrl(`${process.env.API_URL}uploads/${res.data.data.filename}`);
      } else {
        message.error('Upload image failed');
      }
    } catch (error) {
      message.error('Upload image failed');
    }
    setLoadingThumbnail(false);
  };

  const customUploadImageList = async (files: any[]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoadingAlbum(true);
      const listAblum = files.filter((item) => item.status === 'done');

      try {
        for (let i = 0; i < files.length; i++) {
          const dataBeforeUpload = await beforeUpload(files[i].originFileObj);
          const isBeforeUpload = dataBeforeUpload ? true : false;
          const check = files[i].status ? false : isBeforeUpload;

          if (check) {
            const formData = new FormData();
            formData.append('file', files[i].originFileObj);
            const res = await uploadImageApi(formData);

            if (res.data.data) {
              const uid = uuid();
              listAblum.push({
                uid: uid,
                name: 'image.png',
                status: 'done',
                url: `${process.env.API_URL}uploads/${res.data.data.filename}`,
              });
            } else {
              message.error('Upload image failed');
            }
          }
        }
        console.log('listAblum', listAblum);
        setFileList(listAblum);
        setLoadingAlbum(false);
      } catch (error) {
        console.log('error', error);
        message.error('Upload image failed');
        setLoadingAlbum(false);
      }
    }, 500) as unknown as null;
    setLoadingAlbum(false);
  };

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
          listType="picture-card"
          className="avatar-uploader"
          beforeUpload={beforeUpload}
          fileList={imageUrl ? [{ uid: '-1', name: 'image.png', status: 'done', url: imageUrl }] : []}
          customRequest={({ file }) => customUploadImage(file as RcFile)}
          onRemove={() => {
            setImageUrl('');
          }}
          onPreview={handlePreview}
        >
          {imageUrl ? null : uploadButtonThumbnail}
        </Upload>

        <Flex className="gap-1 mb-2 items-center mt-3">
          <p className="text-[#ff4d4f] text-[10px]">*</p>
          <p>Danh sách ảnh sản phẩm</p>
        </Flex>
        <Upload
          listType="picture-card"
          className="avatar-uploader mb-3"
          beforeUpload={() => false}
          fileList={fileList}
          onRemove={(file) => {
            setFileList(fileList.filter((item) => item.uid !== file.uid));
          }}
          onPreview={handlePreview}
          accept="image/png, image/jpeg, image/jpg, image/svg+xml"
          multiple
          onChange={({ fileList }) => customUploadImageList(fileList)}
          maxCount={10}
        >
          {fileList.length >= 10 ? null : uploadButtonAlbum}
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
      <Modal width={700} open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img className="w-full object-contain" alt="example" src={previewImage} />
      </Modal>
    </div>
  );
};

export default ModalUpdate;
