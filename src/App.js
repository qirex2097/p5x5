import React, { createContext, useContext, useState } from "react";
import Board from "./board";
import Command from "./command";
import useUndo from "./lib/undo-with-usestate";

export const BlockContext = createContext();

function Game(props) {
  const TATE = 5;
  const YOKO = 5;

  const [command, setCommand] = useState(null);
  const [blocks, setBlocks] = useState(Array(TATE * YOKO).fill({}));
  const [hint, setHint] = useState(false);
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


  const command_undo = () => {
    if (canUndo) {
      setBlocks(blocks_history.past[blocks_history.past.length - 1]);
      undoBlocksHistory();
    }
  }
  const command_redo = () => {
    if (canRedo) {
      setBlocks(blocks_history.future[0]);
      redoBlocksHistory();
    }
  }
  const command_cls = () => {
    const new_blocks = Array(TATE * YOKO).fill({});
    setBlocks(new_blocks);
    setBlocksHistory(new_blocks);
  }
  const command_hint = () => {
    setHint(!hint);
  }

  const command_func = {
    UNDO: command_undo,
    REDO: command_redo,
    CLS: command_cls,
    HINT: command_hint,
  }

  const selectCommand = (new_command) => {
    if (command && command.no === new_command.no) {
      setCommand(null);
    } else if (new_command.func) {
      setCommand(new_command);
    } else {
      command_func[new_command.moji]();
    }
  };

  const dispatchCommand = (block_no) => {
    if (!command) return;
    const new_blocks = Array(...blocks);
    const new_block = command.func(blocks[block_no], command);
    new_blocks[block_no] = new_block;
    setBlocks(new_blocks);
    setBlocksHistory(new_blocks);
  };

  return (
    <BlockContext.Provider value={{blocks}}>
      <h1>{props.title}</h1>
      <Board hint={hint} onSelect={dispatchCommand} />
      <Command command={command} onSelect={selectCommand} />
    </BlockContext.Provider>
  );
}

export default Game;
