import { useRef, useState } from 'react';
import { checkNeighbors } from '../../helpers/checkNeighbors';
import { countLives } from '../../helpers/countLives';
import { createGrid } from '../../helpers/createGrid';
import { useInterval } from '../../helpers/useInterval';
import styles from './GameOfLife.module.css';
import GameOptions from './subcomponents/GameOptions';

function GameOfLife() {
    const [gameOptions, setGameOptions] = useState({
        gridWidth: 70,
        gridHeight: 30,
        speed: 60,
        probability: 50
    });
    const gameOptionsRef = useRef(gameOptions);
    const [runningSpeed, setRunningSpeed] = useState(gameOptions.speed);
    const startingLives = useRef(gameOptions.gridWidth * gameOptions.gridHeight);
    const currentLives = useRef(0);
    const [grid, setGrid] = useState(() => createGrid(gameOptions));

    // Return alive % string based on refs
    const getLives = () => {
        return startingLives.current && `${((currentLives.current / startingLives.current) * 100).toFixed(1)}%`;
    };

    // Render grid cells based on their state
    const renderGrid = () => {
        return grid.map((row, i) => {
            const columnCells = row.map((col, j) => {
                const aliveClass = grid[i][j] === 1 ? styles.gridCellAlive : '';
                const deadClass = grid[i][j] === 0 ? styles.gridCellDead : '';
                return (
                    <td key={`cell-${i}-${j}`} className={`${styles.gridCell} ${aliveClass} ${deadClass}`}></td>
                )
            });
            return <tr key={`row-${i}`}>{columnCells}</tr>
        })
    };

    const simulateRun = () => {
        setGrid(prevGrid => {
            // Map with slice to make sure the new grid gets values not reference
            const newGrid = prevGrid.map(arr => arr.slice());
            for (let i = 0; i < gameOptionsRef.current.gridHeight; i++) {
                for (let j = 0; j < gameOptionsRef.current.gridWidth; j++) {
                    const neighbors = checkNeighbors(
                        i,
                        j,
                        prevGrid,
                        gameOptionsRef.current);
                    // Kill cell if it was alive and matched conditions
                    if ((neighbors < 2 || neighbors > 3) && prevGrid[i][j]) {
                        newGrid[i][j] = 0;
                    } else if (!prevGrid[i][j] && neighbors === 3) {
                        newGrid[i][j] = 1;
                    }
                }
            }
            return newGrid;
        });
        // Update lives ref
        currentLives.current = countLives(grid);
    };

    // Dan Abramov's hook to keep game running
    useInterval(() => {
        simulateRun()
    }, runningSpeed);


    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Conway's Game Of Life</h1>
            <GameOptions
                gameOptions={gameOptions}
                setGameOptions={setGameOptions}
                runningSpeed={runningSpeed}
                setRunningSpeed={setRunningSpeed}
                setGrid={setGrid}
                gameOptionsRef={gameOptionsRef}/>
            <span className={styles.aliveLabel}>Currently alive</span>
            <div className={styles.aliveWrapper}>
                <div className={styles.aliveIndicator} style={{width: getLives()}}>
                    <span className={styles.aliveIndicatorLabel}>{getLives()}</span>
                </div>
            </div>
            <div>
                <table className={styles.grid}>
                    <tbody>
                        {renderGrid()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GameOfLife;