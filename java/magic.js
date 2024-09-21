var instancedSketch = function(p) {
    let cols = 1;
    let rows = 1;
    let r = 250;
    let g = 152;
    let b = 138;
    let t = 30;

    let spacingX;
    let spacingY;
    let isMouseInside = false; // 상태 변수 추가

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('magic-container');
        spacingX = p.width / cols;
        spacingY = p.height / rows;
    };

    p.draw = function() {
    p.background(0);

      let mouseIsOverLoop = false; // 루프 위에 마우스가 있는지 추적하기 위한 변수
    
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
            let x = i * spacingX + spacingX / 2;
            let y = j * spacingY + spacingY / 2;
    
            // Calculate distance between mouse and center of the loop
            let d = p.dist(p.mouseX, p.mouseY, x, y);
            if (d < 50) {
                mouseIsOverLoop = true;
                if (!isMouseInside) {
                changeColorsAndT();
                isMouseInside = true;
                }
            }
    
            for (let k = 30; k < 150; k++) {
                let angle = k * p.TWO_PI / 50 + p.frameCount * 0.05;
                let offsetX = t * p.cos(angle) * 5;
                let offsetY = 20 * p.sin(angle) * 5;
                p.stroke(0);
                p.fill(r, g, b);
                p.rectMode(p.CENTER);
                p.rect(x + offsetX, y + offsetY, k, angle);
            }
            }
        }
    
        // 마우스가 모든 루프 밖으로 나갔는지 확인
        if (!mouseIsOverLoop) {
            isMouseInside = false;
        }
        };
    
        function changeColorsAndT() {
        r = p.int(p.random(200, 255)); // r 값을 고정하여 변경되지 않도록 함
        g = p.int(p.random(100, 255));
        b = p.int(p.random(100, 255));
        t = p.int(p.random(50, 100));
        }
    };
    
    new p5(instancedSketch);
    