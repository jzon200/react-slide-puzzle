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

      const selectedTileRowIndex = currentTiles.findIndex((value) =>
        value.find((value) => value === action.value)
      );
      const selectedTileColIndex = currentTiles[selectedTileRowIndex].findIndex(
        (value) => value === action.value
      );
      console.log("selected:", selectedTileRowIndex, selectedTileColIndex);

      const emptySpaceRowIndex = currentTiles.findIndex((value) =>
        value.find((value) => value === 16)
      );
      const emptySpaceColIndex = currentTiles[emptySpaceRowIndex].findIndex(
        (value) => value === 16
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
          currentTiles[selectedTileRowIndex][selectedTileColIndex] = 16;
          currentTiles[emptySpaceRowIndex][emptySpaceColIndex] = action.value;
        } else if (selectedTileColIndex < emptySpaceColIndex) {
          //* this is necessary to move the empty space at the selected tile
          const temp = [16];

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
          const temp = [16];

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
          const temp = [16];

          for (let i = selectedTileRowIndex; i < emptySpaceRowIndex; i++) {
            const element = currentTiles[i][selectedTileColIndex];
            temp.push(element);
          }

          console.log(temp);

          // manipulate the y-values of selected row
          for (let i = 0; i < temp.length; i++) {
            if (selectedTileRowIndex === 0) {
              currentTiles[i][selectedTileColIndex] = temp[i];
            } else {
              currentTiles[i + 1][selectedTileColIndex] = temp[i];
            }
          }
        } else if (selectedTileRowIndex > emptySpaceRowIndex) {
          // same logic above, but reverse engineered
          const temp = [16];

          for (let i = selectedTileRowIndex; i > emptySpaceRowIndex; i--) {
            const element = currentTiles[i][selectedTileColIndex];
            temp.unshift(element);
          }

          console.log(temp);

          for (let i = 0; i < temp.length; i++) {
            //* this prevents the bug, i just don't know yet how it works XD
            if (selectedTileRowIndex === 3 && emptySpaceRowIndex > 0) {
              currentTiles[i + 1][selectedTileColIndex] = temp[i];
            } else {
              currentTiles[i][selectedTileColIndex] = temp[i];
            }
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
