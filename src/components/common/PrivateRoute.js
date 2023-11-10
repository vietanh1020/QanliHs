import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const [cookie] = useCookies(['user']);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!cookie.user) navigate('/login');
    }, [cookie.user]);

    useEffect(() => {
        if (location.pathname.includes('/admin') && cookie.user.role != 1) {
            navigate('/');
        }
    }, [location.pathname, cookie.user]);
    return <>{cookie.user && <div>{children}</div>}</>;
}
