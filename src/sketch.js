function sketch(p5) {
  let width = 600;
  let height = 400;
  let size = 50;
  let blocks = [];
  let hint = false;

  p5.setup = () => {
    p5.createCanvas(width, height);
  };

  p5.draw = () => {
    p5.background("moccasin");
    p5.fill("lightsteelblue");
    p5.rect(
      125 - 25 + 100 * Math.sin(p5.frameCount / 100),
      125 - 25 + 100 * Math.cos(p5.frameCount / 100),
      50
    );

    for (let i = 0; i < blocks.length; i++) {
      const x = (i % 5) * size;
      const y = Math.floor(i / 5) * size;
      const center_x = x + size / 2;
      const center_y = y + size / 2;
      const block = blocks[i];

      p5.strokeWeight(1);
      if (block.color) {
        p5.fill(block.color);
        p5.rect(x, y, size);
      }
      if (block.value > 0) {
        p5.fill("black");
        p5.stroke("black");
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(32);
        p5.text(block.value, center_x, center_y);
      } else if (hint) {
        const moji = getPosibility(blocks, i).join("");
        p5.fill("grey");
        p5.stroke("dimgrey")
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(12);
        p5.text(moji, center_x, center_y);
      }

      drawWaku(i, x, y);
    }
  };

  p5.updateWithProps = (props) => {
    if (width !== props.width || height !== props.height) {
      width = props.width;
      height = props.height;
      p5.resizeCanvas(width, height);
    }
    blocks = props.blocks;
    hint = props.hint;
  };

  const drawWaku = (block_no, x, y) => {
    const waku = getBlockWaku(block_no);
    const [x0, y0, x1, y1] = [x + 1, y + 1, x + size - 1, y + size - 1];
  
    p5.stroke("black");
    p5.strokeWeight(2);
    if (waku.includes('T')) p5.line(x0, y0, x1, y0);
    if (waku.includes('R')) p5.line(x1, y0, x1, y1);
    if (waku.includes('B')) p5.line(x1, y1, x0, y1);
    if (waku.includes('L')) p5.line(x0, y1, x0, y0);
  }

}

const block_data = [
  [0, 1, 5, 6, 10],
  [2, 3, 4, 7, 9],
  [14, 18, 19, 23, 24],
  [15, 17, 20, 21, 22],
  [8, 11, 12, 13, 16],
];

function getPosibility(blocks, i) {
  const posible = [];
  for (let j = Math.floor(i / 5) * 5; j < Math.floor(i / 5) * 5 + 5; j++) {
    if (blocks[j].value > 0) posible.push(blocks[j].value);
  }
  for (let j = i % 5; j < (i % 5) + 25; j += 5) {
    if (blocks[j].value > 0) posible.push(blocks[j].value);
  }

  for (let bb of block_data) {
    if (bb.includes(i)) {
      for (let j of bb) {
        if (blocks[j].value > 0) posible.push(blocks[j].value);
      }
      break;
    }
  }

  return [1, 2, 3, 4, 5]
    .filter((e) => {
      if (!posible.includes(e)) return e;
    })
    .sort();
}


function getBlockWaku(block_no) {
  let bb = [];
  for (bb of block_data) {
    if (bb.includes(block_no)) break;
  }

  const waku = [];
  if (block_no < 5 || !bb.includes(block_no - 5)) waku.push('T');
  if (block_no >= 20 || !bb.includes(block_no + 5)) waku.push('B');
  if (block_no % 5 === 0 || !bb.includes(block_no - 1)) waku.push('L');
  if (block_no % 5 === 4 || !bb.includes(block_no + 1)) waku.push('R');
  return waku;
}

export default sketch;
