export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop?: boolean;
  isActive?: boolean;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}

export interface IUserProvider {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: (state: boolean) => void;
}
