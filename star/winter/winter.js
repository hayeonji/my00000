var instancedSketch = function(p) {
    let petals = [];
    const numPetals = 20;
    
        p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('winter'); ;
        let center1 = p.createVector(p.width / 2, p.height / 2);
    
        for (let i = 0; i < numPetals; i++) {
            let initialPosition = p.createVector(center1.x + p.random(0, p.width), center1.y + p.random(0, p.height));
            petals.push(new Petal(initialPosition));
        }
        };
    
        p.draw = function() {
        p.background(10, 10, 40);
    
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
            this.radius = p.random(10, 60);
            this.theta = p.random(p.TWO_PI);
            this.noiseOffsetX = p.random(1000);
            this.noiseOffsetY = p.random(2000);
            this.speed = p.createVector(0, 0);
            this.color = p.color(255); 
        }
        
        update() {
            let noiseFactor = 0.8;
            this.theta += 0.01;
            let noiseX = p.map(p.noise(this.noiseOffsetX), 0, 1, -3, 5);
            let noiseY = p.map(p.noise(this.noiseOffsetY), 0, 1, -3, 5);
    
            this.speed.x = noiseX * noiseFactor;
            this.speed.y = noiseY * noiseFactor;
    
            this.center1.add(this.speed);
    
            this.noiseOffsetX += 0.01;
            this.noiseOffsetY += 0.01;
        }
    
        display() {
            for (let k = 0; k < 100; k++) {
            let angle = k * p.TWO_PI / 40 + p.frameCount * 0.002;
            let offsetX = 20 * p.cos(angle);
            let offsetY = 20 * p.sin(angle);
            p.noFill();
            p.stroke(this.color);
            p.strokeWeight(0.5);
    
            p.beginShape();
            for (let i = 0; i < 5; i++) {
                let angle = p.map(i, 0, 5, 0, p.TWO_PI);
                let x = this.center1.x + this.radius * p.cos(angle * 3) + offsetX;
                let y = this.center1.y + this.radius * p.sin(angle * 2) + offsetY;
    
                p.vertex(x, y);
            }
            p.endShape(p.CLOSE);
            }
        }
    
        highlight() {
            this.color = p.color(255, 220, 121);
        }
        }
    };
    

    new p5(instancedSketch, 'winter');
