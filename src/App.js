import React, { useEffect, useState } from 'react';

import Recipe from './components/recipe.js';

function getData() {
	return fetch('http://localhost:3000/api/recipes')
		.then(data => data.json());
}

function App() {
	const [data, setData] = useState('');

	useEffect(() => {
		getData()
			.then(res => setData(JSON.parse(res.data[0].data)))
	}, []);

	if (!data) {
		return (
			<h1>Loading</h1>
		);
	}

	return (<div>
		<Recipe data={data}/>
	</div>);
}

export default App;
