import { Button } from '@mui/material';

const ButtonPrimary = ({ title, onClick }) => {
	// const PrimaryButton = styled(Button)({
	// 	height: '56px',
	// 	width: '206px',
	// 	color: 'white',
	// 	fontSize: '18px',
	// 	backgroundColor: '#4CA9EE',
	// 	borderRadius: '20px',
	// });
	return (
		<Button
			onClick={onClick}
			variant="contained"
			type="submit"
			sx={{
				width: '206px',
				height: '56px',
				borderRadius: '20px',
				fontSize: '16px',
				backgroundColor: '#4CA9EE'
			}}
		>
			<strong>{title}</strong>
		</Button>
	);
};

export default ButtonPrimary;
