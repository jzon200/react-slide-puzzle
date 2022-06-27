export default function Header() {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold">Puzzle Challenge</h1>
      <div className="my-4 text-lg text-blue-600 font-bold">
        11 <span className="font-normal">Moves | </span>
        15 <span className="font-normal">Tiles</span>
      </div>
    </header>
  );
}
