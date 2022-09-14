import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Nav from './Nav.js';
import Summary from './Summary.js';
import Manage from './Manage.js';

function Dashboard() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = React.useState();
	const [transactions, setTransactions] = React.useState([]);

	const fetchData = React.useCallback(() => {
		const isValidated = async () => {
			const res = await axios.get(process.env.REACT_APP_GET_USER_AUTH, { withCredentials: true });
			if (!res.data) return navigate('/');
			setUser(res.data);
			return res.data;
		};

		const fetchTransactions = async (id) => {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/transaction/${id}`);
			setTransactions(res.data);
			return res.data;
		};

		isValidated()
			.then((e) => fetchTransactions(e.id))
			.catch((err) => console.log(err));
	}, [navigate]);

	const balance = (list) => {
		let sum = 0;
		list.forEach((e) => {
			e.type === 'in' ? (sum += e.amount) : (sum -= e.amount);
		});
		return sum;
	};

	React.useEffect(() => {
		console.log("Slug:", slug)
		fetchData();
	}, [fetchData]);

	return (
		<React.Fragment>
			{user && <Nav user={user} />}
			{slug === 'manage' ? <Manage user={user} transactions={transactions} balance={balance} fetchData={fetchData} />
			: !slug ? <Summary transactions={transactions} balance={balance} /> : null}
		</React.Fragment>
	);
}

export default Dashboard;