import configs from 'configs';
import { FaFolderClosed, FaHouse, FaLayerGroup, FaUser } from 'react-icons/fa6';
import { NavParams } from 'types/common';

const nav: NavParams[] = [
  { key: 0, label: 'Sản phẩm', url: configs.routesAdmin.productAdmin, Icon: FaHouse },
  { key: 1, label: 'Danh mục', url: configs.routesAdmin.category, Icon: FaLayerGroup },
  { key: 2, label: 'Tài khoản', url: configs.routesAdmin.account, Icon: FaUser },
  { key: 3, label: 'Đơn hàng', url: configs.routesAdmin.orderAdmin, Icon: FaFolderClosed },
];

export default nav;
