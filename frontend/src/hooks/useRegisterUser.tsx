import { useState } from "react";
import {useNavigate} from "react-router-dom";

interface RegisterUserHook {
  registerUser: (firstname: string, lastname: string, username: string, email: string, password: string) => Promise<void>;
  error: string;
  success: string
}

export default function useRegisterUser ():RegisterUserHook {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const registerUser = async (firstname: string, lastname: string, username: string, email: string, password: string) => {

        setError('');
        setSuccess('');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            setTimeout(() => {
                setError("");
              }, 3000);
            return;
        }

        try {
          const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstname, lastname, username, email, password})
          });
          const data = await response.json();
          console.log(data);
    
          if(response.ok) {
            console.log(data);
            setSuccess('Registration Success!');
            navigate('/signin');
          }else{
            throw new Error(data.message || 'Registration Failed');
          }
        }catch(err:any){
          setError(err.message);
          setTimeout(() => {
            setError("");
          }, 3000);
          console.log(err);
        }
      };
      return {registerUser, error, success};
}
