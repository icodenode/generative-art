const canvasSketch = require('canvas-sketch');
let limit = 50;
const settings = {
    dimensions: [2048, 2048]
}

const sketch = () => {
    function draw(startX, startY, len, angle, ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(startX, startY);
        ctx.rotate(angle * Math.PI/180);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -len);
        ctx.stroke();

        if(len < 10) {
            ctx.restore();
            return;
        }

        draw(0, -len, len*0.8, -15,ctx);
        draw(0, -len, len*0.8, +15,ctx);

        ctx.restore();
    }

    return ({ context, width, height }) => {
           draw(width * .5, height, 300, 0, context)       
    }
}

canvasSketch(sketch, settings);