import React from 'react';
import '../styles/Header.scss';
import { Button, Flex, Input, Popover } from 'antd';
import { FaHome, FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { FaRegUser, FaSearchengin } from 'react-icons/fa6';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { setIsAdmin, setIsLogin } from 'store/slices/authSlice';
import { destroyLogged } from 'utils/jwt';

const HeaderUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setIsAdmin(false));
    dispatch(setIsLogin(false));
    destroyLogged();
    navigate('/login');
  };
  return (
    <div className="bg-[#f7e9fc]">
      <Flex className="Header container h-16" justify="space-between" align="center">
        <Link to="/" className="!text-primary font-kaushan font-semibold text-3xl">
          Elly Store
        </Link>
        <Flex className="gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'Header__button Header__button--active' : 'Header__button')}
          >
            <FaHome className="Header__button__icon" />
            <p>Home</p>
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) => (isActive ? 'Header__button Header__button--active' : 'Header__button')}
          >
            <FaShoppingBag className="Header__button__icon" />
            <p>Explore</p>
          </NavLink>
          <NavLink
            to="/carts"
            className={({ isActive }) => (isActive ? 'Header__button Header__button--active' : 'Header__button')}
          >
            <FaShoppingCart className="Header__button__icon" />
            <p>Carts</p>
          </NavLink>
        </Flex>
        <Flex className="gap-x-4" align="center">
          <Flex className="relative w-[250px]" align="center">
            <Input className="w-full rounded-full bg-[#f0d5fa] border-none text-base h-10 pr-16" placeholder="Search" />
            <Button type="primary" className="absolute right-0 top-0 bottom-0 rounded-full p-0 w-14">
              <FaSearchengin className="text-base" />
            </Button>
          </Flex>
          <Popover
            placement="bottomRight"
            content={
              <Flex className="flex-col gap-2">
                <Link to="/account" className="flex !text-primary">
                  <p className="text-primary">Thông tin tài khoản</p>
                </Link>
                <Link to="/login" onClick={handleLogout} className="flex !text-primary">
                  <p className="text-primary">Đăng xuất</p>
                </Link>
              </Flex>
            }
          >
            <Button className="bg-[#f0d5fa] rounded-full p-0 w-10 h-10 Header__button__account" type="primary">
              <FaRegUser className="text-primary text-base icon-account" />
            </Button>
          </Popover>
        </Flex>
      </Flex>
    </div>
  );
};

export default HeaderUser;
