import { APP_CONFIG } from 'utils/env';
import { DataCookie } from 'types/common';
import moment from 'moment';
import { toast } from 'react-toastify';
import { history } from 'routes/history';

export const getCookie = (cookieName: string | undefined) => {
  if (!cookieName) {
    return;
  }
  const decodedCookie = decodeURIComponent(document.cookie);
  const listCookies = decodedCookie.split(';');
  for (let i = 0; i < listCookies.length; i++) {
    let cookie = listCookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length + 1, cookie.length);
    }
  }
  return '';
};

export const saveCookie = (dataCookie: DataCookie) => {
  if (!dataCookie?.name) {
    return;
  }
  const date = new Date();
  date.setTime(date.getTime() + dataCookie.expDay * 24 * 60 * 60 * 1000);
  document.cookie = `${dataCookie.name}=${dataCookie.value}; expires=${date.toUTCString()}; path=/;`;
};

export const deleteCookie = (nameCookie: string | undefined) => {
  if (!nameCookie) {
    return;
  }
  document.cookie = nameCookie + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
};

export const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

export const toastUnknowError = () => toast.error('Có lỗi xảy ra vui lòng thử lại!');

export const isEmpty = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};
export const formatNumber = (value: string | number) => {
  const phoneNumber = value + '';
  const list = phoneNumber.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
};

export const validationPhone = (value: string, callback: any) => {
  if (/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)) {
    return callback();
  }
  return callback('Số điện thoại chưa đúng định dạng');
};

export const stringToSlug = (str: string): string => {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '-');

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-');

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, '');

  // return
  return str;
};

export const getUrlImage = (url = '') => {
  return url && url !== '' ? APP_CONFIG.apiUrl + url : null;
};

export const getExpirationDate = (jwtToken: string) => {
  if (!jwtToken) {
    return null;
  }

  const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

  // multiply by 1000 to convert seconds into milliseconds
  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

const countDecimals = (value: number) => {
  if (!value) return 0;
  if (value % 1 !== 0) return value?.toString()?.split('.')[1]?.length;
  return 0;
};

export const formatPrice = (value: number, round = 0, division = '.') => {
  if (value !== 0 && !value) {
    return '';
  }
  const count = countDecimals(value);
  if (!round || !count) {
    return `${value?.toFixed(round)}`?.replace(/\B(?=(\d{3})+(?!\d))/g, division);
  } else {
    return `${value?.toFixed(round)}`?.replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
};

export const formatPriceVND = (value: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

export const checkImageFile = (data: File[]): boolean => {
  for (const key in data) {
    const file = data[key];
    if (file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpeg') {
      return false;
    }
  }
  return true;
};

export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const deleteEmptyPropertiesObj = (obj: any) => {
  Object.keys(obj).forEach((k) => obj[k] === '' && delete obj[k]);
};

export const removeVietnameseTones = (str: string) => {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  return str;
};

export const filterOptionSelect = (
  input: string,
  option?: {
    label?: any;
    value?: any;
  },
) => {
  const normalizedInput = removeVietnameseTones(input.toLowerCase().trim());
  const normalizedLabel = removeVietnameseTones(option?.label.toLowerCase());
  return normalizedLabel.includes(normalizedInput);
};

export const handleDisplayTimeToNow = (pastDate: string) => {
  const now = moment();
  const past = moment(pastDate);
  const duration = moment.duration(now.diff(past));
  if (duration.asWeeks() > 1) {
    return past.format('DD MMMM [at] HH:mm');
  } else {
    return past.fromNow();
  }
};
