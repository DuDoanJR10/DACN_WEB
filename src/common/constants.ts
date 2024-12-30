export const PAGINATION_DEFAULT = {
  page: 1,
  limit: 10,
  total: 0,
};

export enum StatusOrder {
  PENDING = 'pending', // user mới đặt hàng
  APPROVED = 'approved', // admin đã duyệt
  CANCELLED = 'cancelled', // user hủy đơn hàng / admin hủy đơn hàng
  DELIVER = 'deliver', // admin đang giao hàng
  DONE = 'done', // hoàn thành
}
