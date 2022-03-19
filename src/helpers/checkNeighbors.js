const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
];  

export function checkNeighbors(i, j, grid, gameOptions) {
    const rows = gameOptions.gridHeight;
    const columns = gameOptions.gridWidth;
    let neighbors = 0;
    operations.forEach(([x, y]) => {
        // Temp variables to avoid out of bounds errors when checking grid
        const newI = i + x;
        const newJ = j + y;
        if (newI >= 0 && newI < rows && newJ >= 0 && newJ < columns) {
            // Neighbor has to be alive to count
            if (grid[newI][newJ] === 1) {
                neighbors += 1;
            }
        }
    })
    return neighbors
}