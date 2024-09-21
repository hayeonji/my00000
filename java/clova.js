let clovaSketch = function(p) {
    let cw;
    let gridSize = 0.6;
    let xOffset, yOffset;
    let generationSpeed = 1;

    p.setup = function() {
        cw = Math.min(p.windowWidth, p.windowHeight);
        p.createCanvas(p.windowWidth, p.windowHeight).parent('clova-container');
        p.background(0);
        p.frameRate(10);

        // 그리드의 크기를 계산하여 중앙에 위치하도록 xOffset과 yOffset을 설정
        xOffset = (p.width - gridSize * cw) / 2;
        yOffset = (p.height - gridSize * cw) / 2;
    };

    p.draw = function() {
        p.background(0, 50);
        let colors = [p.random(100, 255), p.random(100, 255), p.random(100, 255)];

        let redColor = colors[0];
        let blueColor = colors[1];
        let greenColor = colors[2];
        fillGradient(redColor, greenColor, blueColor);
    };

    function fillGradient(c1, c2, c3) {
        p.fill(c1, c2, c3, 5);

        let numRects = 1;
        let maxRadius = gridSize * cw;

        for (let i = 0; i < numRects; i++) {
            for (let x = xOffset; x < p.width - xOffset; x += gridSize * cw) {
                for (let y = yOffset; y < p.height - yOffset; y += gridSize * cw) {
                    let radius = p.random(10, maxRadius);

                    let distance = p.dist(p.width/2, p.height/2, p.mouseX, p.mouseY);
                    if (distance < 70 || p.mouseIsPressed) {
                        drawEllipse(x, y, radius, c2, c3, c1);
                    } else {
                        drawRect(x, y, radius, c1, c2, c3);
                    }
                }
            }
        }
    }

    function drawRect(x, y, size, c1, c2, c3) {
        for (let r = 0; r < size - 30; r++) {
            p.strokeWeight(0.5);
            p.stroke(255);

            p.rectMode(p.CENTER);
            p.rect(p.width/2, p.height/2, r, r);
        }
    }

    function drawEllipse(x, y, size, c1, c2, c3) {
        for (let r = 0; r < size; r++) {
            p.strokeWeight(0.5);
            p.stroke(255);

            p.ellipse(p.width/2, p.height/2, r, r);
        }
    }
};

new p5(clovaSketch);














