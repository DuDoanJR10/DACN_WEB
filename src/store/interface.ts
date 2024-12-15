export interface AuthState {
  isLogin: boolean;
  isAdmin: boolean;
  user: {
    email: string;
    id?: number;
    name: string;
    phone?: string;
  };
}
