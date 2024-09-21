var instancedSketch = function(p) {
    let petals = [];
    const numPetals = 20;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        let center1 = p.createVector(p.width / 2, p.height / 2);

        for (let i = 0; i < numPetals; i++) {
            let initialPosition = p.createVector(center1.x + p.random(0, p.width), center1.y + p.random(0, p.height));
            petals.push(new Petal(initialPosition));
        }
    };

    p.draw = function() {
        p.background(255);

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
            petals.push(new Petal(initialPosition));
        }
    };

    class Petal {
        constructor(initialPosition) {
            this.center1 = initialPosition.copy();
            this.radius = p.random(10, 30);
            this.theta = p.random(p.TWO_PI);
            this.noiseOffsetX = p.random(100);
            this.noiseOffsetY = p.random(200);
            this.speed = p.createVector(0, 0);
            this.color = p.color(152, 201, 178);
        }

        update() {
            this.theta += 0.01;
            let noiseX = p.map(p.noise(this.noiseOffsetX), 0, 1, -3, 5);
            let noiseY = p.map(p.noise(this.noiseOffsetY), 0, 1, -3, 5);

            this.speed.x = noiseX;
            this.speed.y = noiseY;

            this.center1.add(this.speed);

            this.noiseOffsetX += 0.01;
            this.noiseOffsetY += 0.01;
        }

        display() {
            let numSegments = 20;
            let numLayers = 20;
            for (let k = 0; k < numLayers; k++) {
                let angle = k * p.TWO_PI / numSegments + p.frameCount * 0.002;
                let offsetX = 20 * p.cos(angle);
                let offsetY = 20 * p.sin(angle);
                p.noFill();
                p.stroke(this.color);
                p.strokeWeight(1);

                p.beginShape();
                for (let i = 0; i < 6; i++) {
                    let angle = p.map(i, 0, 6, -p.PI / 3, p.PI / 3);
                    let radius = this.radius + p.sin(angle * 5 + p.frameCount * 0.05) * 20;
                    let x = this.center1.x + radius * p.cos(angle) + offsetX;
                    let y = this.center1.y + radius * p.sin(angle) + offsetY;

                    p.vertex(x, y);
                }
                p.endShape(p.CLOSE);
            }
        }

        highlight() {
            let colors = [p.color(242, 129, 203),  p.color(0, 206, 124), p.color('#00aa36')];
            this.color = p.random(colors);
        }
    }
};


new p5(instancedSketch, 'summer');  