var starSketch = function(p) {
    let petal;
    let cw = 500;
    let squareSize = 80; // 정사각형의 크기

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('star-container'); 
        let center1 = p.createVector(p.width / 2, p.height / 2);
        let initialPosition = p.createVector(p.width / 2 + squareSize / 2, p.height / 2 + squareSize / 2); // 캔버스 상단 왼쪽 모서리에서 75씩 떨어진 위치
        petal = new Petal(initialPosition);
    };

    p.draw = function() {
        p.background(0);

        // 캔버스 위에 정사각형 그리기
        p.fill(0);
        p.noStroke();
        p.rect(150, 150, squareSize, squareSize); // 캔버스 상단 왼쪽 모서리에서 75씩 떨어진 위치에 정사각형 그리기

        let d = p.dist(p.mouseX, p.mouseY, p.width/2, p.height/2); // 캔버스 상단 왼쪽 모서리에서 75씩 떨어진 위치에서의 거리 계산
        if (d < 200) {
            petal.highlight();
        } else {
            petal.unhighlight(); // 꽃 범위를 벗어나면 다시 흰색으로 설정
        }
        petal.update();
        petal.display();
    };

    class Petal {
        constructor() {
            this.center1 = p.createVector(p.width / 2, p.height / 2); // Center of the canvas
            this.radius = p.random(100, 200);
            this.angle = 0; // Angle for rotation
            this.color = p.color(251, 249, 227);
        }
    
        update() {
            // Rotate the flower around its center
            this.angle += 0.01; // Adjust rotation speed as needed
        }
    
        display() {
            for (let k = 0; k < 150; k++) {
                let angle = k * p.TWO_PI / 40 + this.angle; // Use angle for rotation
                let offsetX = 50 * p.cos(angle);
                let offsetY = 50 * p.sin(angle);
                p.noFill();
                p.stroke(this.color);
                p.strokeWeight(0.5);
    
                p.beginShape();
                for (let i = 0; i < 5; i++) {
                    let angle = p.map(i, 0, 5, 0, p.TWO_PI);
                    let radius = this.radius + p.sin(angle * 5 + p.frameCount * 0.05) * 50;
                    let x = this.center1.x + radius * p.cos(angle * 3) + offsetX;
                    let y = this.center1.y + radius * p.sin(angle * 2) + offsetY;
    
                    p.vertex(x, y);
                }
                p.endShape(p.CLOSE);
            }
        }
    
        highlight() {
            this.color = p.color(255, 220, 121);
        }
    
        unhighlight() {
            this.color = p.color(251, 249, 227); // Set back to white
        }
    }
    
    
};

new p5(starSketch);