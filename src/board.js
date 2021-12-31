import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch';
import Panel from './panel';

function Board({blocks, onSelect}) {
    return (
      <div style={{position:"relative", height:260}}>
        <ReactP5Wrapper sketch={sketch} width={250} height={250} blocks={blocks} style={{position:"absolute"}}/>
        <Panel panel={blocks} onSelect={onSelect} style={{background: 'transparent', border: 'dashed 1px grey'}} />
      </div>
    );
  }
  
export default Board;