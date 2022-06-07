import React from 'react';
import detailIcon from '../../assets/img/detail_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';

const TableRow = (props) => {
	return (
		<tr key={props.key}>
			<td>{props.item.idPasien}</td>
			<td>{props.item.nama}</td>
			<td>{props.item.nik}</td>
			<td>{props.item.umur}</td>
			<td
				style={{
					display: 'flex',
					gap: '2px',
				}}
			>
				<div>
					<img src={detailIcon} alt="detail-icon" />
				</div>
				<div>
					<img src={deleteIcon} alt="delete-icon" />
				</div>
			</td>
		</tr>
	);
};

export default TableRow;
