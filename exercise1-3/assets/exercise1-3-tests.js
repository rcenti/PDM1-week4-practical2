import { CIRCLE, ELLIPSE, TestLine, TestResults, advanceToFrame, checkBackgroundIsCalledInDraw, checkCanvasSize, coloursMatch, getShapes, testShapesMatchWithoutOrder } from "../../lib/test-utils.js";

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

function createTestLines() {
    const expectedShapes = [];
    for (let y = 0; y <= height; y += 10) {
        // black
        expectedShapes.push(new TestLine(0, y, width, 0));
        // blue
        expectedShapes.push(new TestLine(width / 2, height / 2, width, y));
        // pink
        expectedShapes.push(new TestLine(0, y, width, height));
    }
    return expectedShapes;
}

function getGroupColours(group) {
    return new Set(group.map(s => `${red(s.strokeColour)}, ${green(s.strokeColour)}, ${blue(s.strokeColour)}`));
}

function checkGroups(actual) {
    const topRight = [];
    const centre = [];
    const bottomRight = [];
    const unknown = [];
    for (const l of actual) {
        if (hasEndAt(l, width, 0) && (l.x1 === 0 || l.x2 === 0)) {
            topRight.push(l);
        } else if (hasEndAt(l, width / 2, height / 2)) {
            centre.push(l);
        } else if (hasEndAt(l, width, height)) {
            bottomRight.push(l);
        } else {
            unknown.push(l);
        }
    }
    if (getGroupColours(topRight).size === 1) {
        TestResults.addPass("All lines with an end in the top right corner are the same colour.");
    } else {
        TestResults.addFail("All lines with an end in the top right corner should be the same colour.");
    }
    if (getGroupColours(centre).size === 1) {
        TestResults.addPass("All lines with an end in the centre are the same colour.");
    } else {
        TestResults.addFail("All lines with an end in the centre should be the same colour.");
    }
    if (getGroupColours(bottomRight).size === 1) {
        TestResults.addPass("All lines with an end in the bottom right corner are the same colour.");
    } else {
        TestResults.addFail("All lines with an end in the bottom right corner should be the same colour.");
    }
}

function hasEndAt(l, x, y) {
    return (l.x1 === x && l.y1 === y) || (l.x2 === x && l.y2 === y);
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(600, 600);
    // expected shapes
    const actual = getShapes();
    const expected = createTestLines();
    if (actual.length !== expected.length) {
        TestResults.addFail(`Expected ${expected.length} shapes. Found ${actual.length}.`);
    } else {
        if (testShapesMatchWithoutOrder(expected, actual, false)) {
            TestResults.addPass("The line coordinates match the expected output.");
        } else {
            TestResults.addFail("The line coordinates do not match the expected output.");
        }
        checkGroups(actual);
    }
    // three colours
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
