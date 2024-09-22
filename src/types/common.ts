import { IconType } from 'react-icons';

export interface DataCookie {
  name: string;
  value: string;
  expDay: number;
}

export interface RouteProps {
  name?: string;
  path: string;
  element: React.FC;
  children?: RouteProps[] | null;
}

export interface NavParams {
  key: number;
  label: string;
  Icon: IconType;
  url: string;
}
