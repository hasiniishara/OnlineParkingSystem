import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'


interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  verifyToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
 
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [userRole, setUserRole] = useState<string | null>(null);



const verifyToken = async()=>{
  setIsLoading(true);
  const token = localStorage.getItem('token');
  if(!token){
    setIsAuthenticated(false);
    setIsLoading(false);
    return;
  }

  try{
    const response = await fetch('http://localhost:3000/api/auth/verifyToken',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    });
    if(response.ok){
      const data = await response.json();
      setIsAuthenticated(true);
      setUserRole(data.role[0]);
      console.log('Verified role:', data.role[0]);
    }else{
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }catch(error:any){
    console.log(error);
    setIsLoading(false);
    setIsAuthenticated(false);
  }
};

useEffect(()=>{
  verifyToken()
}, []);

const login = (token: string, role:string) =>{
  localStorage.setItem('token', token);
  setIsAuthenticated(true);
  setUserRole(role);
};

const logout =() =>{
  localStorage.removeItem('token');
  setIsAuthenticated(false)
  setUserRole(null);
};

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, isAuthenticated, userRole, verifyToken}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

