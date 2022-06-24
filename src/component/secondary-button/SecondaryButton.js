import React from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const SecondaryButton = ({ title, onClick }) => {
	const ButtonSecondary = styled(Button)({
		height: '56px',
		width: '206px',
		color: '#EC0000',
		fontSize: '1.125rem',
		backgroundColor: '#EEEEEE',
		borderRadius: '20px'
	});
	return (
		<ButtonSecondary variant="outlined" color="error" onClick={onClick}>
			{title}
		</ButtonSecondary>
	);
};

export default SecondaryButton;
