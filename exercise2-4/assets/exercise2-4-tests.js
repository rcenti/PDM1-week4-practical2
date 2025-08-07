import { TestResults, TestSquare, checkCanvasSize, coloursMatch, getCanvasPixelValues, getImagePixelValues, getShapes, pixelValuesMatch, testShapesMatchWithoutOrder } from "../../lib/test-utils.js";

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

function getHint(shapes) {
    const xCoords = new Set(shapes.map(s => s.x));
    const yCoords = new Set(shapes.map(s => s.y));
    if (xCoords.size === 8 && yCoords.size === 1) {
        return " The output suggests you may only be using a loop for the x coordinates. Put another loop inside the first loop that steps through the y coordinates of a column of squares. Inside that loop draw a square at the x coordinate represented by the outer loop and the y coordinate represented by the inner loop.";
    } else if (xCoords.size === 8 && yCoords.size === 8) {
        return " Are you using the same coordinate for the x and y for each square? Make sure you have two loops. The outer loop should step through the x coordinates of a row of squares and the inner loop should step through the y coordinates of a column of squares. Inside the inner loop, draw a square at the x coordinate represented by the outer loop and the y coordinate represented by the inner loop."
    } else if (xCoords.size === 1 && yCoords.size === 8) {
        return " The output suggests you may only be using a loop for the y coordinates. Make sure you have two loops. The outer loop should step through the x coordinates of a row of squares and the inner loop should step through the y coordinates of a column of squares. Inside the inner loop, draw a square at the x coordinate represented by the outer loop and the y coordinate represented by the inner loop.";
    }
    return "";
}

function colourToString(col) {
    return red(col) + "," + green(col) + "," + blue(col);
}

function checkColours(shapes) {
    const allColours = new Set(shapes.map(s => colourToString(s.fillColour)));
    if (allColours.size !== 2) {
        TestResults.addFail(`Expected two different fill colours to be used. Found ${allColours.size}.`);
    } else {
        const blackSquares = shapes.filter(s => s.x % 100 === s.y % 100);
        const whiteSquares = shapes.filter(s => s.x % 100 !== s.y % 100);
        const blackSquareColours = new Set(blackSquares.map(s => colourToString(s.fillColour)));
        const whiteSquareColours = new Set(whiteSquares.map(s => colourToString(s.fillColour)));
        if (blackSquareColours.size === 1 && whiteSquareColours.size === 1 && !coloursMatch(Array.from(blackSquares.values())[0].fillColour, Array.from(whiteSquares.values())[0].fillColour)) {
            TestResults.addPass("Two colours are used in a checkerboard pattern.");
        } else {
            TestResults.addFail("Two colours are used but not in a checkerboard pattern.");
        }
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    const resultsDiv = document.getElementById("results");
    // check images first
    const canvasPixels = getCanvasPixelValues(canvas);
    const solution1 = await getImagePixelValues("./assets/exercise2-4.png", 800, 800);
    const solution2 = await getImagePixelValues("./assets/exercise2-4-alt.png", 800, 800);
    if (pixelValuesMatch(canvasPixels, solution1) || pixelValuesMatch(canvasPixels, solution2)) {
        TestResults.addPass("Your output matches the expected output. Well done!");
    } else {
        checkCanvasSize(400, 400);
        // expected shapes
        const actual = getShapes();
        const expected = [];
        for (let x = 0; x < 400; x+=50) {
            for (let y = 0; y < 400; y += 50) {
                expected.push(new TestSquare(x, y, 50));
            }
        }
        if (actual.length !== expected.length) {
            TestResults.addFail(`Expected ${expected.length} squares. Found ${actual.length} shapes.${getHint(actual)}`);
        } else {
            if (testShapesMatchWithoutOrder(expected, actual, false)) {
                TestResults.addPass("The positions of the squares match the expected output.");
                // check alternating colours
                checkColours(actual);
            } else {
                TestResults.addFail(`The shapes drawn do not match the expected output.${getHint(actual)}`);
            }
        }
    }

    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
