import style from "./style.module.css"

import detailIcon from '../../assets/img/detail_icon.svg';
import deleteIcon from '../../assets/img/delete_icon.svg';

const Table = ({column, data}) => {
    return(
        <div className={style.container}>
            <table>
                <thead>
                    <tr>
                        {column.map((col, colIdx) => (
                            <td key={colIdx}>{col}</td>
                        ))}

                        <td>AKSI</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            <td>{row.idPasien}</td>
                            <td>{row.nama}</td>
                            <td>{row.nik}</td>
                            <td>{row.usia}</td>
                            <td>
                                <div className={style.aksi}>
                                    <img src={detailIcon} alt="" />
                                    <img src={deleteIcon} alt="" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table