let currentPattern = 0;

var starSketch = function(p) {
    let petal;
    let cw = 1000;
    let squareSize = 80; // 정사각형의 크기

    p.setup = function() {
        p.createCanvas(cw, cw).parent('star');
        let initialPosition = p.createVector(75 + squareSize / 2, 75 + squareSize / 2); // 캔버스 상단 왼쪽 모서리에서 75씩 떨어진 위치
        petal = new Petal(initialPosition);
    };

    p.draw = function() {
        p.background(0);

        // 캔버스 위에 정사각형 그리기
        p.noFill();
        p.noStroke();
        p.rect(150, 150, squareSize, squareSize); // 캔버스 상단 왼쪽 모서리에서 75씩 떨어진 위치에 정사각형 그리기

        let d = p.dist(p.mouseX, p.mouseY, 150, 150); // 정사각형 중심에서의 거리 계산
        if (d < 50) {
            petal.highlight();
        } else {
            petal.unhighlight(); // 꽃 범위를 벗어나면 다시 흰색으로 설정
        }
        petal.update();
        petal.display();
    };

    class Petal {
        constructor(initialPosition) {
            this.center1 = initialPosition.copy();
            this.radius = p.random(80, 100);
            this.theta = p.random(p.TWO_PI);
            this.noiseOffsetX = p.random(1000);
            this.noiseOffsetY = p.random(2000);
            this.speed = p.createVector(0, 0);
            this.color = p.color('#acbcb1');
        }

        update() {
            let noiseFactor = 0.8;
            this.theta += 0.01;
            let noiseX = p.map(p.noise(this.noiseOffsetX), 0, 1, -1, 1);
            let noiseY = p.map(p.noise(this.noiseOffsetY), 0, 1, -1, 1);

            this.speed.x = noiseX * noiseFactor;
            this.speed.y = noiseY * noiseFactor;

            // 정사각형 바깥으로 나가지 않도록 제한
            if (this.center1.x + this.speed.x < 130 || this.center1.x + this.speed.x > 170) {
                this.speed.x *= -1;
            }
            if (this.center1.y + this.speed.y < 130 || this.center1.y + this.speed.y > 170) {
                this.speed.y *= -1;
            }

            this.center1.add(this.speed);

            this.noiseOffsetX += 0.01;
            this.noiseOffsetY += 0.01;
        }

        display() {
            switch (currentPattern) {
                case 1:
                    this.patternOne();
                    break;
                case 2:
                    this.patternTwo();
                    break;
                case 3:
                    this.patternThree();
                    break;
                case 4:
                    this.patternFour();
                    break;
                default:
                    this.defaultPattern();
                    break;
            }
        }

        defaultPattern() {
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

        patternOne() {
            this.color = p.color(255, 206, 216); // 색상 변경
            for (let k = 0; k < 150; k++) {
                let angle = k * p.TWO_PI / 100 + p.frameCount * 0.002;
                let offsetX = 20 * p.cos(angle);
                let offsetY = 20 * p.sin(angle);
                p.noFill();
                p.stroke(this.color);
                p.strokeWeight(0.5);

                p.beginShape();
                for (let i = 0; i < 5; i++) {
                    let angle = p.map(i, 0, 5, 0, p.TWO_PI);
                    let radius = this.radius -50 + p.sin(angle * 5 + p.frameCount * 0.05) * 20;
                    let x = this.center1.x + radius * p.cos(angle) + offsetX;
                    let y = this.center1.y + radius * p.sin(angle) + offsetY;

                    p.vertex(x, y);
                }
                p.endShape(p.CLOSE);
            }
        }

        patternTwo() {
            this.color = p.color(230, 255, 235);
            let numLayers = 20;
            let numSegments = 20;
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
                    let radius = this.radius - 30 + p.sin(angle * 5 + p.frameCount * 0.05) * 20;
                    let x = this.center1.x + radius * p.cos(angle) + offsetX;
                    let y = this.center1.y + radius * p.sin(angle) + offsetY;

                    p.vertex(x, y);
                }
                p.endShape(p.CLOSE);
            }
        }

        patternThree() {
            this.color = p.color('#ffc49b');
            for (let k = 0; k < 100; k++) {
                let angle = k * p.TWO_PI / 30 + p.frameCount * 0.002;
                let offsetX = 10 * p.cos(angle);
                let offsetY = 10 * p.sin(angle);
                p.noFill();
                p.stroke(this.color);
                p.strokeWeight(0.5);

                p.beginShape();
                for (let i = 0; i < 10; i++) {
                    let angle = p.map(i, 0, 8, 0, p.TWO_PI);
                    let x = this.center1.x + this.radius * p.cos(angle * 3) + offsetX;
                    let y = this.center1.y + this.radius * p.sin(angle * 2) + offsetY;

                    p.vertex(x, y);
                }
                p.endShape(p.CLOSE);
            }

            }
        
    
        patternFour() {
            this.color = p.color('#ffefd3');
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
            this.color = p.color('#ffefd3');
        }

        unhighlight() {
            this.color = p.color(255); // 다시 흰색으로 설정
        }
    }
};

new p5(starSketch);