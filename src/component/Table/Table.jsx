import style from "./style.module.css";
import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

const Table = ({ column, data, primaryKey , aksi }) => {
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(data.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, data]);
	
	  const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};

	console.log(currentItems);
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
					{currentItems.map((row, rowIdx) => (
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
			<ReactPaginate
        		breakLabel="..."
        		nextLabel=">"
        		previousLabel="<"
				renderOnZeroPageCount={null}
				pageRangeDisplayed={3}
				pageCount={pageCount}
				onPageChange={handlePageClick}
				containerClassName={style.pagination}
				pageLinkClassName={style.pageNum}
				previousLinkClassName={style.pageNum}
				nextLinkClassName={style.pageNum}
				activeClassName={style.active}
      		/>
		</div>
	);
};

export default Table;
