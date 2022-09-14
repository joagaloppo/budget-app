import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth() {
	const navigate = useNavigate();
	const [input, setInput] = React.useState({username: "", password: ""});
	const [error, setError] = React.useState({});
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
        const err = handleValidation();
        if (err.username || err.password ) return setError(err);
		axios
			.post(e.target.name === "login"
            ? process.env.REACT_APP_POST_USER_LOGIN
            : process.env.REACT_APP_POST_USER_REGISTER,
            input, { withCredentials: true })
			.then(() => { login ? navigate("/dashboard") : setLogin(true); setError({}); setInput({username: "", password: ""});})
			.catch((err) => setError({database: err.response.data.message}));
	};

    const handleValidation = (e) => {
        const err = {username:"", password: ""};
        if (!login) {
            if (!input.username) err.username = "Email is missing"
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.username)) err.username = "Email is not valid"
            else err.username = "";
            if (!input.password) err.password = "Password is missing"
            else if (input.password.length < 6) err.password = "Password is too short"
            else err.password = "";
        } else {
            if (!input.username) err.username = "Email is missing"
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.username)) err.username = "Enter a valid email" 
            else err.username = "";
            if (!input.password) err.password = "Password is missing"
            else err.password = "";
        }
        return err;
    }

    return (
    <div className='form auth'>
        <div className='box auth'>
            <h2> { login ? "Login" : "Register" } </h2>
            <form>
                {error.database ? <span className='error'>{error.database}</span> : <span className="space"/>}
                <div className={error.username ? "input error" : null}>
                    <input type="email" placeholder="Email" name="username" value={input.username} onChange={(e) => {handleChange(e); setError({...error, username:""})}}/>
                    {error.username ? <span className='error'>{error.username}</span> : <span className="space"/>}
                </div>
                <div className={error.password ? "input error" : null}>
                    <input type="password" placeholder="Password" name="password" value={input.password} onChange={(e) => {handleChange(e); setError({...error, password:""})}}/>
                    {error.password ? <span className='error'>{error.password}</span> : <span className="space"/>}
                </div>
                <button name={login ? "login" : "register"} onClick={(e) => handleSubmit(e)}> { login ? "Login" : "Register" } </button>
            </form>
            <span onClick={() => {setLogin(!login); setInput({username: "", password: ""}); setError({})}}>{ login ? "Don't have an account?" : "Already have an account?" }</span>
        </div>
    </div>
    );
}

export default Auth;
