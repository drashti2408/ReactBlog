import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { logoutSuccess } from '../actions/auth';

const clientId =
	'297721604273-jlq7ed0nlb3l53suu7fmkgjnetupjuca.apps.googleusercontent.com';

const googleImg = require('../assets/images/google.svg');

function LogoutHooks(props) {
	const onLogoutSuccess = (res) => {
		console.log('Logged out Success');
		props.logoutSuccess();
	};

	const onFailure = () => {
		console.log('Handle failure cases');
	};

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure,
	});

	return (
		<button onClick={signOut} className='button'>
			<img src={googleImg.default} alt='google login' className='icon'></img>

			<span className='buttonText'>Sign out</span>
		</button>
	);
}

export default connect(null, { logoutSuccess })(LogoutHooks);
