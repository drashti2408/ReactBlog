const INITIAL_STATE = {
	loggedInUser: {},
	isLoggedIn: false,
	loading: true,
};

export default function authReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isLoggedIn: true,
				loading: false,
				loggedInUser: action.payload,
			};
		case 'LOGOUT_SUCCESS':
			return { ...state, isLoggedIn: false, loading: false, loggedInUser: {} };
		default:
			return state;
	}
}
