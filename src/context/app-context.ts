import { createContext } from "react";

type AppContextObject = {
  correctTiles: number[];
  currentTiles: number[];
};

const AppContext = createContext<AppContextObject | null>(null);

export default AppContext;
