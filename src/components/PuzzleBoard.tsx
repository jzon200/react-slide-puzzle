import { useState } from "react";
import shufflePuzzle from "../utils/shufflePuzzle";
import PuzzleTile from "./PuzzleTile";

type Props = {
  numbers: number[];
};

export default function PuzzleBoard({ numbers }: Props) {
  const [puzzleTiles, setPuzzleTiles] = useState(shufflePuzzle(numbers));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const whiteSpaceIndex = puzzleTiles.findIndex((value) => value === 16);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-[repeat(4,_80px)] place-items-center gap-2">
        {puzzleTiles.map((number, index) => {
          if (number === 16) {
            return <div key={index} />;
          }

          return (
            <PuzzleTile
              key={index}
              text={number}
              isTapped={selectedIndex === index}
              isMoveableY={false}
              isMoveableX={
                selectedIndex != null && selectedIndex === whiteSpaceIndex - 1
              }
              onClick={() => {
                setSelectedIndex(index);

                if (index === whiteSpaceIndex - 1) {
                  setPuzzleTiles((currentTiles) => {
                    const selectedTile = currentTiles.findIndex(
                      (value) => value === number
                    );

                    const tilesCopy = currentTiles.slice();

                    //* Switches the value of whitespace and selected tile
                    tilesCopy[whiteSpaceIndex] = number;
                    tilesCopy[selectedTile] = 16;

                    return tilesCopy;
                  });
                }
                // TODO: Change y position of tapped tile
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
