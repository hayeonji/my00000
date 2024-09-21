var instancedSketch = function(p) {
    let centerX, centerY;
    let angle = 0;
    let r, g, b;
    let speedMultiplier = 2; // Variable to control particle speed
    let pointSize = 1.3; // Size of the points
    
        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight).parent('cosmos-container'); // Set canvas size to 400x400
        centerX = p.width / 2;
        centerY = p.height / 2;
        p.background(0);
        };
    
        p.draw = function() {
        p.background(0, 10);
        p.noFill(); 
        let distance = p.dist(p.mouseX, p.mouseY, centerX, centerY);
        // Increase speed if mouse is held down
        if (distance <= 50) {
            p.stroke(255, 158, 21);
            speedMultiplier = 3;
        } else {
            p.stroke(191, 185, 231)
            speedMultiplier = 2;

        }
    
        // Draw particles
        for (let t = 0; t < 100; t++) {
            let xOffset = p.cos(angle + t * 10) * t;
            let yOffset = p.sin(angle + t * 5) * t;
            p.strokeWeight(pointSize); // Set point size
            
            p.point(centerX + xOffset * speedMultiplier, centerY + yOffset * speedMultiplier);
        }
    
        // Update angle
        angle += 0.01 * speedMultiplier;
        };
    };
    
    new p5(instancedSketch);
    