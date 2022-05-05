import { createContext } from "react";

export type ContextType = {
  tooltipText: string;
  setTooltipText: (c: string) => void;
};

export const Context = createContext<ContextType>({
  tooltipText: "Прежде чем действовать, надо понять",
  setTooltipText: () => {},
});
