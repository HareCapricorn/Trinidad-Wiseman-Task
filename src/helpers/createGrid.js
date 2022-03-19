export function createGrid(options) {
    const rows = [];
    for (let i = 0; i < options.gridHeight; i++) {
        rows.push(Array.from(Array(options.gridWidth), () => {
            // Make cell start as either alive or empty based on the chosen probability
            return Math.random() <= (options.probability / 100) ? 1 : null;
        }));
    }
    return rows;
}
