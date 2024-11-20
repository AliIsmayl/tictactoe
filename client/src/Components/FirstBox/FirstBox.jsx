import React, { useState } from "react";
import './FirstBox.scss'

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(true);

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]           
    ];
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const makeRandomMove = (board) => {
    const emptySquares = board.map((value, index) => value === null ? index : null).filter((val) => val !== null);
    if (emptySquares.length > 0) {
      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      board[randomIndex] = "O";
    }
  };

  const handleClick = (index) => {
    if (!isUserTurn || board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    const winner = checkWinner(newBoard);
    if (winner) {
      endGame(winner);
      return;
    }

    setBoard(newBoard);
    setIsUserTurn(false);

   
    setTimeout(() => {
      const updatedBoard = [...newBoard];
      makeRandomMove(updatedBoard);

      const winnerAfterAI = checkWinner(updatedBoard);
      if (winnerAfterAI) {
        endGame(winnerAfterAI);
        return;
      }

      if (!updatedBoard.includes(null)) {
        endGame(null); 
        return;
      }

      setBoard(updatedBoard);
      setIsUserTurn(true);
    }, 1000);
  };

  const endGame = (winner) => {
    setIsGameOver(true);
    setTimeout(() => {
      alert(winner ? `${winner} qazandı!` : "Bərabərlik!");
      setBoard(initialBoard);
      setIsGameOver(false);
      setIsUserTurn(true);
    }, 500);
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
