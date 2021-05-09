import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const PrivateRoute = ({ component: Component, ...rest }) => {
	if (rest.auth.loading) {
		return (
			<div style={{ textAlign: 'center', padding: 50 }}>
				<CircularProgress />
			</div>
		);
	}
	return (
		<Route
			{...rest}
			render={(props) =>
				rest.auth.isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/posts',
						}}
					/>
				)
			}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(PrivateRoute);
