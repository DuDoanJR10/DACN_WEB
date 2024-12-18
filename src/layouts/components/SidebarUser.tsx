import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { SendOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { getListCategoryAPI } from 'apis/category';
import { setListCategory } from 'store/slices/categorySlice';
import { handleErrorAPI } from 'utils/helpers';
import '../styles/SidebarUser.scss';
import { Link } from 'react-router-dom';

const SidebarUser = () => {
  const dispatch = useAppDispatch();
  const { listCategory } = useAppSelector((state) => state.category);

  const handleGetListCategory = useCallback(async () => {
    try {
      const res: any = await getListCategoryAPI();
      if (res?.success) {
        dispatch(setListCategory(res?.data?.map((category: any, index: number) => ({ ...category, key: index + 1 }))));
      }
    } catch (error: any) {
      handleErrorAPI(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetListCategory();
  }, [handleGetListCategory]);

  return (
    <div className="SidebarUser w-[230px] bg-white rounded-lg p-4">
      <h2 className="text-lg text-primary font-semibold mb-2">Danh mục</h2>
      <Flex className="flex-col">
        {listCategory?.map((category) => (
          <Link
            to={`/product-by-category/${category?.id}`}
            className="SidebarUser__item flex items-center text-black gap-1.5 px-4 py-2 hover:bg-[#27272a1f] cursor-pointer rounded-lg"
            key={category?.id}
          >
            <SendOutlined className="SidebarUser__item__icon text-base font-bold" />
            <p className="SidebarUser__item__name text-base font-semibold">{category?.name}</p>
          </Link>
        ))}
      </Flex>
    </div>
  );
};

export default SidebarUser;
