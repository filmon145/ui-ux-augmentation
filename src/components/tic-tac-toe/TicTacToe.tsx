import React from 'react';
import { useTicTacToe } from '@/hooks/use-tic-tac-toe';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Circle, RotateCcw, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as Sonner from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const TicTacToe: React.FC = () => {
  const { board, isXTurn, winner, winningLine, scores, playTurn, resetGame } = useTicTacToe();

  const handleCellClick = (index: number) => {
    if (board[index]) {
      Sonner.toast.error('That cell is already occupied!');
      return;
    }
    playTurn(index);
  };

  React.useEffect(() => {
    if (winner === 'C') {
      Sonner.toast.info("It was the Cat's game! NO WINNER!");
    } else if (winner) {
      Sonner.toast.success(`The winner is ${winner}`);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: winner === 'X' ? ['#2563eb', '#60a5fa'] : ['#e11d48', '#fb7185']
      });
    }
  }, [winner]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4">
      {/* Score Board */}
      <div className="flex gap-4 w-full max-w-md">
        <Card className="flex-1 border-none bg-blue-50/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4 text-center">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Player X</p>
            <p className="text-3xl font-bold text-blue-700">{scores.X}</p>
          </CardContent>
        </Card>
        <Card className="flex-1 border-none bg-rose-50/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4 text-center">
            <p className="text-sm font-semibold text-rose-600 uppercase tracking-wider">Player O</p>
            <p className="text-3xl font-bold text-rose-700">{scores.O}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-md border-none bg-white/80 backdrop-blur-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">
            Tic Tac Toe
          </CardTitle>
          <div className="mt-2 text-lg font-medium text-muted-foreground">
            {winner ? (
              <span className="text-primary animate-bounce inline-block">
                {winner === 'C' ? "Cat's Game!" : `Winner: ${winner}`}
              </span>
            ) : (
              <span>It is {isXTurn ? "X" : "O"}'s turn</span>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-3 aspect-square">
            {board.map((cell, index) => (
              <motion.button
                key={index}
                whileHover={!cell && !winner ? { scale: 1.05 } : {}}
                whileTap={!cell && !winner ? { scale: 0.95 } : {}}
                onClick={() => handleCellClick(index)}
                disabled={!!winner}
                className={cn(
                  "relative flex items-center justify-center text-4xl font-bold rounded-xl transition-all duration-200",
                  "bg-white border-2 border-muted hover:border-primary/50 hover:bg-muted/30",
                  "disabled:cursor-not-allowed",
                  cell === 'X' && "text-blue-600 shadow-inner",
                  cell === 'O' && "text-rose-600 shadow-inner",
                  winningLine?.includes(index) && (winner === 'X' ? "bg-blue-100 border-blue-500 scale-105 z-10" : "bg-rose-100 border-rose-500 scale-105 z-10"),
                  !cell && !winner && "cursor-pointer"
                )}
              >
                <AnimatePresence mode="wait">
                  {cell === 'X' && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <X size={48} strokeWidth={3} />
                    </motion.div>
                  )}
                  {cell === 'O' && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Circle size={40} strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Board numbering like the console app might imply grid positions */}
                <span className="absolute top-1 left-2 text-[10px] text-muted-foreground/30 font-mono">
                  {Math.floor(index / 3)},{index % 3}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              onClick={resetGame}
              variant="outline"
              className="gap-2 px-8 py-6 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <RotateCcw size={20} />
              Reset Game
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions Footer */}
      <Card className="w-full max-w-md border-none bg-white/60 backdrop-blur-sm shadow-lg">
        <CardContent className="p-4 flex items-start gap-3">
          <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="font-semibold text-foreground mb-1">How to Play & Verify:</p>
            <p>1. Click any cell to place your mark (X or O). Each cell shows its <strong>(Row, Col)</strong> coordinate in the corner.</p>
            <p>2. Get three in a row, column, or diagonal to win!</p>
            <p>3. Use the <strong>Reset Game</strong> button to clear the board and start a new round.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicTacToe;
