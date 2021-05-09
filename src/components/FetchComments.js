import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import moment from 'moment';

const BASE_URL = 'http://localhost:8080';

const FetchComments = (props) => {
	const [comments, setComments] = useState([]);

	const fetchCommentByPostId = async () => {
		const response = await axios.get(
			`${BASE_URL}/comments?postId=${props.postId}`
		);

		if (response.status === 200) {
			setComments(response.data);
		}
	};

	useEffect(() => {
		fetchCommentByPostId();
	}, [props.postId, props.doFetchComment, props.auth]);

	const renderComments = () => {
		if (comments && comments.length === 0) {
			return (
				<li>
					<i>No comment found for this post.</i>
				</li>
			);
		}
		return comments.map((comment) => {
			const isLiked =
				comment.likedBy &&
				comment.likedBy.find(
					(user) => user.id === props.auth.loggedInUser.email
				);
			return (
				<div>
					<div key={comment.id}>{comment.body}</div>
					<div>
						Created by: {comment.creator} | Created At:{' '}
						{moment(comment.createdAt).format('DD-MM-YYYY')}
					</div>
					<div>
						<IconButton
							aria-label={
								isLiked ? 'Dislike this comment' : 'Like this comment'
							}
							onClick={() => handleLikeClick(comment.id, !isLiked)}
						>
							<FavoriteIcon color={isLiked ? 'secondary' : ''} />
						</IconButton>
						Likes: {comment.likedBy ? comment.likedBy.length : 0}
					</div>
				</div>
			);
		});
	};

	const handleLikeClick = async (commentId, like) => {
		if (props.auth.isLoggedIn) {
			const comment = comments.find((comment) => comment.id === commentId);
			const oldLikeArr = (comment && comment.likedBy) || [];
			let updatedLikeArr = [];
			if (like) {
				updatedLikeArr = [...oldLikeArr, { id: props.auth.loggedInUser.email }];
			} else {
				updatedLikeArr = oldLikeArr.filter(
					(user) => user.id !== props.auth.loggedInUser.email
				);
			}

			const response = await axios.patch(`${BASE_URL}/comments/${commentId}`, {
				likedBy: updatedLikeArr,
			});
			if (response.status === 200) {
				fetchCommentByPostId();
			}
		}
	};

	return (
		<div>
			<h3>Comments</h3>
			<div>{renderComments()}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(FetchComments);
