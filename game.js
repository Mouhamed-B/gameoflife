import { createGrid } from "./grid.js"

export function checkCell(grid, row, col) {
    let S = 0

    for (let i = row-1; i <= row+1; i++) {
        if(grid[i]){
            for (let j = col-1; j <= col+1; j++) {
                if (i===row && j===col) continue
                try {
                    if(grid[i][j]===0 || grid[i][j]===1) S+=grid[i][j]
                } catch (error) {
                    continue
                }
                            
            }
        }        
    }

    return (S===3 || (grid[row][col]===1 && S===2)) ? 1 : 0
}

export function next(grid) {
    const rows = grid.length
    const cols = grid[0].length
    const nextGrid = createGrid(rows, cols)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            nextGrid[i][j] = checkCell(grid,i,j)
        }        
    }

    return nextGrid
}