import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:8080';
const AddPost = (props) => {
	const [isRedirect, setIsRedirect] = useState(false);

	const handleAddPost = async (post) => {
		const postData = {
			...post,
			createdBy: props.auth.loggedInUser.email,
			creator: props.auth.loggedInUser.name,
			createdAt: moment.utc().valueOf(),
		};
		const response = await axios.post(`${BASE_URL}/posts`, postData);
		if (response.status <= 201) {
			setIsRedirect(true);
		}
	};

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			image:
				'https://images.pexels.com/photos/5282269/pexels-photo-5282269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.max(200, 'Must be 200 characters or less')
				.required('Required'),
			description: Yup.string()
				.max(200, 'Must be 200 characters or less')
				.required('Required'),
		}),
		onSubmit: (values) => {
			handleAddPost(values);
		},
	});

	if (isRedirect) {
		return <Redirect to='/posts' />;
	}
	return (
		<Container maxWidth='sm' style={{ padding: '50px 0' }}>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id='title'
					name='title'
					label='Post Title'
					value={formik.values.title}
					onChange={formik.handleChange}
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
					style={{ marginBottom: 20 }}
				/>
				<TextField
					fullWidth
					id='description'
					name='description'
					label='Post Description'
					value={formik.values.description}
					onChange={formik.handleChange}
					error={
						formik.touched.description && Boolean(formik.errors.description)
					}
					helperText={formik.touched.description && formik.errors.description}
					style={{ marginBottom: 20 }}
				/>
				<TextField
					fullWidth
					id='image'
					name='image'
					label='Post Image'
					value={formik.values.image}
					onChange={formik.handleChange}
					error={formik.touched.image && Boolean(formik.errors.image)}
					helperText={formik.touched.image && formik.errors.image}
					style={{ marginBottom: 40 }}
				/>
				<Button color='primary' variant='contained' fullWidth type='submit'>
					Submit
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

export default connect(mapStateToProps)(AddPost);
