import { useState, useCallback } from 'react';

export type Player = 'X' | 'O';
export type CellValue = Player | null;

export const useTicTacToe = () => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<CellValue | 'C' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const checkWinner = (newBoard: CellValue[]): { winner: CellValue | 'C' | null; line: number[] | null } => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return { winner: newBoard[a], line: [a, b, c] };
      }
    }

    if (newBoard.every(cell => cell !== null)) {
      return { winner: 'C', line: null };
    }

    return { winner: null, line: null };
  };

  const playTurn = useCallback((index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    const currentPlayer = isXTurn ? 'X' : 'O';
    newBoard[index] = currentPlayer;
    
    setBoard(newBoard);
    
    const { winner: gameWinner, line } = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(line);
      if (gameWinner === 'X' || gameWinner === 'O') {
        setScores(prev => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
      }
    } else {
      setIsXTurn(!isXTurn);
    }
  }, [board, isXTurn, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningLine(null);
  };

  return {
    board,
    isXTurn,
    winner,
    winningLine,
    scores,
    playTurn,
    resetGame
  };
};
