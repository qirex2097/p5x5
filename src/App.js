import React, { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import command_data from './block';
import useUndo from './lib/undo-with-usestate';

function Panel({panel, onSelect, yoko=5, size=50, style={}, selectedStyle = (i) => { return {background: 'transparent'}}}) {
  return (
    <>
      {panel.map((v, i) => {
        const no = Number.isInteger(v.no) ? v.no : i;
	const moji = v.moji || '';
        return (<button key={no} 
                        style={{width:size+'px', height:size+'px', position: 'absolute', top:Math.floor(no / yoko) * size, left: (no % yoko) * size,
                                ...selectedStyle(no),
                                ...style}}
                        onClick={ () => onSelect(no) }>
                  {moji}
                </button>)
      })}
    </>
  );
}

function Board({blocks, onSelect}) {
  return (
    <div style={{position:"relative", height:260}}>
      <ReactP5Wrapper sketch={sketch} width={250} height={250} blocks={blocks} style={{position:"absolute"}}/>
      <Panel panel={blocks} onSelect={onSelect} style={{background: 'transparent', border: 'dashed 1px grey'}} />
    </div>
  );
}

function Command({command, onSelect}) {
  const selectedStyle = (i_command) => {
    if (!i_command) return {};

    const base_style = i_command.base_style ? i_command.base_style : {background: 'transparent', border: 'solid 1px black'};
    
    if (!command) { 
      return base_style;
    }
    const selected_style = command.selected_style || base_style;
    
    return command.no === i_command.no ? selected_style : base_style;
  }
  
  return (
    <div style={{position:'relative', height:160}}>
      <Panel panel={command_data} onSelect={onSelect} 
             selectedStyle={ i => selectedStyle(command_data.find(e => e.no === i)) }
      />
    </div>
  );
}

function Game(props) {
  const TATE=5;
  const YOKO=5;

  const [command, setCommand] = useState(null);
  const [blocks, setBlocks] = useState(Array(TATE * YOKO).fill({}));
  const [blocks_history,
	 {
	   set: setBlocksHistory,
	   reset: resetBlocksHistory,
	   undo: undoBlocksHistory,
	   redo: redoBlocksHistory,
	   canUndo,
	   canRedo,
	 }
	] = useUndo(blocks);

  const selectCommand = (c) => {
    if (command && command.no === c) {
      setCommand(null);
    } else {
      const new_command = command_data.find(e => e.no === c);
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
	setBlocksHistory(new_blocks);
	setBlocks(new_blocks);
      } else {
	setCommand(new_command);
      }
    }
  }

  const dispatchCommand = (block_no) => {
    if (!command) return;
    const new_blocks = Array(...blocks);
    const new_block = command.func(blocks[block_no], command);
    new_blocks[block_no] = new_block;
    setBlocksHistory(new_blocks);
    setBlocks(new_blocks);
  }

  return (
    <>
      <h1>{props.title}</h1>
      <Board blocks={blocks} onSelect={dispatchCommand} />
      <Command command={command} onSelect={selectCommand} />
    </>
  );
}

export default Game
