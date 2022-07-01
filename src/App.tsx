import MainLayout from "./components/MainLayout";
import PuzzleBoard from "./components/PuzzleBoard";
import ShuffleButton from "./components/ShuffleButton";
import AppContextProvider from "./context/PuzzleContextProvider";

function App() {
  return (
    <AppContextProvider>
      <MainLayout>
        <PuzzleBoard />
        <ShuffleButton />
      </MainLayout>
    </AppContextProvider>
  );
}

export default App;
