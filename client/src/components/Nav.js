import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Nav( { user } ) {

    const navigate = useNavigate();
    const handleLogOut = () => {
        axios.post(process.env.REACT_APP_POST_USER_LOGOUT, null, { withCredentials: true })
            .then(() => navigate("/") )
            .catch(err => console.log(err.response.data) )
    }

    return (
		<div className='nav'>
            <div className='container'>
                <h1>Budget App</h1>
                <span>{user.email}<i href="#" onClick={() => handleLogOut()} className="logout">Logout</i></span>
            </div>
        </div>
	);
}

export default Nav;