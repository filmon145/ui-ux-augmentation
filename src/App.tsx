import TicTacToe from "@/components/tic-tac-toe/TicTacToe";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://storage.googleapis.com/dala-prod-public-storage/generated-images/6ab2f151-92be-4999-ac91-141943e1df6f/background-00bf44f9-1782417773536.webp)' }}>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      <div className="relative z-10 w-full">
        <TicTacToe />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
