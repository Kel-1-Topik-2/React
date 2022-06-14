import style from "./style.module.css";
import React from "react";

const Table = ({ column, data, primaryKey ,aksi }) => {
	return (
		<div className={style.container}>
			<table>
				<thead>
					<tr>
						{column.map((col, colIdx) => (
							<td key={colIdx}>{col.header}</td>
						))}

						{aksi.length !== 0 && (
							<td>Aksi</td>
						)}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIdx) => (
						<tr key={rowIdx}>
							{column.map((col, colIdx) => (
								<td key={colIdx}>{row[col.field]}</td>
							))}
							{aksi.length !== 0 && (
								<td>
									<div className={style.aksi}>
										{aksi.map((aksi, aksiIdx) => (
											<img
												key={aksiIdx}
												src={aksi.icon}
												alt=""
												onClick={() => {
													aksi.click(row[primaryKey])
												}}
											/>
										))}
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
