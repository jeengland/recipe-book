import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
	<Provider store={store}>
		<CssBaseline />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);