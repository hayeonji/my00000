var instancedSketch = function(p) {
    let centerX, centerY;
    let radius = 50;
    let angle = 0;
    let d = 1;
    let trail = [];
    let expanding = false;
    let theme = 1;
    let r, g, b;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('cosmos');
        centerX = p.width / 2;
        centerY = p.height / 2;
    }

    p.draw = function() {
        p.background(0, 8);
        p.noFill(); 

        if (theme === 1) {
            r = 0; g = 255; b = 255;
        } else if (theme === 2) {
            r = 255; g = 0; b = 255;
        } else if (theme === 3) {
            r = 255; g = 255; b = 110;
        } else if (theme === 4) {
            r = 255; g = 0; b = 0;
        }

        for (let i = 0; i < trail.length; i++) {
            let alphaValue = p.map(i, 0, trail.length, 0, 255);
            p.stroke(r, g, b, alphaValue);
            p.ellipse(trail[i].x, trail[i].y, 5, 5);
        }

        for (let t = 0; t < 150; t++) {
            let xOffset = p.cos(angle + t * 2) * t;
            let yOffset = p.sin(angle + t * 2) * t;
            let xOnset = 1 / xOffset;
            let yOnset = 1 / yOffset;
        
            if (theme === 1) {
                p.ellipse(centerX + xOffset * yOffset + angle, centerY + yOffset, xOnset, xOnset);
            } else if (theme === 2) {
                p.ellipse(centerX + xOnset * xOnset + angle, centerY / 4 * 2 + yOffset * yOffset, xOffset, xOffset);
            } else if (theme === 3) {
                p.ellipse(centerX + xOffset + yOnset + angle, centerY + yOffset * xOnset, xOnset, xOnset);
            } else if (theme === 4) {
                p.ellipse(centerX + xOffset + xOnset + angle, centerY + yOnset + yOffset * angle, xOffset, xOffset);
            }
        }

        trail.push({ x: centerX, y: centerY });
        if (trail.length > 100) {
            trail.shift(); 
        }

        angle += 0.002 * d;
        radius += 0.05;

        if (p.PI * angle > p.TWO_PI * 2 || angle < 0) {
            d *= -1;
        }
    }

    p.mousePressed = function() {
        theme = (theme % 4) + 1;
    }
}; 

new p5(instancedSketch, 'cosmos');
