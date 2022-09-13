import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Nav from './Nav.js';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState();
    
    const fetchData = React.useCallback(() => {
		const isValidated = async () => {
			const res = await axios.get(process.env.REACT_APP_GET_USER_AUTH, { withCredentials: true });
			if (!res.data) return navigate('/');
			setUser(res.data);
			return res.data;
		};

		isValidated();
	}, [navigate]);

    React.useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<React.Fragment>
            <Nav />
            Dashboard
        </React.Fragment>
	);
}

export default Dashboard;