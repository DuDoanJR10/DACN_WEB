import { Button, Flex } from 'antd';
import { getDetailProductUserAPI } from 'apis/product';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductParams } from 'types/product';
import { formatPrice, handleErrorAPI } from 'utils/helpers';
import { FaBagShopping, FaCartPlus } from 'react-icons/fa6';
import '../styles/ProductDetail.scss';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import SlideProduct from '../components/SlideProduct';
import { addCartAPI } from 'apis/cart';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store/hooks';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<ProductParams>({} as ProductParams);
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>('');

  const handleGetDetailProduct = async (idProduct: string) => {
    try {
      const res: any = await getDetailProductUserAPI(idProduct);
      if (res?.success) {
        setProduct(res?.data);
      }
    } catch (error) {
      handleErrorAPI(error);
    }
  };

  useEffect(() => {
    handleGetDetailProduct(id as string);
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const item = product?.product_attributes?.find((data) => data?.size === size);
      const res: any = await addCartAPI({
        quantity: quantity,
        productAttrId: item?.id as string,
      });
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      handleErrorAPI(error);
    }
  };

  const handleBuyNow = () => {
    if (!size) {
      return toast.error('Vui lòng chọn kích thước!');
    }
    const item = product?.product_attributes?.find((data) => data?.size === size);
    navigate('/order-now', {
      state: {
        productAttrId: item?.id as string,
        quantity: quantity,
        product: product,
      },
    });
  };

  return (
    <Flex className="ProductDetail mt-4 gap-4">
      <div className="w-[500px] bg-white p-4 rounded-xl">
        <Flex className="w-full h-[500px] relative border border-solid border-gray-300 rounded-xl overflow-hidden">
          <img className="w-full h-full " src={`${process.env.API_URL}uploads/${product?.thumbnail}`} alt="img" />
          <Flex className="ProductDetail__quantity absolute px-2 py-1 items-center gap-1 bg-white top-2 right-2">
            <FaBagShopping className="text-black" />
            <p className="text-black font-medium">{product?.quantity_in_stock}</p>
          </Flex>
        </Flex>
        <SlideProduct data={product?.image_urls} />
      </div>
      <div className="bg-white relative p-4 rounded-xl flex-grow">
        <h2 className="text-primary text-3xl font-semibold">{product?.name}</h2>
        <p className="mt-1 text-gray-500 text-base font-medium">{product?.description}</p>
        <p className="text-[#ff0000] font-semibold text-3xl mt-3">{`${formatPrice(product?.price)} đ`}</p>
        <p className="text-black font-medium mt-4 text-xl">Chọn size:</p>
        <Flex className="gap-3 mt-2">
          {product?.product_attributes?.map((attr) =>
            attr?.quantity > 0 ? (
              <Flex
                onClick={() => setSize(attr?.size)}
                className={`ProductDetail__size-item hover:bg-primary ${attr?.size === size ? 'ProductDetail__size-item__active' : ''}`}
                key={attr?.id}
              >
                <p
                  className={` font-medium ProductDetail__size-item__label ${attr?.size === size ? 'text-white' : 'text-primary'}`}
                >
                  {attr?.size}
                </p>
              </Flex>
            ) : (
              <></>
            ),
          )}
        </Flex>
        <p className="text-black font-medium mt-4 text-xl">Chọn số lượng:</p>
        <Flex className="items-center gap-4 mt-2">
          <Flex
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
            className="w-10 h-10 border bg-primary rounded-lg items-center justify-center cursor-pointer"
          >
            <MinusOutlined className="text-white font-semibold text-base cursor-pointer" />
          </Flex>
          <Flex className="w-10 h-10 border border-primary border-solid rounded-lg items-center justify-center">
            <p className="text-primary text-lg font-semibold">{quantity}</p>
          </Flex>
          <Flex
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 border bg-primary rounded-lg items-center justify-center cursor-pointer"
          >
            <PlusOutlined className="text-white font-semibold text-base cursor-pointer" />
          </Flex>
        </Flex>
        <Flex className="absolute bottom-4 left-4 right-4 justify-between gap-5 items-center mt-10">
          <Button onClick={handleAddToCart} className="flex gap-2 items-center flex-grow text-xl py-3" type="primary">
            <FaCartPlus />
            Thêm vào giỏ hàng
          </Button>
          <Button onClick={handleBuyNow} className="flex-grow text-xl py-3" type="primary">
            Mua ngay
          </Button>
        </Flex>
      </div>
    </Flex>
  );
};

export default ProductDetail;
