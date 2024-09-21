var instancedSketch = function(p) {
    let angle = 0;
    let direction = 1;
    let cols = 2;
    let rows = 2;
    let r = 220;
    let g = 150;
    let b = 200;
    let a = 470;
    let c = 30;
    let mc;

    let spacingX;
    let spacingY;
    
        p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('pop-container');
        spacingX = p.width / cols;
        spacingY = p.height / rows;
        mc = create2DArray(cols, rows, 1);
        };
    
        p.draw = function() {
        p.background(0);
    
        let colIndex = p.floor(p.mouseX / (p.width / 2));
        let rowIndex = p.floor(p.mouseY / (p.height / 2));
    
        for (let k = 0; k < 30; k++) {
            let offsetX = k * p.cos(angle);
            let offsetY = k * p.sin(angle);
    
            p.stroke(161, 215, 208);
            p.strokeWeight(1);
    
            for (let t = 1; t < cols; t++) {
            for (let s = 1; s < rows; s++) {
                let x = t * spacingX + spacingX / 2;
                let y = s * spacingY + spacingY / 2;
                let mouse = mc[t][s];
    
                if (t === colIndex && s === rowIndex) {
                mouse = 15;
                }
    
                if (direction == -1) {
                
                    p.fill(b * mouse, r + 20 * s, g + t * 20);
                    p.arc(
                    p.width / 2 * t + offsetX * offsetY / 20 * mouse,
                    p.height / 2 * s + offsetX / offsetY,
                    a, a, p.PI / 2, p.PI + angle, p.CHORD );
                
                }
    
                if (direction == 1) {
                    p.fill(b * mouse, r + 20 * s, g + t * 20);
                    p.arc(
                    p.width / 2 * t + offsetX * offsetY / 20 * mouse,
                    p.height / 2 * s + offsetX / offsetY,
                    a, a, p.PI / 2, p.PI + angle, p.CHORD );
                }
            }
            }
        }
    
        if (angle > p.PI || angle < 0) {
            direction *= -1;
            a = p.int(p.random(350, 470));
            c = p.int(p.random(10, 80));
            r = p.int(p.random(200, 255));
            g = p.int(p.random(150, 255));
            b = p.int(p.random(150, 255));
            
        } else {
            direction *= 1;
        }
    
        angle += 0.009 * direction;
        };
    
        function create2DArray(cols, rows, initialValue) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
            for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = initialValue;
            }
        }
        return arr;
        }
    };
    
    new p5(instancedSketch);
    