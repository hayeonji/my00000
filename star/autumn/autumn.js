var instancedSketch = function(p) {
    let petals = [];
    const numPetals = 20;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        let center1 = p.createVector(p.width / 2, p.height / 2);

        for (let i = 0; i < numPetals; i++) {
            let initialPosition = p.createVector(center1.x + p.random(0, p.width), center1.y + p.random(0, p.height));
            petals.push(new Petal(initialPosition, i % 2 === 0)); // Alternate between two types of petals
        }
    };

    p.draw = function() {
        p.background(0);

        for (let petal of petals) {
            let d = p.dist(p.mouseX, p.mouseY, petal.center1.x, petal.center1.y);
            if (d < 50) {
                petal.highlight();
            }
            petal.update();
            petal.display();
        }
    };

    class Petal {
        constructor(initialPosition, isSimpleShape) {
            this.center1 = initialPosition.copy();
            this.radius = p.random(10, 50);
            this.theta = p.random(p.TWO_PI);
            this.noiseOffsetX = p.random(100);
            this.noiseOffsetY = p.random(200);
            this.speed = p.createVector(p.random(-1, 1), p.random(-1, 0.5)); // Adjust initial speed for falling motion
            this.color = p.color(p.random(200, 255), p.random(100, 150), 0); // Adjust color for autumn hues
            this.isSimpleShape = isSimpleShape; // Determine the shape type
            this.isFalling = true; // Flag to track if the petal is falling or settled
        }

        update() {
            if (this.isFalling) {
                this.theta += 0.01;
                let noiseX = p.map(p.noise(this.noiseOffsetX), 0, 1, -1, 1); // Reduce horizontal noise
                let noiseY = p.map(p.noise(this.noiseOffsetY), 0, 1, 0.5, 1); // Adjust vertical noise for falling motion

                this.speed.x = noiseX;
                this.speed.y += noiseY * 0.01; // Gravity effect

                this.center1.add(this.speed);

                this.noiseOffsetX += 0.01;
                this.noiseOffsetY += 0.01;

                // Check if petal has reached the ground
                if (this.center1.y >= p.height - this.radius) {
                    this.isFalling = false; // Stop falling
                    this.center1.y = p.height - this.radius; // Set position just above the ground
                    this.speed.mult(0); // Stop moving
                }
            }
        }

        display() {
            let numSegments = 10; // Reduce number of segments for simpler leaf-like shape
            p.noFill();
            p.stroke(this.color);
            p.strokeWeight(1);

            p.beginShape();
            for (let i = 0; i < numSegments; i++) {
                let angle = p.map(i, 0, numSegments, 0, p.TWO_PI);
                let radius;

                if (this.isSimpleShape) {
                    radius = this.radius * (0.5 + 0.5 * p.sin(angle * 10)); // Leaf-like shape
                } else {
                    radius = this.radius * (0.8 + 0.2 * p.sin(angle * 3)) * (0.1 + 0.7 * p.cos(angle * 6)); // More rounded shape
                }

                let x = this.center1.x + radius * p.cos(angle);
                let y = this.center1.y + radius * p.sin(angle);

                p.vertex(x, y);
            }
            p.endShape(p.CLOSE);
        }

        highlight() {
            let colors = [p.color(255, 214, 7)];
            this.color = p.random(colors);
        }
    }

    p.mouseClicked = function() {
        for (let i = 0; i < numPetals; i++) {
            let center1 = p.createVector(p.width / 2, p.height / 2);
            let initialPosition = p.createVector(center1.x + p.random(-p.width / 2, p.width / 2), center1.y + p.random(-p.height / 2, p.height / 2));
            petals.push(new Petal(initialPosition, i % 2 === 0)); // Alternate between two types of petals
        }
    };
};

new p5(instancedSketch, 'autumn');



