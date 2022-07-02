import MainLayout from "./components/MainLayout";
import PuzzleBoard from "./components/PuzzleBoard";
import ShuffleButton from "./components/ShuffleButton";
import PuzzleContextProvider from "./context/PuzzleContextProvider";

function App() {
  return (
    <PuzzleContextProvider>
      <MainLayout>
        <PuzzleBoard />
        <ShuffleButton />
      </MainLayout>
    </PuzzleContextProvider>
  );
}

export default App;
