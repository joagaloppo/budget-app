import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth() {
	const navigate = useNavigate();
	const [input, setInput] = React.useState({username: "", password: ""});
    const [login, setLogin] = React.useState(true);

	React.useEffect(() => {
		axios
			.get(process.env.REACT_APP_GET_USER_AUTH, { withCredentials: true })
			.then((res) => {
				if (res.data) navigate('/dashboard');
			})
			.catch((err) => console.log(err));
	}, [navigate]);

	const handleChange = (e) => { setInput({ ...input, [e.target.name]: e.target.value, }); };

	const handleSubmit = (e) => { 
		e.preventDefault();

		axios
			.post(e.target.name === "login"
            ? process.env.REACT_APP_POST_USER_LOGIN
            : process.env.REACT_APP_POST_USER_REGISTER,
            input, { withCredentials: true })
			.then(() => { login ? navigate("/dashboard") : setLogin(true); setInput({username: "", password: ""});})
			.catch((err) => console.log(err.response.data.message));
	};

	return (
		<div className='form auth'>
			<div className='box auth'>
				<h2> { login ? "Login" : "Register" } </h2>
				<form>
					<div>
						<input type="email" placeholder="Email" name="username" value={input.username} onChange={(e) => {handleChange(e); }}/>
					</div>
					<div>
						<input type="password" placeholder="Password" name="password" value={input.password} onChange={(e) => {handleChange(e); }}/>
					</div>
					<button name={login ? "login" : "register"} onClick={(e) => handleSubmit(e)}> { login ? "Login" : "Register" } </button>
				</form>
				<span onClick={() => {setLogin(!login); setInput({username: "", password: ""}); }}>{ login ? "Don't have an account?" : "Already have an account?" }</span>
			</div>
    </div>
    );
}

export default Auth;
