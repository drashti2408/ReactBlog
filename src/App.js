import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddPost from './components/AddPost';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Posts from './components/Posts';
import Footer from './components/Footer';
import Header from './components/Header';
import PostDetail from './components/PostDetail';

import PrivateRoute from './components/PrivateRoute';

function App() {
	const store = createStore(
		reducers,
		composeWithDevTools(applyMiddleware(thunk))
	);
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Header />
				<Switch>
					<Route path='/posts' component={Posts} exact />
					<Route path='/posts/:id' component={PostDetail} exact />
					<PrivateRoute path='/post/add' component={AddPost} exact />
					<Route path='/' component={Posts} exact />
				</Switch>
				<Footer />
			</Provider>
		</BrowserRouter>
	);
}

export default App;
