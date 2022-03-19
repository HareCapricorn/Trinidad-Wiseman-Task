import { ReactComponent as Spinner } from './../../assets/graphics/loader.svg';
import styles from './LoadingSpinner.module.css';

function LoadingSpinner() {
    return (
        <Spinner className={styles.spinner} />
    );
}

export default LoadingSpinner;