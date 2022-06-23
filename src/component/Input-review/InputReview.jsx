import React from 'react';
import style from './style.module.css';
const InputReview = ({ value, type, width }) => {
	return (
		<>
			<input
				className={style.input}
				disabled
				type={type}
				value={value}
				style={(width = { width })}
			/>
		</>
	);
};

export default InputReview;
