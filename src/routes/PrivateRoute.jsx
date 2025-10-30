import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({children}) => {
    const {session} = useAuth();
    return <>
        {session ? <>{children}</> : <Navigate to="/sign-up"/>}
    </>
}
export default PrivateRoute;