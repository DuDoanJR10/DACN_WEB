import React from 'react';
import '../styles/HeaderAdmin.scss';
import { Button, Dropdown, Flex, Layout } from 'antd';
import { FaArrowRightFromBracket, FaCircleUser } from 'react-icons/fa6';
import { useAppDispatch } from 'store/hooks';
import { setIsAdmin, setIsLogin } from 'store/slices/authSlice';
import { saveCookie } from 'utils/helpers';
import { destroyLogged, saveAccessToken } from 'utils/jwt';
import { useNavigate } from 'react-router';

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(setIsAdmin(false));
    dispatch(setIsLogin(false));
    destroyLogged();
    navigate('/login');
  };
  const items = [
    {
      key: '0',
      label: (
        <Flex onClick={() => handleLogout()} className="items-center">
          <FaArrowRightFromBracket className="mr-2 text-base" />
          <p>Đăng xuất</p>
        </Flex>
      ),
    },
  ];
  return (
    <Layout.Header className="flex fixed right-0 left-[245px] z-[99] shadow-md bg-white h-[60px] py-0 px-4 items-center justify-end">
      <Dropdown menu={{ items }}>
        <Button
          className="!h-10 flex items-center box-shadow"
          type="primary"
          icon={<FaCircleUser className="text-2xl" />}
        >
          Admin
        </Button>
      </Dropdown>
    </Layout.Header>
  );
};

export default HeaderAdmin;
