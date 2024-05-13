import { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
