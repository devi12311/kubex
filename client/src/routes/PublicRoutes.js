import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component }) => {
    return auth() ? component() : <Navigate to="/" replace={true} />
}

const auth = () => {
    return localStorage.getItem('token');
}

export default PrivateRoute
