import React from 'react';

const Searchbar = ({ onChangeSelect, onChangeQuery, dataOption }) => {
	return (
		<div>
			<select name="filter" id="filter" onChange={onChangeSelect}>
				{dataOption.map((item, i) => {
					return (
						<option value={item.value} key={i}>
							{item.label}
						</option>
					);
				})}
			</select>
			<input type="text" onChange={onChangeQuery} placeholder="search" />
		</div>
	);
};

export default Searchbar;
