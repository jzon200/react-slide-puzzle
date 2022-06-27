import { ReactNode, useState } from "react";
import generatePuzzle from "../utils/generatePuzzle";
import shufflePuzzle from "../utils/shufflePuzzle";
import AppContext from "./app-context";

type Props = {
  children: ReactNode;
};

// TODO: Moved the App Logic here
export default function AppContextProvider(props: Props) {
  const correctTiles = generatePuzzle();

  const [currentTiles, setCurrentTiles] = useState(shufflePuzzle(correctTiles));

  return (
    <AppContext.Provider value={{ correctTiles, currentTiles }}>
      {props.children}
    </AppContext.Provider>
  );
}
