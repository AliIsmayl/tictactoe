import React, { useState } from 'react';
import './NumberBox.scss';

const Puzzle = () => {
  const [board, setBoard] = useState([
    [1, 2, 3],
    [4, 0, 5],
    [7, 8, 6],
  ]);

  const goalState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];

  const handleClick = (row, col) => {
    const emptyTile = findEmptyTile(); // `0`-ın mövqeyini tapır
    const [emptyRow, emptyCol] = emptyTile;

    // Yalnız qonşu xanalar hərəkət edə bilər
    if (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) || // Yuxarı/aşağı
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)    // Sol/sağ
    ) {
      // Taxtanı yenilə
      const newBoard = board.map((r) => [...r]);
      newBoard[emptyRow][emptyCol] = board[row][col];
      newBoard[row][col] = 0;
      setBoard(newBoard);

      // Qələbəni yoxla
      if (checkWin(newBoard)) {
        alert('Təbriklər! Siz qalibsiniz! 🎉');
      }
    }
  };

  const findEmptyTile = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) return [i, j];
      }
    }
  };

  const checkWin = (currentBoard) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[i][j] !== goalState[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className="puzzle-container">
      <div className="board">
        {board.map((row, i) =>
          row.map((tile, j) => (
            <div
              key={`${i}-${j}`}
              className={`tile ${tile === 0 ? 'empty' : ''}`}
              onClick={() => handleClick(i, j)} // Kliklə hərəkət et
            >
              {tile !== 0 && tile}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Puzzle;
