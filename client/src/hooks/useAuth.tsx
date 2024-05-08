import { checkAuth } from '../lib/api'
import { useEffect, useState } from 'react'

export default function useAuth(){

    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function authenticate() {
        try {
          const isAuthenticated = await checkAuth();
          if (isAuthenticated) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          // Handle authentication error if needed
        } finally {
          setIsLoading(false);
        }
      }
  
      authenticate();
    }, []);
  
    return { isLoggedIn, isLoading };
  };