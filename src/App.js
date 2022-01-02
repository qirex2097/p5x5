import React, { useState } from "react";
import Board from "./board";
import Command from "./command";
import { useBlocks } from "./BlockProvider";

function Game(props) {
  const [command, setCommand] = useState(null);
  const [hint, setHint] = useState(false);
  const {
    blocks,
    updateBlock,
    undoBlocks,
    redoBlocks,
    clsBlocks,
  } = useBlocks();

  const command_undo = () => undoBlocks();
  const command_redo = () => redoBlocks();
  const command_cls = () => clsBlocks();
  const command_hint = () => setHint(!hint);

  const command_func = {
    UNDO: command_undo,
    REDO: command_redo,
    CLS: command_cls,
    HINT: command_hint,
  };

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
    const new_block = command.func(blocks[block_no], command);
    updateBlock(block_no, new_block);
  };

  return (
    <>
      <h1>{props.title}</h1>
      <Board hint={hint} onSelect={dispatchCommand} />
      <Command command={command} onSelect={selectCommand} />
    </>
  );
}

export default Game;
