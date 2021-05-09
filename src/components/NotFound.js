import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<h1>404 Not Found!</h1>
			<Link to='/post/add'>Back to Home!</Link>
		</div>
	);
};

export default NotFound;
