import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { loginSuccess } from '../actions/auth';

// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const googleImg = require('../assets/images/google.svg');

const clientId =
	'297721604273-jlq7ed0nlb3l53suu7fmkgjnetupjuca.apps.googleusercontent.com';

function LoginHooks(props) {
	const onSuccess = (res) => {
		console.log('Login Success: currentUser:', res.profileObj);
		props.loginSuccess(res.profileObj);
		refreshTokenSetup(res);
	};

	const onFailure = (res) => {
		console.log('Login failed: res:', res);
		alert(`Failed to login. `);
	};

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: true,
		accessType: 'offline',
		// responseType: 'code',
		// prompt: 'consent',
	});

	return (
		<button onClick={signIn} className='button'>
			<img src={googleImg.default} alt='google login' className='icon'></img>

			<span className='buttonText'>Sign in with Google</span>
		</button>
	);
}

export default connect(null, { loginSuccess })(LoginHooks);
