import styles from './Sidebar.module.css';
import logo from './../../assets/graphics/logo.svg';
import { ReactComponent as File} from './../../assets/graphics/file-solid.svg';
import { ReactComponent as Table} from './../../assets/graphics/table.svg';
import { ReactComponent as Image} from './../../assets/graphics/image-regular.svg';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ menuOpen, handleMenuChange }) {
    const {pathname: path} = useLocation();

    const getActive = (pathname) => {
        return pathname === path ? styles.active : '';
    }

    return (
        <div className={`${styles.sidebar} ${menuOpen && styles.visible}`}>
            <Link to='/'
                onClick={() => handleMenuChange()}>
                <img className={styles.logo} src={logo} tabIndex='0' alt='logo' />
            </Link>
            <ul className={styles.menu}>
                <Link to='/article'
                    className={`${styles.menuItem} ${getActive('/article')}`}>
                        Artikkel
                        <File className={`${styles.menuSvg} ${styles.fileSvg} ${getActive('/article')}`}/>
                </Link>
                <Link to='/list' 
                    className={`${styles.menuItem} ${getActive('/list')}`}>
                        Tabel
                        <Table className={`${styles.menuSvg} ${styles.tableSvg} ${getActive('/list')}`}/>
                </Link>
                <Link to='/life' 
                    className={`${styles.menuItem} ${getActive('/life')}`}>
                        Game of Life
                        <Image className={`${styles.menuSvg} ${styles.imageSvg} ${getActive('/life')}`}/>
                </Link>
            </ul>
        </div>
    );
}

export default Sidebar;