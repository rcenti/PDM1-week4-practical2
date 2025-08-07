import { TestResults, TestRectangle, advanceToFrame, checkCanvasSize, getShapes, testShapesMatchWithoutOrder, coloursMatch, RECT, runMouseClick } from "../../lib/test-utils.js";

/**
 * A hacky solution to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) {
        clearInterval(loadTimer);
        runTests(canvases[0]);
    }
}

function getMostRecentShapes(shapes) {
    if (shapes.length === 8) {
        return shapes;
    } else {
        const row = [];
        for (const s of shapes) {
            const index = floor(s.x / (width / 8));
            if (s.type === RECT && index >= 0 && index <= 7) {
                row[index] = s;
            }
        }
        return row;
    }
}

function checkMousePressed(mX, mY) {
    mouseX = mX;
    mouseY = mY;
    mouseIsPressed = true;
    runMouseClick();
    advanceToFrame(frameCount + 1);
    // Take the last 8 shapes (in case background not called)
    const currentShapes = getShapes();
    if (currentShapes.length >= 8) {
        const frameShapes = getMostRecentShapes(currentShapes);
        // find the selected shape
        const index = floor(mX / (width / 8));
        if (frameShapes[index]) { // make sure it's not null / undefined
            const selectedCol = frameShapes[index].fillColour;
            if (!coloursMatch(selectedCol, color(255, 255, 255, 255))) {
                TestResults.addPass(`When the mouse is pressed at ${mX}, ${mY}, the selected shape is not white.`);
            } else {
                TestResults.addFail(`When the mouse is pressed at ${mX}, ${mY}, the shape at ${frameShapes[index].x}, ${frameShapes[index].y} should be blue, not white.`);
            }
            let allOthersWhite = true;
            for (let i = 0; i < 8; i++) {
                if (i !== index && frameShapes[i] && !coloursMatch(frameShapes[i].fillColour, color(255, 255, 255, 255))) {
                    allOthersWhite = false;
                    break;
                }
            }
            if (allOthersWhite) {
                TestResults.addPass(`When the mouse is pressed at ${mX}, ${mY}, shapes that are not selected are white.`);
            } else {
                TestResults.addFail(`When the mouse is pressed at ${mX}, ${mY}, shapes that are not selected should be white.`);
            }
        } else {
            console.log("problem")
        }
    }
    else {
        TestResults.addFail(`When the mouse is pressed at ${mX}, ${mY}, the number of shapes is not as expected. Not running any more tests.`);
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(400, 400);
    // expected shapes
    const actual = getShapes();
    const expected = [];
    for (let x = 0; x < 400; x+=50) {
        expected.push(new TestRectangle(x, 0, 50, height));
    }
    if (actual.length !== expected.length) {
        TestResults.addFail(`Expected ${expected.length} shapes. Found ${actual.length}.`);
    } else {
        if (testShapesMatchWithoutOrder(expected, actual, false)) {
            TestResults.addPass("The rectangles match the expected output.");
            // All rectangles should be white at first
            let allWhite = true;
            for (const s of actual) {
                if (!coloursMatch(s.fillColour, color(255, 255, 255, 255))) {
                    allWhite = false;
                    TestResults.addFail(`Expected the rectangle at ${s.drawMode === CORNER ? s.x + ", " + s.y : s.x + s.w / 2 + ", " + s.y + s.h / 2} to be white when the mouse is not pressed on it.`);
                }
            }
            if (allWhite) {
                TestResults.addPass("All rectangles are white when the mouse is not pressed.");
            }
            checkMousePressed(10, 50);
            checkMousePressed(233, 100);
            checkMousePressed(351, 200);
        } else {
            TestResults.addFail("The rectangles drawn do not match the expected output.");
        }
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
