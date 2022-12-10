const canvasSketch = require('canvas-sketch');

const settings = {
    dimensions: [3000, 3000]
}

let bees = [];
let NUMBER_OF_ROWS = 10;
let NUMBER_OF_COLS = 10;

const sketch = async () => {
    for (let i = 0; i < 100; i++) {
        let response = await fetch('http://localhost:3000/bee');
        let data = await response.json();
        bees.push(data);
    }

    console.log(bees.length);
    //let drawing = bees[0].drawing;
    //console.log(drawing);
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        for (let i = 0; i < NUMBER_OF_ROWS; i++) {
            for (let j = 0; j < NUMBER_OF_COLS; j++) {
                context.beginPath();
                context.translate(295*i, 295*j);
                let beeNumber = i*NUMBER_OF_COLS+j;
                //console.log(beeNumber);
                drawBee(bees[beeNumber].drawing);
                context.translate(-295*i,-295*j);
            }
        }

        function drawBee(drawing) {
            
            for (let path of drawing) {
                //console.log(path);
                context.strokeWidth = 5;
                context.strokeStyle = "gold";
                context.lineWidth = 4;

                for (let i = 0; i < path[0].length; i++) {
                    let x = path[0][i];
                    let y = path[1][i];
                    //console.log("x:", path[0][i], "y:", path[1][i]);
                    context.lineTo(x, y);
                    context.stroke();
                }
            }
        }
    }
}

canvasSketch(sketch, settings);