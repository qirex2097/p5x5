import React, { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import command_data from './block';

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

function Board({command}) {
  const TATE=5;
  const YOKO=5;

  const [blocks, setBlocks] = useState(Array(TATE * YOKO).fill({}));

  function dispatch_command(block_no, command) {
    if (!command) return;
    const new_blocks = Array(...blocks);
    new_blocks[block_no] = command.func(blocks[block_no], command);
    setBlocks(new_blocks);
  }
  
  return (
    <div style={{position:"relative", height:260}}>
      <ReactP5Wrapper sketch={sketch} width={250} height={250} blocks={blocks} style={{position:"absolute"}}/>
      <Panel panel={blocks} onSelect={(v) => { dispatch_command(v, command)}} style={{background: 'transparent', border: 'dashed 1px grey'}} />
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

        return command.no === i_command.no ? command.style : base_style;
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
    const [command, setCommand] = useState(null);

    return (
        <>
            <h1>{props.title}</h1>
            <Board command={command} />
            <Command command={command} onSelect={(c) => command && command.no === c ? setCommand(null) : setCommand(command_data.find(e => e.no === c))} />
        </>
    );
}

export default Game
