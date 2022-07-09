import { isEqual } from "lodash";
import { createContext, Dispatch } from "react";

import { CORRECT_TILES, shufflePuzzle } from "../utils";

type PuzzleState = {
  currentTiles: number[][];
  activeTile: number | null;
  moves: number;
  isSolved: boolean;
};

const initialPuzzleState: PuzzleState = {
  currentTiles: shufflePuzzle(CORRECT_TILES),
  activeTile: null,
  moves: 0,
  isSolved: false,
};

type ACTIONTYPE = { type: "moved_tile"; value: number } | { type: "shuffled" };

function puzzleReducer(draft: PuzzleState, action: ACTIONTYPE) {
  switch (action.type) {
    case "moved_tile": {
      const { currentTiles, isSolved } = draft;

      //* tiles cannot be changed, if the game is over
      if (isSolved) {
        break;
      }

      // get the max value of tiles, used as an empty space
      const maxValue = [].concat(...(currentTiles as [])).length;

      const selectedTileRowIndex = currentTiles.findIndex((value) =>
        value.find((value) => value === action.value)
      );
      const selectedTileColIndex = currentTiles[selectedTileRowIndex].findIndex(
        (value) => value === action.value
      );
      console.log("selected:", selectedTileRowIndex, selectedTileColIndex);

      const emptySpaceRowIndex = currentTiles.findIndex((value) =>
        value.find((value) => value === maxValue)
      );
      const emptySpaceColIndex = currentTiles[emptySpaceRowIndex].findIndex(
        (value) => value === maxValue
      );
      console.log("empty space:", emptySpaceRowIndex, emptySpaceColIndex);

      // checks if the selected tile is in the same row as the empty space
      // or if the selected tile is in the same column as the empty space
      const isMovable =
        selectedTileRowIndex === emptySpaceRowIndex ||
        selectedTileColIndex === emptySpaceColIndex;

      // checks if the selected tile is adjacent to empty space
      const isAdjacent =
        selectedTileRowIndex === emptySpaceRowIndex + 1 ||
        selectedTileRowIndex === emptySpaceRowIndex - 1 ||
        selectedTileColIndex === emptySpaceColIndex + 1 ||
        selectedTileColIndex === emptySpaceColIndex - 1;

      if (isMovable) {
        draft.activeTile = action.value;
        draft.moves++;

        if (isAdjacent) {
          // then, swap the values of selected tile && empty space
          currentTiles[selectedTileRowIndex][selectedTileColIndex] = maxValue;
          currentTiles[emptySpaceRowIndex][emptySpaceColIndex] = action.value;
        } else if (selectedTileColIndex < emptySpaceColIndex) {
          //* this is necessary to move the empty space at the selected tile
          const temp = [maxValue];

          // accumulates each value of column for every row before empty space
          for (let i = selectedTileColIndex; i < emptySpaceColIndex; i++) {
            const element = currentTiles[selectedTileRowIndex][i];
            temp.push(element);
          }

          console.log(temp);

          // replaces the columns of the selected row
          currentTiles[selectedTileRowIndex].splice(
            selectedTileColIndex,
            emptySpaceColIndex + 1,
            ...temp
          );
        } else if (selectedTileColIndex > emptySpaceColIndex) {
          // same logic above, but reverse engineered
          const temp = [maxValue];

          for (let i = selectedTileColIndex; i > emptySpaceColIndex; i--) {
            const element = currentTiles[selectedTileRowIndex][i];
            temp.unshift(element);
          }

          console.log(temp);

          currentTiles[selectedTileRowIndex].splice(
            emptySpaceColIndex,
            selectedTileColIndex + 1,
            ...temp
          );
        } else if (selectedTileRowIndex < emptySpaceRowIndex) {
          const temp = [maxValue];

          for (let i = selectedTileRowIndex; i < emptySpaceRowIndex; i++) {
            const element = currentTiles[i][selectedTileColIndex];
            temp.unshift(element);
          }

          console.log(temp);

          // iterates the y-values of a selected column,
          // then mutates a new order from temp
          for (let i = selectedTileRowIndex; i <= emptySpaceRowIndex; i++) {
            currentTiles[i][selectedTileColIndex] =
              temp[emptySpaceRowIndex - i];

            console.log(i, temp[emptySpaceRowIndex - i]);
          }
        } else if (selectedTileRowIndex > emptySpaceRowIndex) {
          // same logic above, but reverse engineered
          const temp = [maxValue];

          for (let i = selectedTileRowIndex; i > emptySpaceRowIndex; i--) {
            const element = currentTiles[i][selectedTileColIndex];
            temp.unshift(element);
          }

          console.log(temp);

          for (let i = selectedTileRowIndex; i >= emptySpaceRowIndex; i--) {
            currentTiles[i][selectedTileColIndex] =
              temp[i - emptySpaceRowIndex];

            console.log(i, temp[i - emptySpaceRowIndex]);
          }
        }
      }

      draft.isSolved = isEqual(currentTiles, CORRECT_TILES);
      break;
    }
    case "shuffled": {
      draft.currentTiles = shufflePuzzle(draft.currentTiles);
      draft.activeTile = null;
      draft.moves = 0;
      draft.isSolved = false;
      break;
    }
    default: {
      throw new Error();
    }
  }
}

const PuzzleContext = createContext<PuzzleState | null>(null);
const PuzzleDispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(null);

export {
  initialPuzzleState,
  puzzleReducer,
  PuzzleContext,
  PuzzleDispatchContext,
};
