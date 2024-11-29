import React from 'react';
import '../styles/Header.scss';
import { Button, Flex, Input, Popover } from 'antd';
import { FaHome, FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { FaRegUser, FaSearchengin } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Flex className="Header bg-[#f7e9fc] h-16 px-8" justify="space-between" align="center">
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
            <div>
              <p>Thông tin tài khoản</p>
            </div>
          }
        >
          <Button className="bg-[#f0d5fa] rounded-full p-0 w-10 h-10 Header__button__account" type="primary">
            <FaRegUser className="text-primary text-base icon-account" />
          </Button>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default Header;
