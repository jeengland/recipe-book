import React, { useState } from 'react';
import styled from '@emotion/styled';
import InputList from './inputList.js';

const RecipeFormWrapper = styled.form`
	color: pink;
`;

function RecipeForm() {
	const [ingredients, setIngredients] = useState([{amount: '', name: ''}]);

	return (
		<RecipeFormWrapper>
			<InputList listType='ingredients' state={ingredients} setState={setIngredients} schema={{amount: '', name: ''}}/>
		</RecipeFormWrapper>
	);
}

export default RecipeForm;