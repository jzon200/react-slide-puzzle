import { useContext } from "react";
import {
  PuzzleContext,
  PuzzleDispatchContext,
} from "../context/puzzle-context";

function usePuzzleSelector() {
  return useContext(PuzzleContext)!;
}

function usePuzzleDispatch() {
  return useContext(PuzzleDispatchContext)!;
}

export { usePuzzleSelector, usePuzzleDispatch };
