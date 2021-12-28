import blocks from "./block";

function sketch(p5) {
    let width = 600;
    let height = 400;
    let size = 50;

    p5.setup = () => {
        p5.createCanvas(width, height);
    }

    p5.draw = () => {
        p5.background('lightblue');
        for (let i = 0; i < blocks.length; i++) {
            const x = (i % 5) * size;
            const y = Math.floor(i / 5) * size;

            if (blocks[i] && blocks[i] !== 0) {
                p5.fill('black')
                p5.textSize(32);
                p5.textAlign(p5.CENTER, p5.CENTER);
                p5.text(blocks[i], x + size / 2, y + size / 2);
                p5.fill('red');
            } else {
                p5.noFill();
            }
        }
    }

    p5.updateWithProps = (props) => {
        if (width !== props.width || height !== props.height) {
            width = props.width;
            height = props.height;
            p5.resizeCanvas(width, height);
        }
    }
}

export default sketch;