function sketch(p5) {
  let width = 600;
  let height = 400;
  let size = 50;
  let blocks = [];
  let hint = false;

  p5.setup = () => {
    p5.createCanvas(width, height);
  }
  
  p5.draw = () => {
    p5.background('moccasin');
    p5.fill('lightsteelblue');
    p5.rect(125 - 25 + 100 * Math.sin(p5.frameCount / 100), 125 - 25 + 100 * Math.cos(p5.frameCount / 100), 50);
    
    for (let i = 0; i < blocks.length; i++) {
      const x = (i % 5) * size;
      const y = Math.floor(i / 5) * size;
      const center_x = x + size / 2;
      const center_y = y + size / 2;
      const block = blocks[i];

      
      if (block.color) {
      	p5.fill(block.color);
	      p5.rect(x, y, size);
      }
      if (block.value > 0) {
        p5.fill('black');
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(32);
        p5.text(block.value, center_x, center_y);
      } else if (hint) {
        const moji = getPosibility(blocks, i).join('');
        p5.fill('grey');
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(12);
        p5.text(moji, center_x, center_y);
      }
    }
  }
  
  p5.updateWithProps = (props) => {
    if (width !== props.width || height !== props.height) {
      width = props.width;
      height = props.height;
      p5.resizeCanvas(width, height);
    }
    blocks = props.blocks;
    hint = props.hint;
  }
}

function getPosibility(blocks, i) {
  const posible = [];
  for (let j = Math.floor(i / 5) * 5; j < Math.floor(i / 5) * 5 + 5; j++) {
    if (blocks[j].value > 0) posible.push(blocks[j].value);
  }
  for (let j = i % 5 ; j < i % 5 + 25; j += 5) {
    if (blocks[j].value > 0) posible.push(blocks[j].value);
  }

  return [1,2,3,4,5].filter(e => {if (!posible.includes(e)) return e }).sort();
}

export default sketch;
