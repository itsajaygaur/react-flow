import { Outlet, Navigate } from 'react-router-dom'
import { checkAuth } from '../lib/api'
import { useEffect, useState } from 'react'

const PrivateRoutes = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function auth(){
            try {
                
                const isAuthenticated  =  await checkAuth()
                if(isAuthenticated){
                    setIsLoggedIn(true)
                    setIsLoading(false)
                } 
            } catch (error) {
                
            }finally{
                setIsLoading(false)
            }

            }

            auth()
    }, [])

    if(isLoading) return null

    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes