import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from 'react-toastify';

const unmatchUrl = [
    '/auth/login'
];

export default function SafeRoutes({roles, children}) {
    // main logic
    const { user } = useContext(UserContext);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigateQuery = searchParams.get('redirectTo');

    if(user.isLoading){
        return <Loading />
    }
    
    if(unmatchUrl.includes(location.pathname)){
        if(user.isLoggedIn){
            return <Navigate to={navigateQuery || '/'} replace />
        }
        return children;
    }

    if(!user.isLoggedIn){
        return <Navigate to={`/auth/login?redirectTo=${location.pathname}`} replace />
    }

    if(roles.length>0 && !roles.includes(user.role)){
        toast.error('You do not have permission to access');
        return <Navigate to={'/'} replace />
    }

    return children;
}
