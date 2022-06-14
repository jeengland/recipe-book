import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


const InputWrapper = styled.li`
	color: red;
	list-style-type: none;
`;

Input.propTypes = {
	index: PropTypes.number,
	name: PropTypes.string,
	value: PropTypes.objectOf(
		PropTypes.string
	),
	handleChange: PropTypes.func,
	handleRemove: PropTypes.func
};

function Input({ index, name, value, handleChange, handleRemove }) {
	const fields = Object.keys(value);

	return (
		<InputWrapper key={name}>
			{
				fields.map(field => {
					const fieldName = name + '-' + field;
					
					return (
						<React.Fragment key={fieldName}>
							<label htmlFor={fieldName}>{field}</label>
							<input type='text' name={fieldName} id={fieldName} value={value[field]} onChange={(e) => handleChange(index, field, e)} />
						</React.Fragment>
					);
				})
			}
			<button type='button' onClick={() => handleRemove(index)}>-</button>
		</InputWrapper>
	);
}

const InputListWrapper = styled.fieldset`
	color: pink;
`;

InputList.propTypes = {
	listType: PropTypes.string,
	schema: PropTypes.objectOf(
		PropTypes.string
	),
	state: PropTypes.array,
	setState: PropTypes.func
};

function InputList({ listType, schema, state, setState }) {
	const addInput = () => {
		const values = [...state];

		values.push(schema);

		setState(values);
	};

	const handleChange = (index, field, e) => {
		const values = [...state];

		values[index][field] = e.target.value;

		setState(values);
	};

	const handleRemove = (index) => {
		const values = [...state],
			filteredValues = values.filter((value, i) => i != index);

		setState(filteredValues);
	};

	return (
		<InputListWrapper name={listType}>
			<ul style={{paddingLeft: 0}}>
				{state.map((value, index) => {
					const name = listType + '-' + index;
				
					return (
						<Input 
							key={name} 
							name={name} 
							value={value} 
							index={index}
							schema={schema}
							handleChange={handleChange} 
							handleRemove={handleRemove}
						/>
					);
				})}
			</ul>
			<button type='button' onClick={addInput}>+</button>
		</InputListWrapper>
	);
}

export default InputList;