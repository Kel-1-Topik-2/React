
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const ButtonPrimary = ({ title, onClick }) => {
	const PrimaryButton = styled(Button)({
		height: '56px',
		width: '206px',
		color: 'white',
		fontSize: '18px',
		backgroundColor: '#4CA9EE',
		borderRadius: '20px'
	});
	return (
		<PrimaryButton variant="contained" onClick={onClick}>
			{title}
		</PrimaryButton>
	);
};

export default ButtonPrimary;
