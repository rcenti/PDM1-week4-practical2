let x;

function setup() {
    createCanvas(400, 400);

}
 function draw() {
    background(255)
    fill(0, 0, 255);
    let x = 0
    while (x <= mouseX) {
        circle(x, 200, 20);
        x += 20;
    }

}
