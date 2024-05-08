import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function PrivateRoutes(){

    const { isLoggedIn, isLoading } = useAuth();
    if(isLoading) return null

    return(
        !isLoggedIn ? <Outlet/> : <Navigate to="/"/>
    )
}
