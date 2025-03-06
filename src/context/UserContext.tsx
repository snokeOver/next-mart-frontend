import { getCurrentUser } from "@/services/auth/getCurrentUser";
import { IChildren, IUser, IUserProvider } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<IUserProvider | undefined>(undefined);

const UserProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, []);

  const providerValues = {
    user,
    setUser,
    isLoading,
    setIsLoading,
  };

  return (
    <UserContext.Provider value={providerValues}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("userUser must be used within the userProvider");
  return context;
};

export default UserProvider;
