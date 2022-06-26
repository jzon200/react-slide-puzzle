import PuzzleTile from "./PuzzleTile";

type Props = {
  numbers: number[];
};

export default function PuzzleBoard(props: Props) {
  return (
    <div className="flex justify-center">
      <div className="w-[21rem] grid grid-cols-4 place-items-center gap-2">
        {props.numbers.map((number, index) => {
          // TODO: Get the current position of whitespace then compare to other tile's position
          if (number === 16) {
            return <div key={index} />;
          }

          return <PuzzleTile key={index} text={number} />;
        })}
      </div>
    </div>
  );
}
