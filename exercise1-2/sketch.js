let x;

function setup() {
    createCanvas(400, 400);
}

 function draw() {
    background(255);
    fill(255);
    let x = 10;
    while (x <= width) {
        circle(x, 200, 20);
        x += 20
    }
    let f = 10
    while (f <= mouseX) {
        fill(0, 0, 255);
        circle(f, 200, 20);
        f += 20;
    }
   
 }