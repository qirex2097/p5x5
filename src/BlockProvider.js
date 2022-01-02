import React, { createContext, useState, useContext } from "react";

const BlockContext = createContext();
export const useBlocks = () => useContext(BlockContext);

export default function BlockProvider({ children }) {
  const TATE = 5;
  const YOKO = 5;
  const [blocks, setBlocks] = useState(Array(TATE * YOKO).fill({}));

  return (
    <BlockContext.Provider value={{ blocks, setBlocks }}>{children}</BlockContext.Provider>
  );
}
