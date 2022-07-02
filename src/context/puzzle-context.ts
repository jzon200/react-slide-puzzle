import { isEqual, shuffle } from "lodash";
import { createContext, Dispatch } from "react";

import { CORRECT_TILES, isEven, isOdd } from "../utils";

type PuzzleState = {
  currentTiles: number[];
  activeTile: number | null;
  moves: number;
  isSolved: boolean;
};

const initialPuzzleState: PuzzleState = {
  currentTiles: shuffle(CORRECT_TILES),
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

      const whiteSpaceIndex = draft.currentTiles.findIndex(
        (value) => value === 16
      );
      const selectedTileIndex = draft.currentTiles.findIndex(
        (value) => value === action.value
      );

      const isSolveableX =
        selectedTileIndex === whiteSpaceIndex - 1 ||
        selectedTileIndex === whiteSpaceIndex + 1;

      //! This causes a bug, because it only used odd or even logic
      const isSolveableY =
        (isOdd(selectedTileIndex) && isOdd(whiteSpaceIndex)) ||
        (isEven(selectedTileIndex) && isEven(whiteSpaceIndex));

      //* Checks if the active tile and whitespace are close to each other
      if (isSolveableX || isSolveableY) {
        //* Then, it swaps the active tile and whitespace in the currentTiles Array state.
        draft.activeTile = action.value;
        draft.currentTiles[selectedTileIndex] = 16;
        draft.currentTiles[whiteSpaceIndex] = action.value;
        draft.moves++;
      }

      draft.isSolved = isEqual(draft.currentTiles, CORRECT_TILES);
      break;
    }
    case "shuffled": {
      draft.currentTiles = shuffle(draft.currentTiles);
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

const PuzzleContext = createContext<PuzzleState | null>(null)!;
const PuzzleDispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(null)!;

export {
  initialPuzzleState,
  puzzleReducer,
  PuzzleContext,
  PuzzleDispatchContext,
};
