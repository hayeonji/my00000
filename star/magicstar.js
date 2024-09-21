var instancedSketch = function(p) {
    let petals = [];
    const numPetals = 20;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('allstar-container');
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

    p.mouseClicked = function() {
        for (let i = 0; i < numPetals; i++) {
            let center1 = p.createVector(p.width / 2, p.height / 2);
            let initialPosition = p.createVector(center1.x + p.random(-p.width / 2, p.width / 2), center1.y + p.random(-p.height / 2, p.height / 2));
            petals.push(new Petal(initialPosition, i % 2 === 0));
        }
    };

    class Petal {
        constructor(initialPosition, isSimpleShape) {
            this.center1 = initialPosition.copy();
            this.radius = p.random(10, 50);
            this.theta = p.random(p.TWO_PI);
            this.noiseOffsetX = p.random(100);
            this.noiseOffsetY = p.random(200);
            this.speed = p.createVector(0, p.random(-1, 1.5)); // Set initial downward speed
            this.color = p.color('#acbcb1');
            this.isSimpleShape = isSimpleShape; // Determine the shape type
        }

        update() {
            this.theta += 0.01;
            let noiseX = p.map(p.noise(this.noiseOffsetX), 0, 1, -1, 2);
            let noiseY = p.map(p.noise(this.noiseOffsetY), 0, 1, 1, 2); // Falling motion

            this.speed.x = noiseX;
            this.speed.y += noiseY * 0.01; // Gravity effect

            this.center1.add(this.speed);

            this.noiseOffsetX += 0.01;
            this.noiseOffsetY += 0.01;

            // Reset position if it falls off the screen
            if (this.center1.y > p.height) {
                this.center1.y = 0;
                this.center1.x = p.random(p.width);
                this.speed.y = p.random(-1, 1.5); // Reset speed
            }
        }

        display() {
            let numSegments = 30; // Adjust number of segments for leaf-like shape
            p.noFill();
            p.stroke(this.color);
            p.strokeWeight(1);

            p.beginShape();
            for (let i = 0; i < numSegments; i++) {
                let angle = p.map(i, 0, numSegments, 0, p.TWO_PI);
                let radius;

                // Alternate between two different radius calculations for unique shapes
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
            let colors = [p.color('#ffefd3'), p.color(255, 255, 255), p.color('#ffc49b')];
            this.color = p.random(colors);
        }
    }
};
new p5(instancedSketch, 'allstar-container');
