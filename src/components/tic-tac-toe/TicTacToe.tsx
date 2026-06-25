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
    document.title = "Tic Tac Toe - Premium Edition";
  }, []);

  React.useEffect(() => {
    if (winner === 'C') {
      Sonner.toast.info("It was the Cat's game! NO WINNER!");
    } else if (winner) {
      Sonner.toast.success(`The winner is Player ${winner}`);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: winner === 'X' ? ['#22d3ee', '#06b6d4'] : ['#fb7185', '#e11d48']
      });
    }
  }, [winner]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 w-full max-w-md">
      {/* Score Board */}
      <div className="flex gap-4 w-full">
        <Card className="flex-1 border-white/10 bg-slate-900/40 backdrop-blur-md shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
          <CardContent className="p-4 text-center relative z-10">
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-1">Player X</p>
            <p className="text-4xl font-black text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">{scores.X}</p>
          </CardContent>
        </Card>
        <Card className="flex-1 border-white/10 bg-slate-900/40 backdrop-blur-md shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors" />
          <CardContent className="p-4 text-center relative z-10">
            <p className="text-xs font-bold text-rose-400 uppercase tracking-[0.2em] mb-1">Player O</p>
            <p className="text-4xl font-black text-white drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]">{scores.O}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500 opacity-50" />
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Tic Tac Toe
          </CardTitle>
          <div className="mt-3 text-sm font-bold uppercase tracking-widest">
            {winner ? (
              <span className={cn(
                "animate-bounce inline-block px-4 py-1 rounded-full",
                winner === 'X' ? "bg-cyan-500/20 text-cyan-400" : 
                winner === 'O' ? "bg-rose-500/20 text-rose-400" : 
                "bg-slate-500/20 text-slate-300"
              )}>
                {winner === 'C' ? "Cat's Game!" : `Winner: Player ${winner}`}
              </span>
            ) : (
              <span className="text-slate-400">
                Player <span className={isXTurn ? "text-cyan-400" : "text-rose-400"}>{isXTurn ? "X" : "O"}</span>'s turn
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 aspect-square">
            {board.map((cell, index) => (
              <motion.button
                key={index}
                whileHover={!cell && !winner ? { scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.8)" } : {}}
                whileTap={!cell && !winner ? { scale: 0.95 } : {}}
                onClick={() => handleCellClick(index)}
                disabled={!!winner}
                className={cn(
                  "relative flex items-center justify-center text-4xl font-bold rounded-2xl transition-all duration-300",
                  "bg-slate-800/50 border-2 border-white/5 hover:border-white/20 shadow-lg",
                  "disabled:cursor-not-allowed",
                  cell === 'X' && "text-cyan-400",
                  cell === 'O' && "text-rose-400",
                  winningLine?.includes(index) && (
                    winner === 'X' 
                      ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-105 z-10" 
                      : "bg-rose-500/20 border-rose-400 shadow-[0_0_20px_rgba(251,113,133,0.3)] scale-105 z-10"
                  ),
                  !cell && !winner && "cursor-pointer"
                )}
              >
                <AnimatePresence mode="wait">
                  {cell === 'X' && (
                    <motion.div
                      key="X"
                      initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <X size={54} strokeWidth={3.5} className="drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                    </motion.div>
                  )}
                  {cell === 'O' && (
                    <motion.div
                      key="O"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Circle size={46} strokeWidth={3.5} className="drop-shadow-[0_0_10px_rgba(251,113,133,0.6)]" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <span className="absolute top-2 left-3 text-[9px] text-white/10 font-mono tracking-tighter uppercase font-bold">
                  {Math.floor(index / 3)},{index % 3}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 flex justify-center pb-2">
            <Button 
              onClick={resetGame}
              variant="ghost"
              className="gap-2 px-10 py-7 text-lg font-black uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 border border-white/5 rounded-2xl transition-all duration-300 active:scale-95"
            >
              <RotateCcw size={20} />
              Reset Game
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full border-white/5 bg-white/5 backdrop-blur-sm shadow-lg">
        <CardContent className="p-4 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <Info size={18} />
          </div>
          <div className="text-xs text-slate-400 leading-relaxed font-medium">
            <p className="font-bold text-white mb-1 uppercase tracking-wider">How to Play</p>
            <p>1. Click any cell to place your mark. Each cell shows its <span className="text-white font-mono font-bold">(Row, Col)</span> coordinate.</p>
            <p>2. Get three in a row, column, or diagonal to win!</p>
            <p>3. Use the <strong>Reset Game</strong> button to clear the board and restart.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicTacToe;
