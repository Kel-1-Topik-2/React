import React from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const ButtonKembali = ({ title, onClick }) => {
	const ButtonSecondary = styled(Button)({
		height: '56px',
		width: '206px',
		color: '#000000',
		fontSize: '1.125rem',
        fontWeight: "700",
		backgroundColor: 'none',
		borderRadius: '20px',
        border: "2px solid #000000"
	});
	return (
		<ButtonSecondary variant="text" onClick={onClick} type="reset">
			{title}
		</ButtonSecondary>
	);
};

export default ButtonKembali;
