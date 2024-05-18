import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loading from './Loading';

export default function PrivateRoutes(){

    const { isLoggedIn, isLoading } = useAuth();
    if(isLoading) return <Loading />  

    return(
        !isLoggedIn ? <Outlet/> : <Navigate to="/"/>
    )
}
