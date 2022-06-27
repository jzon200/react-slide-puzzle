import MainLayout from "./components/MainLayout";
import PuzzleBoard from "./components/PuzzleBoard";
import ShuffleButton from "./components/ShuffleButton";
import generatePuzzle from "./utils/generatePuzzle";

function App() {
  const puzzleTiles = generatePuzzle();

  return (
    <MainLayout>
      <PuzzleBoard numbers={puzzleTiles} />
      <ShuffleButton />
    </MainLayout>
  );
}

export default App;
