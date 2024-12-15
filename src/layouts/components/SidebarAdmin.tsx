import React, { useEffect, useState } from 'react';
import '../styles/SidebarAdmin.scss';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import nav from 'routes/nav';

const SidebarAdmin = () => {
  const location = useLocation();
  const [active, setActive] = useState<string>(
    nav
      ?.map((item) => item?.url)
      ?.findIndex((link) => link === location.pathname.slice(1))
      .toString(),
  );

  useEffect(() => {
    setActive(
      nav
        ?.map((item) => item?.url)
        ?.findIndex((link) => link === location.pathname.slice(1))
        .toString(),
    );
  }, [location.pathname]);

  return (
    <div className="Sidebar bg-second fixed shrink-0 overflow-auto h-screen text-white w-[245px]">
      <div className="flex w-full flex-col justify-between h-full">
        <div className="h-fit">
          <Link to="/" className="block bg-second">
            <p className="Sidebar__logo font-kaushan border-b-4 border-white bg-second text-third my-0 mx-3 pl-[18px] text-3xl leading-[44px] py-2">
              Nike Store
            </p>
          </Link>
          <Menu
            className="h-fit bg-second px-3 py-5"
            mode="vertical"
            items={nav?.map(({ key, Icon, label, url }) => ({
              key: key,
              label: <Link to={url}>{label}</Link>,
              icon: (
                <div className="Sidebar__icon">
                  <Icon className="icon-menu" />
                </div>
              ),
            }))}
            selectedKeys={[active]}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
