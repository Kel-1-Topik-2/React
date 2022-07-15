import style from './style.module.css';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {useLocation} from "react-router-dom";

import notFoundIcon from "../../assets/img/404_error.svg"

const Table = ({ column, data, primaryKey, aksi }) => {
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10;

	const location = useLocation()

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(data.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, data]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};

	const handleNotFoundText = (path) => {
		if(path === "/"){
			return "Jadwal pasien hari ini belum ada."
		}
		else if(path === "/data-pasien"){
			return "Hasil pencarian data pasien tidak dapat ditemukan, silahkan coba lagi."
		}
		else if(path === "/data-dokter"){
			return "Hasil pencarian data dokter tidak dapat ditemukan, silahkan coba lagi."
		}
		else if(path === "/kelola-jadwal"){
			return "Hasil pencarian jadwal hari ini tidak dapat ditemukan, silahkan coba lagi."
		}
		else if(path === "/arsip-jadwal"){
			return "Hasil pencarian data jadwal tidak dapat ditemukan, silahkan coba lagi."
		}
		else{
			return "Hasil pencarian data tidak dapat ditemukan, silahkan coba lagi."
		}
	}

	return (
		<div className={style.container}>
			<table>
				<thead>
					<tr>
						{column.map((col, colIdx) => (
							<td key={colIdx}>{col.header}</td>
						))}

						{aksi.length !== 0 && <td>Aksi</td>}
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
													aksi.click(row[primaryKey]);
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
			{data.length === 0 && (
				<div className={style.notfound_container}>
					<img src={notFoundIcon} alt="" />
					<p>{handleNotFoundText(location.pathname)}</p>
				</div>
			)}
			{pageCount > 1 && (
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
			)}
		</div>
	);
};

export default Table;
