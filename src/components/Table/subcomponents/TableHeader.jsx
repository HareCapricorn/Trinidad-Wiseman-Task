import { sortByKey } from '../../../helpers/sortByKey';
import { ReactComponent as SortSvg } from './../../../assets/graphics/sort-solid.svg';
import { ReactComponent as SortDownSvg } from './../../../assets/graphics/sort-down-solid.svg';
import { ReactComponent as SortUpSvg } from './../../../assets/graphics/sort-up-solid.svg';
import styles from './../Table.module.css';

function TableHeader({
        originalArray,
        activeArray,
        setActiveArray,
        sort,
        setSort
    }) {
    const handleSort = (sortType) => {
        if (sort.type === sortType) {
            // Reset sort if it's already on second stage
            if (sort.desc === true) {
                setActiveArray(originalArray);
                setSort({
                    type: null,
                    desc: false
                });
            } else {
                // Set sort to second stage
                setActiveArray(sortByKey(activeArray, sortType, true));
                setSort({
                    type: sortType,
                    desc: true
                });
            }
        } else {
            setActiveArray(sortByKey(activeArray, sortType, false));
            setSort({
                type: sortType,
                desc: false
            });
        }
    }

    const renderSortSvg = (key) => {
        if (sort.type !== key) {
            return <SortSvg className={styles.sortSvg}/>
        } else {
            if (sort.desc) {
                return <SortUpSvg className={styles.sortSvg}/>
            } else {
                return <SortDownSvg className={styles.sortSvg}/>
            }
        }
    }

    return (
        <thead>
            <tr>
                <th className={styles.tableHeader}>
                    <div className={styles.tableHeaderButton}
                        onClick={() => handleSort('firstname')}>
                        Eesnimi
                        {renderSortSvg('firstname')}
                    </div>
                </th>
                <th className={styles.tableHeader}>
                    <div className={styles.tableHeaderButton}
                        onClick={() => handleSort('surname')}>
                        Perekonnanimi
                        {renderSortSvg('surname')}
                    </div>
                </th>
                <th className={styles.tableHeader}>
                    <div className={styles.tableHeaderButton}
                        onClick={() => handleSort('sex')}>
                        Sugu
                        {renderSortSvg('sex')}
                    </div>
                </th>
                <th className={styles.tableHeader}>
                    <div className={styles.tableHeaderButton}
                        onClick={() => handleSort('date')}>
                        Sünnikuupäev
                        {renderSortSvg('date')}
                    </div>
                </th>
                <th className={styles.tableHeader}>Telefon</th>
            </tr>
        </thead>
    );
}

export default TableHeader;