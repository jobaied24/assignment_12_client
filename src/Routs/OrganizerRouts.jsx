import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useUserRole from '../Hook/useUserRole';
import Loading from '../Loading';
import { Navigate } from 'react-router';

const OrganizerRouts = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const {role,roleLoading} = useUserRole();


    if(loading || roleLoading){
        return <Loading></Loading>
    };

    if(!user || role!=='organizer'){
        return <Navigate state={{from:location.pathname}} to='/forbidden'></Navigate>
    }

    return children;
};

export default OrganizerRouts;