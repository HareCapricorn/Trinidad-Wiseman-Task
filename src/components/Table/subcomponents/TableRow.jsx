import { Fragment } from 'react';
import parse from 'html-react-parser';
import styles from './../Table.module.css';
import { Link } from 'react-router-dom';

function TableRow({ row, active, handleRowClick }) {
    const dateTime = new Date(row.date * 1000);

    // Format date to dot separated numbers
    const dateString = new Intl.DateTimeFormat().format(dateTime).replaceAll('/', '.');
    const phoneNumber = row.phone.replace('+372', '+372 ');
    const sex = row.sex === 'm' ? 'Mees' : 'Naine';

    // Check if the row should display contents
    const activeClass = active ? `${styles.active} ${styles.rowContents}` : `${styles.rowContents}`;
    // Take a small piece of the body while keeping the paragraph tag
    const body = row.body.split('</p>')[0].substring(0, 300).concat('...</p>');

    return (
        <Fragment>
            <tr className={`${activeClass} ${styles.row}`} onClick={() => handleRowClick(row.id)}>
                <td className={activeClass}>{row.firstname}</td>
                <td className={activeClass}>{row.surname}</td>
                <td className={activeClass}>{sex}</td>
                <td className={activeClass}>{dateString}</td>
                <td className={activeClass}>{phoneNumber}</td>
            </tr>
            {active &&
                <tr className={styles.rowTab}>
                    <td colSpan={5}>
                        <div className={styles.rowTabContents}>
                            <div className={styles.rowTabImage}
                                style={{backgroundImage: `url(${row.image.medium})`}} alt=""/>
                            <div className={styles.rowTabBody}>
                                {parse(body)}
                                <Link to={`/article/${row.id}`} className={styles.link}>Loe rohkem</Link>
                            </div>
                        </div>
                    </td>
                </tr>
            }
        </Fragment>
    );
}

export default TableRow;