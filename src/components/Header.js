import React from 'react';
import './Header.css';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import LoginHooks from './LoginHooks';
import LogoutHooks from './LogoutHooks';

const Header = (props) => {
	return (
		<div className='header-wrapper'>
			<Container>
				<div className='header'>
					<div className='logo-wrapper'>
						<img
							src='https://cdn2.hubspot.net/hubfs/3022892/Images/Home%20Page%20Images/Innovative-mate.png'
							alt='Not found'
						/>
					</div>
					<div className='button-wrapper'>
						{!props.auth.isLoggedIn ? <LoginHooks /> : <LogoutHooks />}
					</div>
				</div>
			</Container>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(Header);
