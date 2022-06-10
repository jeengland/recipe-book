import React from 'react';
import styled from '@emotion/styled';

const RecipeFormWrapper = styled.form`
	color: pink;
`;

function RecipeForm() {
	return (
		<RecipeFormWrapper>
			<h1>This is the recipe form</h1>
		</RecipeFormWrapper>
	);
}

export default RecipeForm;