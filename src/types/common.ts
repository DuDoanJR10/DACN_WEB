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
