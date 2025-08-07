import { CIRCLE, ELLIPSE, TestLine, TestResults, TestSquare, advanceToFrame, checkBackgroundIsCalledInDraw, checkCanvasSize, coloursMatch, getShapes, testShapesMatchWithoutOrder } from "../../lib/test-utils.js";

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



async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(400, 400);
    // expected shapes
    const actual = getShapes();
    const expected = [];
    for (let x = 0; x < 400; x+=50) {
        expected.push(new TestSquare(x, 0, 50));
    }
    if (actual.length !== expected.length) {
        TestResults.addFail(`Expected ${expected.length} shapes. Found ${actual.length}.`);
    } else {
        if (testShapesMatchWithoutOrder(expected, actual, false)) {
            TestResults.addPass("The squares match the expected output.");
        } else {
            TestResults.addFail("The shapes drawn do not match the expected output.");
        }
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
