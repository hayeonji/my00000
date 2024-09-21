var clovaSketch = function(p) {
    let cw = 550; 
    let gridSize = cw * 0.33; 
    let xOffset; 
    let yOffset; 
    let cols = 4; 
    let rows = 4; 
    let generationSpeed = 1;

    p.setup = function() {
        p.createCanvas(cw, cw).parent('clova'); 
        p.background(245, 245, 245);
        p.frameRate(10);

        xOffset = (p.width - cols * gridSize) / 2;
        yOffset = (p.height - rows * gridSize) / 2;
    };

    p.draw = function() {
        p.background(245, 245, 245, 30);

        let colors = [p.random(200, 255), p.random(100, 255), p.random(100, 255)];
        let redColor = colors[0];
        let greenColor = colors[1];
        let blueColor = colors[2];
        fillGradient(redColor, greenColor, blueColor);
    };

    function fillGradient(c1, c2, c3) {
        let numRects = 1;
        let maxRadius = gridSize;

        for (let i = 0; i < numRects; i++) {
            for (let x = xOffset; x < p.width; x += gridSize) {
                for (let y = yOffset; y < p.height; y += gridSize) {
                    let radius = p.random(10, maxRadius);

                    let distance = p.dist(x, y, p.mouseX, p.mouseY);
                    let alpha = p.map(distance, 0, 70, 255, 0);
                    if (alpha < 0) alpha = 0;

                    let sizeChange = generationSpeed *  (distance < 70 ? 1 : -1);

                    let smoothedSize = p.lerp(radius, radius + sizeChange, 0.1);
                    if (distance < 70 || p.mouseIsPressed) {
                        drawEllipse(x, y, smoothedSize, c3, c1, c2);
                    } else {
                        drawRect(x, y, smoothedSize, c1, c2, c3);
                    }
                }
            }
        }
    }

    function drawRect(x, y, size, ...colors) {
        let halfSize = size / 2; 

        for (let r = size; r > 0; r--) {
            let alpha = p.map(r, size, 0, 255, 0); 
            p.fill(colors[0], colors[1], colors[2], alpha);

            p.rectMode(p.CENTER);
            p.rect(x, y, halfSize, halfSize); 
        }
    }

    function drawEllipse(x, y, size, ...colors) {
        let halfSize = size * 1.2; 

        for (let r = size; r > 0; r--) {
            let alpha = p.map(r, size, 0, 255, 0); 
            p.fill(colors[0], colors[1], colors[2], alpha);

            p.ellipse(x, y, halfSize, halfSize); 
        }
    }
    };

    new p5(clovaSketch);