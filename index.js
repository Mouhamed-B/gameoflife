import { copyGrid, createGrid, drawGrid, scaleGrid } from "./grid.js";
import { next } from "./game.js";

document.addEventListener('DOMContentLoaded', function () {
    // Get the canvas element and its context
    const canvas = document.getElementById('gameCanvas');
    const canvasContainer = document.getElementById('canvasContainer');
    
    // Game control buttons
    const startButton = document.getElementById('gameStart');
    const stopButton = document.getElementById('gameStop');
    const resetButton = document.getElementById('gameReset');
    const nextButton = document.getElementById('gameNext');
    const clearButton = document.getElementById('gameClear');
    const zoomInput = document.getElementById('zoom');

    // setup the container
    const ctx = canvas.getContext('2d')
    scaleGrid(canvasContainer,canvas,ctx)
    
    // Define grid parameters
    let gameStarted = false
    let nextCount = 0
    let cellSize = 12;
    let rows = Math.floor(parseInt(canvas.getAttribute('height'))/5);
    let cols = Math.floor(parseInt(canvas.getAttribute('width'))/5);

    // Create the initial grid
    let grid = createGrid(rows, cols);
    let initialGrid = [];
    let interval;


    drawGrid(canvas, grid, cellSize);

    canvas.addEventListener('click', (event) => {
        const { offsetX, offsetY } = event;

        const cellRow = Math.floor(offsetY / cellSize);
        const cellCol = Math.floor(offsetX / cellSize);

        console.log('row',cellRow)
        console.log('col',cellCol)

        grid[cellRow][cellCol] = grid[cellRow][cellCol] === 1 ? 0 : 1

        if(!gameStarted) initialGrid = copyGrid(grid)
        // Redraw the grid
        drawGrid(canvas, grid, cellSize);
    });

    //input listeners
    zoomInput.addEventListener('change', (event) => {
        console.log(event.target.value)
        cellSize = parseInt(event.target.value)
        if(!gameStarted) drawGrid(canvas, grid, cellSize)
    })


    // Buttons listeners
    startButton.addEventListener('click', (event) => {
        gameStarted = true
        event.target.disabled = true
        stopButton.disabled = false
        interval = setInterval(() => {
            grid = next(grid)
            drawGrid(canvas, grid, cellSize)
            nextCount++;
            document.getElementById('count').innerText = nextCount+''
        }, 1);
    });

    stopButton.addEventListener('click', (event) => {
        gameStarted = false
        startButton.disabled = false
        event.target.disabled = true
        clearInterval(interval)
    });

    resetButton.addEventListener('click', (event) => {
        grid = copyGrid(initialGrid)
        drawGrid(canvas, grid, cellSize)
        nextCount = 0
        document.getElementById('count').innerText = nextCount+''
    });

    nextButton.addEventListener('click', (event) => {
        grid = next(grid)
        drawGrid(canvas, grid, cellSize)
        nextCount++;
        document.getElementById('count').innerText = nextCount+''
    });

    clearButton.addEventListener('click', (event) => {
        gameStarted = false
        startButton.disabled = false
        grid = createGrid(rows, cols);
        clearInterval(interval)
        drawGrid(canvas, grid, cellSize)
        nextCount = 0
        document.getElementById('count').innerText = nextCount+''
    });
});