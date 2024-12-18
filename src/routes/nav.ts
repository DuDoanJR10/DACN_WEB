import configs from 'configs';
import { FaFolderClosed, FaHouse, FaLayerGroup, FaUser } from 'react-icons/fa6';
import { NavParams } from 'types/common';

const nav: NavParams[] = [
  { key: 0, label: 'Báo cáo', url: configs.routesAdmin.report, Icon: FaHouse },
  { key: 1, label: 'Sản phẩm', url: configs.routesAdmin.productAdmin, Icon: FaHouse },
  { key: 2, label: 'Danh mục', url: configs.routesAdmin.category, Icon: FaLayerGroup },
  { key: 3, label: 'Tài khoản', url: configs.routesAdmin.account, Icon: FaUser },
  { key: 4, label: 'Hoá đơn', url: configs.routesAdmin.bill, Icon: FaFolderClosed },
];

export default nav;
