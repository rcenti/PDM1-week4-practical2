import { CIRCLE, ELLIPSE, TestResults, advanceToFrame, checkBackgroundIsCalledInDraw, checkCanvasSize, getShapes } from "../../lib/test-utils.js";

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

function shapesAreCircular(shapes) {
    for (const s of shapes) {
        if (s.type === ELLIPSE && s.w !== s.h) {
            return false;
        }
        else if (s.type !== CIRCLE) {
            return false;
        }
    }
    return true;
}

function shapesHaveSameY(shapes) {
    const yCoords = new Set(shapes.map(s => s.y));
    return yCoords.size === 1;
}

function checkXDistribution(mX, shapes) {
    const expectedX = [];
    let x = 10;
    while (x < mX) {
        expectedX.push(x);
        x += 20;
    }
    const actualX = shapes.map(s => s.x);
    if (expectedX.length !== actualX.length) {
        TestResults.addFail(`When the mouse is at ${mX}, the x coordinates of the circles should be ${expectedX.join(", ")}. Found ${actualX.join(", ")}.`);
    } else {
        let allMatch = true;
        for (let i in expectedX) {
            if (actualX[i] !== expectedX[i]) {
                TestResults.addFail(`When the mouse is at ${mX}, the x coordinates of the circles should be ${expectedX.join(", ")}. Found ${actualX.join(", ")}.`);
                allMatch = false;
                break;
            }
        }
        if (allMatch) {
            TestResults.addPass(`When the mouse is at ${mX}, the x coordinates of the circles are ${expectedX.join(", ")}.`);
        }
    }

}

function testCirclesAt(mX) {
    mouseX = mX;
    advanceToFrame(frameCount + 1);
    const shapes = getShapes();
    const numShapes = Math.floor(mX / 20);
    if (shapes.length === numShapes) {
        TestResults.addPass(`When the mouse is at ${mX}, there are ${numShapes} shapes.`);
    } else {
        TestResults.addFail(`Expected ${numShapes} circles when the mouse is at ${mX}. Found ${shapes.length}`);
    }
    if (shapes.length > 0) {
        const shapeTypes = new Set(shapes.map(s => s.type));
        if (shapesAreCircular(shapes)) {
            TestResults.addPass(`When the mouse is at ${mX}, all shapes are circles.`);
            if (shapesHaveSameY(shapes)) {
                TestResults.addPass(`When the mouse is at ${mX}, all circles have the same y coordinate.`);
            } else {
                TestResults.addFail(`When the mouse is at ${mX}, all circles should have the same y coordinate but different coordinates were found.`);
            }
            checkXDistribution(mX, shapes);
        }
        else {
            TestResults.addFail(`When the mouse is at ${mX}, all shapes should be circles. The following shapes were found: ${Array.from(shapeTypes).join(", ")}`);
        }
    }
}



async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    checkCanvasSize(400, 400);
    checkBackgroundIsCalledInDraw();
    testCirclesAt(0);
    testCirclesAt(43);
    testCirclesAt(width);
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
