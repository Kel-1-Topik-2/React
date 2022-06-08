import React from 'react';
import detailIcon from '../../assets/img/detail_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';

const TableRow = ({ colSatu, colDua, colTiga, colEmpat, onDelete }) => {
	return (
		<tr>
			<td>{colSatu}</td>
			<td>{colDua}</td>
			<td>{colTiga}</td>
			<td>{colEmpat}</td>
			<td
				style={{
					display: 'flex',
					gap: '2px',
				}}
			>
				<div
					onClick={() => {}}
					style={{
						cursor: 'pointer',
					}}
				>
					<img src={detailIcon} alt="detail-icon" />
				</div>
				<div
					onClick={onDelete}
					style={{
						cursor: 'pointer',
					}}
				>
					<img src={deleteIcon} alt="delete-icon" />
				</div>
			</td>
		</tr>
	);
};

export default TableRow;
