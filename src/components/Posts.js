import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const BASE_URL = 'http://localhost:8080';

const useStyles = makeStyles({
	addPostButton: {
		backgroundColor: '#f00',
		color: '#fff',
		position: 'fixed',
		right: 40,
		bottom: 60,
		'&:hover': {
			color: '#f00',
		},
	},
	disabledNote: {
		position: 'fixed',
		right: 40,
		bottom: 60,
		backgroundColor: '#eee',
		padding: '10px 25px',
		borderRadius: 40,
	},
});

const Posts = (props) => {
	const classes = useStyles();
	const [posts, setPosts] = useState([]);
	const [redirectTo, setRedirect] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get(`${BASE_URL}/posts`);
			if (response.status <= 201) {
				setPosts(response.data);
			}
		};
		fetchPosts();
	}, []);

	const renderPosts = () => {
		return posts.map((post) => {
			return (
				<Grid
					item
					md={4}
					sm={6}
					xs={12}
					key={post.id}
					onClick={() => {
						handlePostClick(post.id);
					}}
				>
					<div
						style={{
							backgroundImage: `url(${post.image})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							height: 140,
							borderRadius: 8,
						}}
					></div>
					<h2>{post.title}</h2>
					<p>{post.description}</p>
				</Grid>
			);
		});
	};

	const handlePostClick = (id) => {
		setRedirect(`/posts/${id}`);
		// return <Redirect to='/posts/id' />;
	};

	if (redirectTo) {
		return <Redirect to={redirectTo} />;
	}
	return (
		<div>
			<Container style={{ minHeight: 'calc(100vh - 110px)' }} maxWidth='md'>
				<h1>Post List</h1>
				<Grid container spacing={4} className='post-block-wrapper'>
					{renderPosts()}
				</Grid>
				{props.auth.isLoggedIn ? (
					<Link to='/post/add'>
						<IconButton
							aria-label='Add Post'
							color='primary'
							className={classes.addPostButton}
						>
							<AddIcon />
						</IconButton>
					</Link>
				) : (
					<div className={classes.disabledNote}>Please login to add post.</div>
				)}
			</Container>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(Posts);
