export function createGrid(rows, cols) {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}

export function copyGrid(originalGrid){
    return originalGrid.map(row => row.slice())
}

export function scaleGrid(canvas,ctx){
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    ctx.scale(dpr, dpr);
}


export function drawGrid(canvas, grid, cellSize) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rows = grid.length
    const cols = grid[0].length
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            const x = j * cellSize;
            const y = i * cellSize;

            ctx.beginPath();
            ctx.lineWidth = .5
            ctx.rect(x, y, cellSize, cellSize);
            ctx.fillStyle = grid[i][j] === 1 ? '#008080' : '#fff'; // 1 represents a live cell
            ctx.fill();
            ctx.strokeStyle = '#c8c8c8'
            ctx.stroke();
        }
    }
    

}

export function updateGrid(canvas, grid, cellSize){

}