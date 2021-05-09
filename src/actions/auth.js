export const loginSuccess = (user) => {
	return {
		type: 'LOGIN_SUCCESS',
		payload: user,
	};
};

export const logoutSuccess = (user) => {
	return {
		type: 'LOGOUT_SUCCESS',
		payload: user,
	};
};
