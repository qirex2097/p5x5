import { getBlock } from './block';

function sketch(p5) {
    let width = 600;
    let height = 400;
    let size = 50;
    let blocks = [];

    p5.setup = () => {
        p5.createCanvas(width, height);
    }

    p5.draw = () => {
        p5.background('moccasin');
        p5.fill('blue');
        p5.rect(125 - 25 + 100 * Math.sin(p5.frameCount / 100), 125 - 25 + 100 * Math.cos(p5.frameCount / 100), 50);

        for (let i = 0; i < blocks.length; i++) {
            const x = (i % 5) * size;
            const y = Math.floor(i / 5) * size;

            if (getBlock(blocks, i)) {
                p5.fill('black');
                p5.textAlign(p5.CENTER, p5.CENTER);
                p5.textSize(32);
                p5.text(blocks[i], x + size / 2, y + size / 2);
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
    }
}

export default sketch;