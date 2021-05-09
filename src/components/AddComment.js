import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'http://localhost:8080';

const AddComment = (props) => {
	console.log('props', props);
	const handleAddComment = async (comment) => {
		const data = {
			postId: props.postId,
			...comment,
			createdBy: props.auth.loggedInUser.email,
			creator: props.auth.loggedInUser.name,
			createdAt: moment.utc().valueOf(),
		};
		const response = await axios.post(`${BASE_URL}/comments`, data);
		if (response.status <= 201) {
			props.handleCommentAdd(response.data);
		}
	};

	const formik = useFormik({
		initialValues: {
			body: '',
		},
		validationSchema: Yup.object({
			body: Yup.string()
				.max(200, 'Must be 200 characters or less')
				.required('Required'),
		}),
		onSubmit: (values) => {
			handleAddComment(values);
		},
	});

	return (
		<Container maxWidth='sm' style={{ padding: '50px 0' }}>
			<form onSubmit={formik.handleSubmit}>
				<h3>Add Comment</h3>
				<TextField
					fullWidth
					id='body'
					name='body'
					label='Post Comment'
					value={formik.values.body}
					onChange={formik.handleChange}
					error={formik.touched.body && Boolean(formik.errors.body)}
					helperText={formik.touched.body && formik.errors.body}
					style={{ marginBottom: 20 }}
				/>
				<Button
					color='primary'
					variant='contained'
					fullWidth
					type='submit'
					disabled={!props.auth.isLoggedIn}
				>
					{props.auth.isLoggedIn ? 'Submit' : 'Please login to add comment.'}
				</Button>
			</form>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(AddComment);
