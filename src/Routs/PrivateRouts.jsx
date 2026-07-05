import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation} from 'react-router';
import Loading from '../Loading';

const PrivateRouts = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location);
    

    if(loading){
        return <Loading></Loading>
    };

    if(!user){
        return <Navigate state={{from:location.pathname}} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRouts;