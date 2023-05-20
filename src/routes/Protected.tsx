import React, { useContext, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'

import AuthContext from '../contexts/AuthContext';

function Protected(props: {component: any}) {
    const { component } = props;
    const { token } = useContext(AuthContext);

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/');
        }

    }, [token])

    return <>
    {component()}
    </>;
}
export default Protected