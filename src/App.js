import React, { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import blocks from './block';

function Panel({panel, onSelect, selected=null, size=50, style={}}) {
    const Buttons = ({buttons, top}) => {
        return buttons.map((v, i) => { 
            return (<button key={v} 
                            style={{width: size+'px', height: size+'px', position: 'absolute', top: top, left: i * size, 
                                    background: selected === v ? 'orange' : 'skyblue',
                                    ...style}}
                            onClick={ () => onSelect(v)}>{v}</button>) })
    }

    return (
        <>
            {panel.map((_, i) => {
                return (
                    <div key={i} style={{'display': 'grid', 'gridTemplateColumns': '50px 50px 50px 50px 50px'}}>
                        <Buttons buttons={panel[i]} top={i * size} />
                    </div>
                );
            })}
        </>
    );
}  

function Board({command, onSelect}) {
    const TATE=5;
    const YOKO=5;

    const values = [...Array(TATE)].map((_, i) => { 
        return [...Array(YOKO)].fill(100 + i * YOKO).map((p, q) => p + q)
    });

    return (
        <div style={{position:"relative"}}>
            <ReactP5Wrapper sketch={sketch} width={250} height={250} style={{position:"absolute"}}/>
            <Panel panel={values} onSelect={onSelect} style={{background: 'transparent', color: 'transparent', border: 'dashed 1px grey'}} />
        </div>
    );
}

function Command({command, onSelect}) {
    const command_button = [['1','2','3','4','5'], ['①','②','③','④','⑤'],[,,,,'DEL']];

    return (
        <div style={{position:'relative'}}>
            <Panel panel={command_button} onSelect={onSelect} selected={command} style={{color: 'black', border: 'solid 1px'}}/>
        </div>
    );
}

function Game(props) {
    const [command, setCommand] = useState(null);

    const button_pushed = (v) => {
        console.log(v % 100, blocks[v%100]);
        blocks[v % 100] =  command;
        console.log('Board:button_pushed', v, command, 'blocks', blocks[v % 100]);
        console.log('button_pushed:', command, v);
    }

    return (
        <>
            <h1>{props.title}</h1>
            <Board command={command} onSelect={(v) => {button_pushed(v)}} />
            <Command command={command} onSelect={(c) => command === c ? setCommand(null) : setCommand(c)} />
        </>
    );
}

export default Game