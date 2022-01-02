import { useContext } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "./sketch";
import Panel from "./panel";
import {useBlocks} from "./BlockProvider";

function Board({ hint, onSelect }) {
  const { blocks } = useBlocks();
  return (
    <div style={{ position: "relative", height: 260 }}>
      <ReactP5Wrapper
        sketch={sketch}
        width={250}
        height={250}
        blocks={blocks}
        hint={hint}
        style={{ position: "absolute" }}
      />
      <Panel
        panel={blocks}
        onSelect={onSelect}
        style={{ background: "transparent", border: "dashed 1px grey" }}
      />
    </div>
  );
}

export default Board;
