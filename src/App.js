import React, { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import initialize_blocks, {command_moji, command_list} from './block';

function Panel({panel, onSelect, selected=null, yoko=5, size=50, style={}}) {
    return (
        <>
            {panel.map((v, i) => {
                return (<button key={i} 
                                style={{width:size+'px', height:size+'px', position: 'absolute', top:Math.floor(i / yoko) * size, left: (i % yoko) * size,
                                        background: selected === i ? 'orange' : 'lightblue',
                                        ...style}}
                                onClick={ () => onSelect(i) }>
                            {v}
                        </button>)
            })}
        </>
    );
}

function Board({blocks, onSelect}) {
    const TATE=5;
    const YOKO=5;

    const values = new Array(TATE * YOKO).fill('');

    return (
        <div style={{position:"relative", height:260}}>
            <ReactP5Wrapper sketch={sketch} width={250} height={250} blocks={blocks} style={{position:"absolute"}}/>
            <Panel panel={values} onSelect={onSelect} style={{background: 'transparent', border: 'dashed 1px grey'}} />
        </div>
    );
}

function Command({command, onSelect}) {
    return (
        <div style={{position:'relative', height:160}}>
            <Panel panel={command_moji} onSelect={onSelect} selected={command} style={{border: 'solid 1px grey'}}/>
        </div>
    );
}

function Game(props) {
    const [command, setCommand] = useState(null);
    const [blocks, setBlocks] = useState(initialize_blocks);

    function dispach_command(block_no, command) {
        if (!Number.isInteger(command) || command_list.length <= command) return;
        setBlocks(command_list[command](blocks, block_no, command));
    }

    return (
        <>
            <h1>{props.title}</h1>
            <Board blocks={blocks} onSelect={(v) => {dispach_command(v, command)}} />
            <Command command={command} onSelect={(c) => command === c ? setCommand(null) : setCommand(c)} />
        </>
    );
}

export default Game