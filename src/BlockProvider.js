import React, { createContext, useState, useContext } from "react";
import useUndo from "./lib/undo-with-usestate";

const BlockContext = createContext();
export const useBlocks = () => useContext(BlockContext);

export default function BlockProvider({ children }) {
  const TATE = 5;
  const YOKO = 5;
  const [blocks, setBlocks] = useState(Array(TATE * YOKO).fill({}));
  const [
    blocks_history,
    {
      set: setBlocksHistory,
      //	   reset: resetBlocksHistory,
      undo: undoBlocksHistory,
      redo: redoBlocksHistory,
      canUndo,
      canRedo,
    },
  ] = useUndo(blocks);

  const getUndoBlocks = () => blocks_history.past[blocks_history.past.length - 1];
  const getRedoBlocks = () => blocks_history.future[0];

  const updateBlock = (block_no, new_block) => {
    const new_blocks = Array(...blocks);
    new_blocks[block_no] = new_block;
    setBlocks(new_blocks);
    setBlocksHistory(new_blocks);
  }

  const undoBlocks = () => {
    if (canUndo) {
      setBlocks(getUndoBlocks());
      undoBlocksHistory();
    }
  }
  const redoBlocks = () => {
    if (canRedo) {
      setBlocks(getRedoBlocks());
      redoBlocksHistory();
    }
  }
  const clsBlocks = () => {
    const new_blocks = Array(TATE * YOKO).fill({});
    setBlocks(new_blocks);
    setBlocksHistory(new_blocks);
  }

  return (
    <BlockContext.Provider
      value={{
        blocks,
        canUndo,
        canRedo,
        updateBlock,
        undoBlocks,
        redoBlocks,
        clsBlocks,
      }}
    >
      {children}
    </BlockContext.Provider>
  );
}
