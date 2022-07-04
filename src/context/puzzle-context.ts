import { isEqual, shuffle } from "lodash";
import { createContext, Dispatch } from "react";

import { CORRECT_TILES } from "../utils";

type PuzzleState = {
  currentTiles: number[][];
  activeTile: number | null;
  moves: number;
  isSolved: boolean;
};

const initialPuzzleState: PuzzleState = {
  // TODO: Shuffle 2D Array Puzzle Tiles Effeciently
  currentTiles: CORRECT_TILES.map((value) => shuffle(value)),
  activeTile: null,
  moves: 0,
  isSolved: false,
};

type ACTIONTYPE =
  | { type: "clicked_tile"; value: number }
  | { type: "shuffled" };

function puzzleReducer(draft: PuzzleState, action: ACTIONTYPE) {
  switch (action.type) {
    case "clicked_tile": {
      //* tiles cannot be changed, if the game is over
      if (draft.isSolved) {
        break;
      }

      const selectedTileRowIndex = draft.currentTiles.findIndex((value) =>
        value.find((value) => value === action.value)
      );
      const selectedTileColIndex = draft.currentTiles[
        selectedTileRowIndex
      ].findIndex((value) => value === action.value);
      console.log("selected:", selectedTileRowIndex, selectedTileColIndex);

      const whiteSpaceRowIndex = draft.currentTiles.findIndex((value) =>
        value.find((value) => value === 16)
      );
      const whiteSpaceColIndex = draft.currentTiles[
        whiteSpaceRowIndex
      ].findIndex((value) => value === 16);
      console.log("whitespace:", whiteSpaceRowIndex, whiteSpaceColIndex);

      // if the clicked tile is in the same row as the whitespace
      const isSolveableX = selectedTileRowIndex === whiteSpaceRowIndex;

      // if the clicked tile is in the same column as the white space
      const isSolveableY = selectedTileColIndex === whiteSpaceColIndex;

      // TODO: To be simplified soon!
      if (isSolveableX || isSolveableY) {
        // if the selected tile is close to whitespace
        if (
          selectedTileRowIndex === whiteSpaceRowIndex + 1 ||
          selectedTileRowIndex === whiteSpaceRowIndex - 1 ||
          selectedTileColIndex === whiteSpaceColIndex + 1 ||
          selectedTileColIndex === whiteSpaceColIndex - 1
        ) {
          // then, swap their values
          // Ex. [1, 2] => [2, 1]
          [
            draft.currentTiles[selectedTileRowIndex][selectedTileColIndex],
            draft.currentTiles[whiteSpaceRowIndex][whiteSpaceColIndex],
          ] = [
            draft.currentTiles[whiteSpaceRowIndex][whiteSpaceColIndex],
            draft.currentTiles[selectedTileRowIndex][selectedTileColIndex],
          ];
          // draft.currentTiles[selectedTileRowIndex][selectedTileColIndex] = 16;
          // draft.currentTiles[whiteSpaceRowIndex][whiteSpaceColIndex] =
          //   action.value;
          break;
        }
      }

      // TODO: To be simplified soon!
      if (isSolveableX) {
        if (selectedTileColIndex < whiteSpaceColIndex) {
          const arr = [16];
          for (let i = selectedTileColIndex; i < whiteSpaceColIndex; i++) {
            const element = draft.currentTiles[selectedTileRowIndex][i];
            arr.push(element);
          }
          console.log(arr);
          draft.currentTiles[selectedTileRowIndex].splice(
            selectedTileColIndex,
            whiteSpaceColIndex + 1,
            ...arr
          );
        } else {
          const arr = [16];
          for (let i = selectedTileColIndex; i > whiteSpaceColIndex; i--) {
            const element = draft.currentTiles[selectedTileRowIndex][i];
            arr.unshift(element);
          }
          draft.currentTiles[selectedTileRowIndex].splice(
            whiteSpaceColIndex,
            selectedTileColIndex + 1,
            ...arr
          );
        }
      }

      // TODO: To be simplified soon!
      if (isSolveableY) {
        if (selectedTileRowIndex < whiteSpaceRowIndex) {
          const arr = [16];
          for (let i = selectedTileRowIndex; i < whiteSpaceRowIndex; i++) {
            const element = draft.currentTiles[i][selectedTileColIndex];
            arr.push(element);
          }
          console.log(arr);
          for (let i = 0; i < arr.length; i++) {
            // if the selected tile is in the first row
            if (selectedTileRowIndex === 0) {
              draft.currentTiles[i][selectedTileColIndex] = arr[i];
            } else {
              draft.currentTiles[i + 1][selectedTileColIndex] = arr[i];
            }
            // console.log(arr[i]);
          }
        } else {
          const arr = [16];
          for (let i = selectedTileRowIndex; i > whiteSpaceRowIndex; i--) {
            const element = draft.currentTiles[i][selectedTileColIndex];
            arr.unshift(element);
          }
          console.log(arr);
          for (let i = 0; i < arr.length; i++) {
            //* this prevents the bug, i just don't know yet how it works XD
            if (selectedTileRowIndex === 3 && whiteSpaceRowIndex > 0) {
              draft.currentTiles[i + 1][selectedTileColIndex] = arr[i];
            } else {
              draft.currentTiles[i][selectedTileColIndex] = arr[i];
            }
          }
        }
      }

      draft.isSolved = isEqual(draft.currentTiles, CORRECT_TILES);
      break;
    }
    case "shuffled": {
      draft.currentTiles = shuffle(
        draft.currentTiles.map((value) => shuffle(value))
      );
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
