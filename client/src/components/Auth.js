import React from 'react';

function Auth() {
	const [input, setInput] = React.useState({username: "", password: ""});
    const [login, setLogin] = React.useState(true);

	const handleChange = (e) => { setInput({ ...input, [e.target.name]: e.target.value, }); };

	const handleSubmit = (e) => { e.preventDefault(); };

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
