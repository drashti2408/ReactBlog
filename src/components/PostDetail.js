import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import AddComment from './AddComment';
import FetchComments from './FetchComments';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const BASE_URL = 'http://localhost:8080';

const PostDetail = (props) => {
	const [post, setPost] = useState([]);
	const [isLiked, setLike] = useState(false);
	const [newCommentCount, setNewCommentCount] = useState(0);

	useEffect(() => {
		const fetchPostById = async () => {
			const response = await axios.get(
				`${BASE_URL}/posts/${props.match.params.id}`
			);

			if (response.status === 200) {
				setPost(response.data);
				if (
					props.auth.isLoggedIn &&
					response.data.likedBy &&
					response.data.likedBy.find(
						(user) => user.id === props.auth.loggedInUser.email
					)
				) {
					setLike(true);
				}
			}
		};
		fetchPostById();
	}, [props.match.params.id, props.auth]);

	const renderPost = () => {
		return (
			<div>
				<h1>{post.title}</h1>
				<h4>
					Created by: {post.creator} | Created At:{' '}
					{moment(post.createdAt).format('DD-MM-YYYY')}
				</h4>
				<div>
					<IconButton
						aria-label={isLiked ? 'Dislike this post' : 'Like this post'}
						onClick={() => handleLikeClick(!isLiked)}
					>
						<FavoriteIcon color={isLiked ? 'secondary' : ''} />
					</IconButton>
					Likes: {post.likedBy ? post.likedBy.length : 0}
				</div>
				<img src={post.image} alt={post.title} />
				<p>{post.description}</p>
			</div>
		);
	};

	const handleLikeClick = async (like) => {
		if (props.auth.isLoggedIn) {
			setLike(like);
			const oldLikeArr = post.likedBy || [];
			let updatedLikeArr = [];
			if (like) {
				updatedLikeArr = [...oldLikeArr, { id: props.auth.loggedInUser.email }];
			} else {
				updatedLikeArr = oldLikeArr.filter(
					(user) => user.id !== props.auth.loggedInUser.email
				);
			}
			const response = await axios.patch(
				`${BASE_URL}/posts/${props.match.params.id}`,
				{ likedBy: updatedLikeArr }
			);
			if (response.status === 200) {
				setPost(response.data);
			}
		}
	};

	const handleCommentAdd = (data) => {
		setNewCommentCount(Math.random());
	};

	return (
		<div>
			<Container maxWidth='md'>
				<Link to='/posts'>Back to all posts</Link>
				{renderPost()}
				<FetchComments
					postId={props.match.params.id}
					doFetchComment={newCommentCount}
				/>
				<AddComment
					postId={props.match.params.id}
					handleCommentAdd={handleCommentAdd}
				/>
			</Container>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(PostDetail);
