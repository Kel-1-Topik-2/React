import style from "./style.module.css";
import React from "react";
import detailIcon from "../../assets/img/detail_icon.svg";
import deleteIcon from "../../assets/img/delete_icon.svg";

const Table = ({ column, data, onDelete, detailClick }) => {
	return (
		<div className={style.container}>
			<table>
				<thead>
					<tr>
						{column.map((col, colIdx) => (
							<td key={colIdx}>{col.header}</td>
						))}

						<td>AKSI</td>
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIdx) => (
						<tr key={rowIdx}>
							{column.map((col, colIdx) => (
								<td key={colIdx}>{row[col.field]}</td>
							))}
							<td>
								<div className={style.aksi}>
									<img
										src={detailIcon}
										alt=""
										onClick={() => {
											detailClick(row.idPasien);
										}}
									/>
									<img
										src={deleteIcon}
										alt=""
										onClick={() => {
											onDelete(row.idPasien);
										}}
									/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
