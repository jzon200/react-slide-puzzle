import { usePuzzleSelector } from "../hooks";

export default function Header() {
  const { moves } = usePuzzleSelector();

  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold">Puzzle Challenge</h1>
      <div className="my-4 text-lg text-blue-600 font-bold">
        {moves} <span className="font-normal">Moves | </span>
        15 <span className="font-normal">Tiles</span>
      </div>
    </header>
  );
}
