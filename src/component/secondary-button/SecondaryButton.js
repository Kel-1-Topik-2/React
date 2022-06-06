import React from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const SecondaryButton = ({ children, onClick }) => {
	const ButtonSecondary = styled(Button)({
		height: '56px',
		width: '206px',
		color: '#EC0000',
		fontSize: '18px',
		backgroundColor: '#EEEEEE',
		borderRadius: '20px'
	});
	return (
		<ButtonSecondary variant="outlined" color="error" onClick={onClick}>
			{children}
		</ButtonSecondary>
	);
};

export default SecondaryButton;
