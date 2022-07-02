import { ReactNode } from "react";
import { useImmerReducer } from "use-immer";
import {
  initialPuzzleState,
  PuzzleContext,
  PuzzleDispatchContext,
  puzzleReducer,
} from "./puzzle-context";

type Props = {
  children: ReactNode;
};

export default function PuzzleContextProvider({ children }: Props) {
  const [state, dispatch] = useImmerReducer(puzzleReducer, initialPuzzleState);

  return (
    <PuzzleContext.Provider value={state}>
      <PuzzleDispatchContext.Provider value={dispatch}>
        {children}
      </PuzzleDispatchContext.Provider>
    </PuzzleContext.Provider>
  );
}
