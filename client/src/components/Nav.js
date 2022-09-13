import React from 'react';

function Nav( { user } ) {
    return (
		<div className='nav'>
            <div className='container'>
                <h1>Budget App</h1>
                <span>{user.email}</span>
            </div>
        </div>
	);
}

export default Nav;