import { Fragment } from "react";
import PuzzleBoard from "./components/PuzzleBoard";
import ShuffleButton from "./components/ShuffleButton";

function App() {
  const numbers: number[] = [];

  for (let i = 1; i <= 16; i++) {
    numbers.push(i);
  }

  const shuffled = numbers
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return (
    <Fragment>
      <main className="text-center p-4">
        <h1 className="text-4xl font-bold">Puzzle Challenge</h1>
        <div className="my-4">
          <strong className="text-lg text-blue-600">
            11 <span className="font-normal">Moves | </span>
            15 <span className="font-normal">Tiles</span>
          </strong>
        </div>
        <PuzzleBoard numbers={shuffled} />
        <ShuffleButton />
      </main>
    </Fragment>
  );
}

export default App;
