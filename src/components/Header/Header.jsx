import styles from './Header.module.css';
import logo from './../../assets/graphics/logo.svg';
import { ReactComponent as MenuOpenSvg} from './../../assets/graphics/bars-solid.svg';
import { ReactComponent as MenuCloseSvg} from './../../assets/graphics/times.svg';

function Header({ menuOpen, handleMenuChange }) {
    const renderButton = () => {
        return menuOpen ?
            <MenuOpenSvg className={styles.hamburger} aria-label='Toggle menu'/>
            :
            <MenuCloseSvg className={styles.xmark} aria-label='Toggle menu'/>
    }
    return (
        <div className={styles.header}>
            <div className={styles.button} onClick={() => handleMenuChange()}>
                {renderButton()}
            </div>
            <img className={styles.logo} src={logo} alt='logo' />
        </div>
    );
}

export default Header;