import React from 'react';
import style from './style.module.css';
import searchIcon from '../../assets/img/search_icon.svg';

const Searchbar = ({
	onChangeSelect,
	onChangeQuery,
	dataOption,
	placeholder,
}) => {
	return (
		<div className={style.searchbar}>
			<select
				className={style.containerDropdown}
				name="filter"
				id="filter"
				onChange={onChangeSelect}
			>
				{dataOption.map((item, i) => {
					return (
						<option value={item.value} key={i} className={style.dropdown}>
							{item.label}
						</option>
					);
				})}
			</select>
			<div className={style.containerSearch}>
				<div className={style.icon}>
					<img src={searchIcon} alt="search icon" />
				</div>
				<input
					type="text"
					onChange={onChangeQuery}
					placeholder={placeholder}
					className={style.search}
				/>
			</div>
		</div>
	);
};

export default Searchbar;
