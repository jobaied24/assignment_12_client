import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate} from 'react-router';
import Loading from '../Loading';

const PrivateRouts = ({children}) => {
    const {user,loading} = useContext(AuthContext);

    if(loading){
        return <Loading></Loading>
    };

    if(!user){
        return <Navigate to='/login'></Navigate>
    }

    return children;
};

export default PrivateRouts;