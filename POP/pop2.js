var instancedSketch = function(p) {
    let angle = 0;
    let direction = 1;
    let cols = 4;
    let rows = 4;
    let r = 200;
    let g = 120;
    let b = 80;
    let a = 50;
    let c = 60;
    let mc;

    let spacingX;
    let spacingY;

    p.setup = function() {
    p.createCanvas(600, 600).parent('pop2');
    spacingX = p.width / cols;
    spacingY = p.height / rows;
    mc = create2DArray(cols, rows, 1);
    
    };
    

    p.draw = function() {
    p.background(255);

    let colIndex = p.floor(p.mouseX / spacingX);
    let rowIndex = p.floor(p.mouseY / spacingY);

    for (let k = 0; k < 30; k++) {
        let offsetX = k * p.cos(angle);
        let offsetY = k * p.sin(angle) ;

        p.stroke(255, 0, 149);
        p.strokeWeight(1);

        for (let t = 1; t < cols; t++) {
        for (let s = 1; s < rows; s++) {
            let x = t * spacingX + spacingX / 2;
            let y = s * spacingY + spacingY / 2;
            let mouse = mc[t][s];

            if (t === colIndex && s === rowIndex) {
            mouse = 15;
            }

            if ((t + s) % 2 == 0) { 
            if (direction == -1) {
                p.fill(r + 20 * s, g + 20 * t, b * mouse);
                p.arc(
                p.width / 4 * t + offsetX / offsetY * 15,
                p.height / 4 * s + offsetX * offsetY / 60 ,
                c * offsetY/10 , c * offsetX/10, p.PI / 2, p.PI + angle, p.CHORD);
            } else {
                p.fill(b * mouse, r + 20 * s, g + t * 20);
                p.arc(
                p.width / 4 * t + offsetX * offsetY / 60 ,
                p.height / 4 * s + offsetX / offsetY * 15,
                c * offsetX/10 , c * offsetY/10, p.PI / 2, p.PI + angle, p.CHORD);
            }
            } else { 
            if (direction == -1) {
                p.fill(b * mouse, r + 20 * s, g + t * 20);
                p.arc(
                p.width / 4 * t + offsetX * offsetY / 60 ,
                p.height / 4 * s + offsetX / offsetY * 15,
                c * offsetX/10 , c * offsetY/10, p.PI / 2, p.PI + angle, p.CHORD);
            } else {
                p.fill(r + 20 * s, g + 20 * t, b * mouse);
                p.arc(
                p.width / 4 * t + offsetX / offsetY * 15,
                p.height / 4 * s + offsetX * offsetY / 60 ,
                c * offsetY/10 , c * offsetX/10 , p.PI / 2, p.PI + angle, p.CHORD);
            }
            }
        }
        }
    }

    if (angle > p.PI || angle < 0) {
        direction *= -1;
        a = p.int(p.random(10, 80));
        c = p.int(p.random(10, 80));
        r = p.int(p.random(50, 255));
        g = p.int(p.random(50, 255));
        b = p.int(p.random(50, 255));
    } else {
        direction *= 1;
    }

    angle += 0.009 * direction;
    }

    function mouseClicked() {
    let colIndex = p.floor(mouseX / spacingX);
    let rowIndex = p.floor(mouseY / spacingY);
    mc[colIndex][rowIndex] = 15;
    }

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

    function keyPressed() {
    if (key === 'r' || key === 'R') {
    mc = create2DArray(cols, rows, 1);
    }
    }

};

new p5(instancedSketch);