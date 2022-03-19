import { useEffect, useState } from "react";
import styles from './Table.module.css';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import TableRow from "./subcomponents/TableRow";
import TableHeader from "./subcomponents/TableHeader";
import PageButtons from "./subcomponents/PageButtons";

function Table() {
    const [originalArray, setOriginalArray] = useState(null);
    const [activeArray, setActiveArray] = useState(null);
    const [activeRow, setActiveRow] = useState(null);
    const [sort, setSort] = useState({type: null, desc: false});
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        fetch('https://midaiganes.irw.ee/api/list?limit=500')
            .then(res => res.json())
            .then(data => {
                setOriginalArray(data.list);
                setActiveArray(data.list);
            })
    }, [])
    
    // Toggle row active
    const handleRowClick = (rowId) => {
        if (activeRow === rowId) {
            setActiveRow(null);
        } else {
            setActiveRow(rowId);
        }
    }

    const renderTableRows = () => {
        const maxLength = activeArray.length;
        const sliceLength = Math.min(pageNumber * 10 + 10, maxLength);
        // Show 10 items per page
        return activeArray.slice(pageNumber * 10, sliceLength).map(row => {
            const active = activeRow === row.id;
            return (
                <TableRow
                    key={row.email}
                    row={row}
                    active={active}
                    handleRowClick={handleRowClick}/>
            )
        })
    }

    return (activeArray ? 
        <div className={styles.wrapper}>
            <div>
                <h1 className={styles.title}>Nimekiri</h1>
                <table className={styles.table}>
                    <TableHeader
                        originalArray={originalArray}
                        activeArray={activeArray}
                        setActiveArray={setActiveArray}
                        sort={sort}
                        setSort={setSort}/>
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </table>
            </div>
            <PageButtons
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                maxLength={activeArray.length}/>
        </div>
        : <LoadingSpinner />
    );
}

export default Table;