import React, { useState } from 'react';
import Board from './board';
import Command from './command';
import useUndo from './lib/undo-with-usestate';


function Game(props) {
  const TATE=5;
  const YOKO=5;

  const [command, setCommand] = useState(null);
  const [blocks, setBlocks] = useState(Array(TATE * YOKO).fill({}));
  const [hint, setHint] = useState(false);
  const [blocks_history,
	 {
	   set: setBlocksHistory,
//	   reset: resetBlocksHistory,
	   undo: undoBlocksHistory,
	   redo: redoBlocksHistory,
	   canUndo,
	   canRedo,
	 }
	] = useUndo(blocks);

  const selectCommand = (new_command) => {
    if (command && command.no === new_command.no) {
      setCommand(null);
    } else if (new_command.func) {
      setCommand(new_command);
    } else {
      if (new_command.moji === 'UNDO') {
      	if (canUndo) {
	        setBlocks(blocks_history.past[blocks_history.past.length - 1]);
	        undoBlocksHistory();
	      }
      } else if (new_command.moji === 'REDO') {
	      if (canRedo) {
	        setBlocks(blocks_history.future[0]);
	        redoBlocksHistory();
	      }
      } else if (new_command.moji === 'CLS') {
	      const new_blocks =Array(TATE * YOKO).fill({});
	      setBlocks(new_blocks);
	      setBlocksHistory(new_blocks);
      } else if (new_command.moji === 'HINT') {
        setHint(!hint);
      }
    }
  }

  const dispatchCommand = (block_no) => {
    if (!command) return;
    const new_blocks = Array(...blocks);
    const new_block = command.func(blocks[block_no], command);
    new_blocks[block_no] = new_block;
    setBlocks(new_blocks);
    setBlocksHistory(new_blocks);
  }

  return (
    <>
      <h1>{props.title}</h1>
      <Board blocks={blocks} hint={hint} onSelect={dispatchCommand} />
      <Command command={command} onSelect={selectCommand} />
    </>
  );
}

export default Game
