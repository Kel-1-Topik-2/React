import React from 'react';
import './style.css';
const TableHeader = ({ header1, header2, header3, header4, header5 }) => {
	return (
		<>
			<th>{header1}</th>
			<th>{header2}</th>
			<th>{header3}</th>
			<th>{header4}</th>
			<th>{header5}</th>
		</>
	);
};

export default TableHeader;
