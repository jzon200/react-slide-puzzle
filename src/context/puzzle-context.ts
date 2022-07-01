import { isEqual, shuffle } from "lodash";
import { createContext, Dispatch } from "react";

import { generatePuzzle } from "../utils";

const CORRECT_TILES = generatePuzzle();

const initialPuzzleState = {
  currentTiles: shuffle(CORRECT_TILES),
  selectedTile: null,
  moves: 0,
  isSolved: false,
};

type PuzzleState = {
  currentTiles: number[];
  selectedTile: number | null;
  moves: number;
  isSolved: boolean;
};

type ACTIONTYPE =
  | { type: "clicked_tile"; value: number }
  | { type: "shuffled" };

function puzzleReducer(draft: PuzzleState, action: ACTIONTYPE) {
  switch (action.type) {
    case "clicked_tile": {
      draft.selectedTile = action.value;

      const whiteSpaceIndex = draft.currentTiles.findIndex(
        (value) => value === 16
      );
      const selectedTileIndex = draft.currentTiles.findIndex(
        (value) => value === action.value
      );

      //* Checks if the selected tile and whitespace are close to each other
      if (
        selectedTileIndex === whiteSpaceIndex - 1 ||
        selectedTileIndex === whiteSpaceIndex + 1
      ) {
        //* Then, it swaps the selected tile and whitespace in the currentTiles Array state.
        draft.currentTiles[selectedTileIndex] = 16;
        draft.currentTiles[whiteSpaceIndex] = action.value;
        draft.moves++;
      }

      draft.isSolved = isEqual(draft.currentTiles, CORRECT_TILES);
      break;
    }
    case "shuffled": {
      draft.currentTiles = shuffle(draft.currentTiles);
      draft.selectedTile = null;
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
