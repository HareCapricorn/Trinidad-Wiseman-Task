export function countLives(grid) {
    let livesCount = 0;
    // Count all the cells with a value of 1
    grid.forEach((row, i) => {
        row.forEach((col, j) => {
            if (grid[i][j] === 1) {
                livesCount += 1;
            }
        })
    })
    return livesCount;
}