import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

const PrivateRoute = ({ children }) => {
    const { loading, session } = useAuth();

    if (loading) {
        return <CircularProgress size="3rem" />;
    }
    return <>
        {session ? <>{children}</> : <Navigate to="/sign-up" />}
    </>
}
export default PrivateRoute;