import PuzzleButton from "./PuzzleButton";

type Props = {
  numbers: number[];
};

export default function PuzzleGrid(props: Props) {
  return (
    <div className="flex justify-center">
      <div className="w-[21rem] grid grid-cols-4 place-items-center gap-1">
        {props.numbers.map((number, index) => (
          <PuzzleButton key={index} text={number} />
        ))}
      </div>
    </div>
  );
}
