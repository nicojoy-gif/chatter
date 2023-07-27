import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth } from '../Config/firebase'


interface UserContextValue {
  userUID: string | null;
}
interface UserContextProps {
    children: ReactNode;
  }

const initialUserContextValue: UserContextValue = {
  userUID: null,
};

const UserContext = createContext<UserContextValue>(initialUserContextValue);

export const useUserContext = () => useContext(UserContext);


  
  export const UserContextProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userUID, setUserUID] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user:any) => {
      if (user) {
        setUserUID(user.uid);
      } else {
        setUserUID(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userUID }}>{children}</UserContext.Provider>
  );
};
