import styles from './../GameOfLife.module.css';
import { ReactComponent as DownArrow } from './../../../assets/graphics/chevron-down-solid.svg';
import { createGrid } from '../../../helpers/createGrid';

function GameOptions({
    gameOptions,
    setGameOptions,
    gameOptionsRef,
    setRunningSpeed,
    setGrid,
    runningSpeed
    }) {
    // Update game options on select
    const handleChange = (e) => {
        const name = e.target.name;
        const value = +e.target.value;
        setGameOptions(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    };

    const renderOptions = (start, end, key, symbol) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push(i * 10);
        }
        return options.map(option => {
            return <option key={key + option} value={option}>{option}{symbol}</option>
        })
    }

    // Set speed to null to pause useInterval hook
    const handlePause = () => {
        if (runningSpeed) {
            setRunningSpeed(null);
        } else {
            setRunningSpeed(gameOptionsRef.current.speed);
        }
    }

    // Update options ref, grid and start game again if paused
    const handleApply = () => {
        gameOptionsRef.current = gameOptions;
        setGrid(() => createGrid(gameOptionsRef.current));
        setRunningSpeed(gameOptionsRef.current.speed);
    }

    const renderPause = () => {
        return runningSpeed ? 'Pause' : 'Resume';
    }

    return (
        <div className={styles.optionsWrapper}>
            <div className={styles.option}>
                <div className={styles.optionLabel}>Grid width</div>
                <select
                    className={styles.optionSelect}
                    name='gridWidth'
                    value={gameOptions.gridWidth}
                    onChange={(e) => handleChange(e)}>
                    {renderOptions(1, 8, 'gridW')}
                </select>
                <div className={styles.downArrowWrapper}>
                    <DownArrow className={styles.downArrow}/>
                </div>
            </div>
            <div className={styles.option}>
                <div className={styles.optionLabel}>Grid height</div>
                <select
                    className={styles.optionSelect}
                    name='gridHeight'
                    value={gameOptions.gridHeight}
                    onChange={(e) => handleChange(e)}>
                    {renderOptions(1, 5, 'gridH')}
                </select>
                <div className={styles.downArrowWrapper}>
                    <DownArrow className={styles.downArrow}/>
                </div>
            </div>
            <div className={styles.option}>
                <div className={styles.optionLabel}>Speed</div>
                <select
                    className={styles.optionSelect}
                    name='speed'
                    value={gameOptions.speed}
                    onChange={(e) => handleChange(e)}>
                    <option value='120'>Slow</option>
                    <option value='60'>Normal</option>
                    <option value='30'>Fast</option>
                </select>
                <div className={styles.downArrowWrapper}>
                    <DownArrow className={styles.downArrow}/>
                </div>
            </div>
            <div className={styles.option}>
                <div className={styles.optionLabel}>Initial life probability</div>
                <select
                    className={styles.optionSelect}
                    name='probability'
                    value={gameOptions.probability}
                    onChange={(e) => handleChange(e)}>
                    {renderOptions(1, 10, 'probability', '%')}
                </select>
                <div className={styles.downArrowWrapper}>
                    <DownArrow className={styles.downArrow}/>
                </div>
            </div>
            <div className={styles.option}>
                <div
                className={styles.button}
                onClick={() => handlePause()}>{renderPause()}</div>
            </div>
            <div className={styles.option}>
                <div
                    className={styles.button}
                    onClick={() => handleApply()}>Apply</div>
            </div>
        </div>
    );
}

export default GameOptions;