const canvasSketch = require('canvas-sketch');

const settings = {
    //dimensions: [3000, 3000]
    dimensions: [1654, 1169]
}

let bees = [];
let NUMBER_OF_ROWS = 10;
let NUMBER_OF_COLS = 7;
let NUMBER_OF_BEES = 100;
const sketch = async () => {
    let response = await fetch('http://localhost:3000/bee?number=200');
    let data = await response.json();
    bees = data;

    console.log(bees.length);
    //let drawing = bees[0].drawing;
    //console.log(drawing);
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        for (let i = 0; i < NUMBER_OF_ROWS; i++) {
            for (let j = 0; j < NUMBER_OF_COLS; j++) {
                context.beginPath();
                context.translate(155*i, 155*j);
                let beeNumber = i*NUMBER_OF_COLS+j;
                //console.log(beeNumber);
                drawBee(bees[beeNumber].drawing);
                context.translate(-155*i,-155*j);
                context.closePath()
            }
        }

        function drawBee(drawing) {
            
            for (let path of drawing) {
                //console.log(path);
                context.strokeWidth = 3;
                context.strokeStyle = "black";
                context.lineWidth = 3;

                for (let i = 0; i < path[0].length; i++) {
                    let x = path[0][i]/2;
                    let y = path[1][i]/2;
                    //console.log("x:", path[0][i], "y:", path[1][i]);
                    context.lineTo(x, y);
                    context.stroke();
                }
            }
        }
    }
}

canvasSketch(sketch, settings);