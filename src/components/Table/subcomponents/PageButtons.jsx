import styles from './../Table.module.css';
import { ReactComponent as LeftArrow } from './../../../assets/graphics/chevron-left-solid.svg';
import { ReactComponent as RightArrow } from './../../../assets/graphics/chevron-right-solid.svg';


function PageButtons({ pageNumber, setPageNumber, maxLength }) {
    const maxPages = maxLength / 10;

    const renderButtons = () => {
        const maxPageCount = Math.max(5, Math.min(pageNumber + 3, maxPages));
        const minPageNumber = maxPageCount - 5;
        const numbers = [];
        for (let i = minPageNumber; i < maxPageCount; i++) {
            numbers.push(i);
        }

        return numbers?.map(number => {
            const active = number === pageNumber ? `${styles.pageButton} ${styles.activePage}` : `${styles.pageButton}`;
            return (
                <div key={number} className={active} onClick={() => setPageNumber(number)}>{number + 1}</div>
            )
        })
    }

    const inactiveStyle = (side) => {
        if ((side === 'left' && pageNumber === 0) ||
            (side === 'right' && pageNumber === maxPages - 1)) {
            return {
                pointerEvents: 'none',
                opacity: '.4'
            }
        }
        return null
    }

    return (
        <div className={styles.pageButtonWrapper}>
            <div className={`${styles.pageButton}`} 
                style={inactiveStyle('left')}
                onClick={() => setPageNumber(prev => prev - 1)}>
                <LeftArrow  className={styles.pageArrow} />
            </div>
            {renderButtons()}
            <div className={`${styles.pageButton}`}
                style={inactiveStyle('right')}
                onClick={() => setPageNumber(prev => prev + 1)}>
                <RightArrow  className={styles.pageArrow} />
            </div>
        </div>
    );
}

export default PageButtons;