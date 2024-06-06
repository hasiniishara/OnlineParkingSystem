import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginUserHook {
  loginUser: (username: string, password: string) => Promise<void>;
  error: string;
  success: string
}

export default function useLoginUser ():LoginUserHook {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const loginUser = async (username: string, password: string) => {

        setError('');
        setSuccess('');
        
        try {
          const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
          });
          const data = await response.json();
          console.log(data);
    
          if(response.ok) {
            login(data.token);
            console.log(data);
            setSuccess('Login Successfully!');
            navigate('/dashboard');
          }else{
            throw new Error(data.message || 'Login Failed');
          }
        }catch(err:any){
          setError(err.message);
          setTimeout(() => {
            setError("");
          }, 3000);
          console.log(err);
        }
      };
      return {loginUser, error, success};
}
