import TicTacToe from "@/components/tic-tac-toe/TicTacToe";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-black p-4 overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      <div className="relative z-10 w-full flex justify-center">
        <TicTacToe />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
