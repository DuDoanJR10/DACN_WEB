import configs from 'configs';
import { FaFolderClosed, FaHouse, FaLayerGroup } from 'react-icons/fa6';
import { NavParams } from 'types/common';

const nav: NavParams[] = [
  { key: 0, label: 'Sản phẩm', url: configs.routesAdmin.productAdmin, Icon: FaHouse },
  { key: 1, label: 'Danh mục', url: configs.routesAdmin.category, Icon: FaLayerGroup },
  { key: 2, label: 'Hoá đơn', url: configs.routesAdmin.bill, Icon: FaFolderClosed },
];

export default nav;
