/**
 * Last modified 5/8/2025 to remove FontAwesome icons
 */

/** CONSTANTS */
// Shape strings
export const SQUARE = "square";
export const RECT = "rect";
export const ELLIPSE = "ellipse";
export const CIRCLE = "circle";
export const LINE = "line";
export const TRIANGLE = "triangle";
export const POINT = "point";
export const TEXT = "text";
export const IMAGE = "image";
// Colours
export const TRANSPARENT = [0, 0, 0, 0];
export const BLACK = 0;
export const WHITE = 255;
// Event types
export const KEYDOWN = "keydown";
export const KEYUP = "keyup";

//#region P5.JS MOCKS
new p5();

// This object tracks the status of the canvas at any given moment
export const canvasStatus = {
    canvasWidth: 0,
    canvasHeight: 0,
    frameCount: 1,
    frameRate: 60,
    backgroundColour: color(0, 0, 0, 0),
    fillColour: color(255),
    strokeColour: color(0),
    strokeWeight: 1,
    rectMode: CORNER,
    ellipseMode: CENTER,
    imageMode: CORNER,
    hasStroke: true,
    hasFill: true,
    textSize: -1,
    textAlign: {
        horizontal: LEFT,
        vertical: TOP
    },
    fonts: [],
    shapes: [],
    imageObjects: [],
    errors: [],
    preloadContents: "",
    addShape: function (type, ...args) {
        switch(type) {
            case SQUARE:
                if (args.length !== 3) {
                    this.errors.push(`<code>square()</code> was called with ${args.length} arguments (${args.join(", ")}). Expected 3 arguments.`);
                }
                const sqX = args.length > 0 ? args[0] : 0;
                const sqY = args.length > 1 ? args[1] : 0;
                const sqW = args.length > 2 ? args[2] : 0;
                this.shapes.push(new TestSquare(sqX, sqY, sqW, this.rectMode, this.hasStroke, this.hasFill, this.fillColour, this.strokeColour));
                break;
            case RECT:
                if (args.length !== 4) {
                    this.errors.push(`<code>rect()</code> was called with ${args.length} arguments (${args.join(", ")}). Expected 4 arguments.`);
                }
                const rX = args.length > 0 ? args[0] : 0;
                const rY = args.length > 1 ? args[1] : 0;
                const rW = args.length > 2 ? args[2] : 0;
                const rH = args.length > 3 ? args[3] : 0;
                this.shapes.push(new TestRectangle(rX, rY, rW, rH, this.rectMode, this.hasStroke, this.hasFill, this.fillColour, this.strokeColour, this.strokeWeight));
                break;
            case ELLIPSE:
                if (args.length !== 4) {
                    this.errors.push(`<code>ellipse()</code> was called with ${args.length} arguments (${args.join(", ")}). Expected 4 arguments.`);
                }
                const eX = args.length > 0 ? args[0] : 0;
                const eY = args.length > 1 ? args[1] : 0;
                const eW = args.length > 2 ? args[2] : 0;
                const eH = args.length > 3 ? args[3] : 0;
                this.shapes.push(new TestEllipse(eX, eY, eW, eH, this.ellipseMode, this.hasStroke, this.hasFill, this.fillColour, this.strokeColour, this.strokeWeight));
                break;
            case CIRCLE:
                if (args.length !== 3) {
                    this.errors.push(`<code>circle()</code> was called with ${args.length} arguments (${args.join(", ")}). Expected 3 arguments.`);
                }
                const cX = args.length > 0 ? args[0] : 0;
                const cY = args.length > 1 ? args[1] : 0;
                const cW = args.length > 2 ? args[2] : 0;
                this.shapes.push(new TestCircle(cX, cY, cW, this.ellipseMode, this.hasStroke, this.hasFill, this.fillColour, this.strokeColour, this.strokeWeight));
                break;
            case LINE:
                if (args.length !== 4) {
                    this.errors.push(`<code>line()</code> was called with ${args.length} arguments (${args.join(", ")}). Expected 4 arguments.`);
                }
                const lX1 = args.length > 0 ? args[0] : 0;
                const lY1 = args.length > 1 ? args[1] : 0;
                const lX2 = args.length > 2 ? args[2] : 0;
                const lY2 = args.length > 3 ? args[3] : 0;
                this.shapes.push(new TestLine(lX1, lY1, lX2, lY2, this.strokeColour, this.strokeWeight, this.hasStroke));
                break;
            case TRIANGLE:
                if (args.length !== 6) {
                    this.errors.push(`<code>triangle()</code> was called with ${args.length} arguments (${args.join(", ")}). Expected 6 arguments.`);
                }
                const tX1 = args.length > 0 ? args[0] : 0;
                const tY1 = args.length > 1 ? args[1] : 0;
                const tX2 = args.length > 2 ? args[2] : 0;
                const tY2 = args.length > 3 ? args[3] : 0;
                const tX3 = args.length > 4 ? args[4] : 0;
                const tY3 = args.length > 5 ? args[5] : 0;
                this.shapes.push(new TestTriangle(tX1, tY1, tX2, tY2, tX3, tY3, this.hasStroke, this.hasFill, this.fillColour, this.strokeColour, this.strokeWeight));
                break;
            case POINT:
                if (args.length !== 2) {
                    this.errors.push(`<code>point()</code> was called with ${args.length} arguments (${args.join(", ")}). Expected 2 arguments.`);
                }
                const pX = args.length > 0 ? args[0] : 0;
                const pY = args.length > 1 ? args[1] : 0;
                this.shapes.push(new TestPoint(pX, pY, this.hasStroke, this.strokeColour, this.strokeWeight));
                break;
            case TEXT:
                let tW = -1;
                let tH = -1;
                if (args.length === 5) {
                    tW = args[3];
                    tH = args[4];
                }
                this.shapes.push(new TestText(args[0], args[1], args[2], tW, tH, this.textSize, this.textAlign, this.rectMode, this.hasStroke, this.hasFill, this.fillColour, this.strokeColour, this.strokeWeight));
                break;
            case IMAGE:
                let imgX = 0;
                let imgY = 0;
                let imgW = 0;
                let imgH = 0;
                let origW = 0;
                let origH = 0;
                if (args.length > 0) {
                    origW = args[0].width;
                    origH = args[0].height;
                }
                if (args.length < 3) {
                    this.errors.push(`<code>image()</code> was called with ${args.length} arguments (${args.join(", ")}). Expected at least 3.`)
                }
                else if (args.length === 3) {
                    imgX = args[1];
                    imgY = args[2];
                    imgW = origW;
                    imgH = origH;
                }
                else {
                    imgX = args[1];
                    imgY = args[2];
                    if (args.length > 3) {
                        imgW = args[3];
                    }
                    if (args.length > 4) {
                        imgH = args[4];
                    }
                }
                this.imageObjects.push(args[0]);
                this.shapes.push(new TestImage(imgX, imgY, imgW, imgH, origW, origH, this.imageMode, this.hasStroke, this.hasFill, this.fillColour, this.strokeColour, this.strokeWeight, args[0]));
                break;
            default:
                console.log(type, "not implemented!");
        }
    },
    randomCalls: [],
    addRandom: function (returnVal, ...args) {
        const minVal = args.length !== 2 ? 0 : args[0];
        const maxVal = args.length === 1 ? args[0] : args.length === 2 ? args[1] : -1;
        this.randomCalls.push({ minVal, maxVal, returnVal});
    }
}

// Function wrapping approach adapted from https://trackjs.com/blog/how-to-wrap-javascript-functions/

//#region preload()
const p5_preload = preload;
window.preload = function preload() {
    try {
        noLoop(); // If the overridden function is called, it means preload has been implemented by the student
        canvasStatus.preloadContents = getFunctionContents(p5_preload);
        const returnValue = p5_preload.apply(this);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_preload) {
    if (p5_preload.hasOwnProperty(prop)) {
        window.preload[prop] = p5_preload[prop];
    }
}
//#endregion preload()

//#region createCanvas()
const p5_createCanvas = createCanvas;
window.createCanvas = function createCanvas(...args) {
    console.log("createCanvas", args);
    try {
        const returnValue = p5_createCanvas.apply(this, args);
        canvasStatus.canvasWidth = args[0];
        canvasStatus.canvasHeight = args[1];
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_createCanvas) {
    if (p5_createCanvas.hasOwnProperty(prop)) {
        window.createCanvas[prop] = p5_createCanvas[prop];
    }
}
//#endregion createCanvas()

//#region frameRate()
const p5_frameRate = frameRate;
window.frameRate = function frameRate(...args) {
    console.log("frameRate", args);
    try {
        const returnValue = p5_frameRate.apply(this, args);
        canvasStatus.frameRate = args.length > 0 ? args[0] : 60;
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_frameRate) {
    if (p5_frameRate.hasOwnProperty(prop)) {
        window.frameRate[prop] = p5_frameRate[prop];
    }
}
//#endregion frameRate()

//#region background()
const p5_background = background;
window.background = function background(...args) {
    console.log("background", args);
    try {
        const returnValue = p5_background.apply(this, args);
        canvasStatus.backgroundColour = color(...args);
        canvasStatus.shapes = [];
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_background) {
    if (p5_background.hasOwnProperty(prop)) {
        window.background[prop] = p5_background[prop];
    }
}
//#endregion background()

//#region rectMode() 
const p5_rectMode = rectMode;
window.rectMode = function rectMode(...args) {
    console.log("rectMode", ...args);
    try {
        const returnValue = p5_rectMode.apply(this, args);
        canvasStatus.rectMode = args[0];
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_rectMode) {
    if (p5_rectMode.hasOwnProperty(prop)) {
        window.rectMode[prop] = p5_rectMode[prop];
    }
}
//#endregion rectMode()

//#region ellipseMode()
const p5_ellipseMode = ellipseMode;
window.ellipseMode = function ellipseMode(...args) {
    console.log("ellipseMode", ...args);
    try {
        const returnValue = p5_ellipseMode.apply(this, args);
        canvasStatus.ellipseMode = args[0];
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_ellipseMode) {
    if (p5_ellipseMode.hasOwnProperty(prop)) {
        window.ellipseMode[prop] = p5_ellipseMode[prop];
    }
}
//#endregion ellipseMode()

//#region imageMode() 
const p5_imageMode = imageMode;
window.imageMode = function imageMode(...args) {
    console.log("imageMode", ...args);
    try {
        const returnValue = p5_imageMode.apply(this, args);
        canvasStatus.imageMode = args[0];
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_imageMode) {
    if (p5_imageMode.hasOwnProperty(prop)) {
        window.imageMode[prop] = p5_imageMode[prop];
    }
}
//#endregion imageMode()

//#region noStroke()
const p5_noStroke = noStroke;
window.noStroke = function noStroke() {
    console.log("noStroke");
    try {
        const returnValue = p5_noStroke.apply(this);
        canvasStatus.hasStroke = false;
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_noStroke) {
    if (p5_noStroke.hasOwnProperty(prop)) {
        window.noStroke[prop] = p5_noStroke[prop];
    }
}
//#endregion noStroke()

//#region noFill() 
const p5_noFill = noFill;
window.noFill = function noFill() {
    console.log("noFill");
    try {
        const returnValue = p5_noFill.apply(this);
        canvasStatus.hasFill = false;
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_noFill) {
    if (p5_noFill.hasOwnProperty(prop)) {
        window.noFill[prop] = p5_noFill[prop];
    }
}
//#endregion noFill()

//#region stroke() 
const p5_stroke = stroke;
window.stroke = function stroke(...args) {
    console.log("stroke", ...args);
    try {
        const returnValue = p5_stroke.apply(this, args);
        canvasStatus.hasStroke = true;
        canvasStatus.strokeColour = color(...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_stroke) {
    if (p5_stroke.hasOwnProperty(prop)) {
        window.stroke[prop] = p5_stroke[prop];
    }
}
//#endregion stroke()

//#region fill()
const p5_fill = fill;
window.fill = function fill(...args) {
    console.log("fill", ...args);
    try {
        const returnValue = p5_fill.apply(this, args);
        canvasStatus.hasFill = true;
        canvasStatus.fillColour = color(...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_fill) {
    if (p5_fill.hasOwnProperty(prop)) {
        window.fill[prop] = p5_fill[prop];
    }
}
//#endregion fill()

//#region strokeWeight
const p5_strokeWeight = strokeWeight;
window.strokeWeight = function strokeWeight(...args) {
    console.log("strokeWeight", ...args);
    try {
        const returnValue = p5_strokeWeight.apply(this, args);
        canvasStatus.strokeWeight = args[0];
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_strokeWeight) {
    if (p5_strokeWeight.hasOwnProperty(prop)) {
        window.strokeWeight[prop] = p5_strokeWeight[prop];
    }
}
//#endregion strokeWeight()

//#region textSize()
const p5_textSize = textSize;
window.textSize = function textSize(...args) {
    console.log("textSize", ...args);
    try {
        const returnValue = p5_textSize.apply(this, args);
        canvasStatus.textSize = args[0];
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_textSize) {
    if (p5_textSize.hasOwnProperty(prop)) {
        window.textSize[prop] = p5_textSize[prop];
    }
}
//#endregion textSize()

//#region textAlign()
const p5_textAlign = textAlign;
window.textAlign = function textAlign(...args) {
    console.log("textAlign", ...args);
    try {
        const returnValue = p5_textAlign.apply(this, args);
        canvasStatus.textAlign.horizontal = args[0];
        canvasStatus.textAlign.vertical = args.length > 1 ? args[1] : canvasStatus.textAlign.vertical;
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_textAlign) {
    if (p5_textAlign.hasOwnProperty(prop)) {
        window.textAlign[prop] = p5_textAlign[prop];
    }
}
//#endregion textAlign()

//#region loadFont()
const p5_loadFont = loadFont;
window.loadFont = function loadFont(...args) {
    try {
        const returnValue = p5_loadFont.apply(this, args);
        canvasStatus.fonts.push(returnValue);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_loadFont) {
    if (p5_loadFont.hasOwnProperty(prop)) {
        window.textAlign[prop] = p5_loadFont[prop];
    }
}
//#endregion loadFont()

//#region random()
const p5_random = random;
window.random = function random(...args) {
    console.log("random", args);
    try {
        const returnValue = p5_random.apply(this, args);
        canvasStatus.addRandom(returnValue, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_random) {
    if (p5_random.hasOwnProperty(prop)) {
        window.random[prop] = p5_random[prop];
    }
}
//#endregion random()

//#region square()
const p5_square = square;
window.square = function square(...args) {
    try {
        const returnValue = p5_square.apply(this, args); 
        canvasStatus.addShape(SQUARE, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for(const prop in p5_square) {
    if (p5_square.hasOwnProperty(prop)) {
        window.square[prop] = p5_square[prop];
    }
}
//#endregion square()

//#region rect() 
const p5_rect = rect;
window.rect = function rect(...args) {
    try {
        const returnValue = p5_rect.apply(this, args);
        canvasStatus.addShape(RECT, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_rect) {
    if (p5_rect.hasOwnProperty(prop)) {
        window.rect[prop] = p5_rect[prop];
    }
}
//#endregion rect()

//#region ellipse()
const p5_ellipse = ellipse;
window.ellipse = function ellipse(...args) {
    try {
        const returnValue = p5_ellipse.apply(this, args);
        canvasStatus.addShape(ELLIPSE, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_ellipse) {
    if (p5_ellipse.hasOwnProperty(prop)) {
        window.ellipse[prop] = p5_ellipse[prop];
    }
}
//#endregion ellipse()

//#region circle() 
const p5_circle = circle;
window.circle = function circle(...args) {
    try {
        const returnValue = p5_circle.apply(this, args);
        canvasStatus.addShape(CIRCLE, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_circle) {
    if (p5_circle.hasOwnProperty(prop)) {
        window.circle[prop] = p5_circle[prop];
    }
}
//#endregion circle()

//#region line() 
const p5_line = line;
window.line = function line(...args) {
    try {
        const returnValue = p5_line.apply(this, args);
        canvasStatus.addShape(LINE, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_line) {
    if (p5_line.hasOwnProperty(prop)) {
        window.line[prop] = p5_circle[prop];
    }
}
//#endregion line()

//#region triangle()
const p5_triangle = triangle;
window.triangle = function triangle(...args) {
    try {
        const returnValue = p5_triangle.apply(this, args);
        canvasStatus.addShape(TRIANGLE, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_triangle) {
    if (p5_triangle.hasOwnProperty(prop)) {
        window.triangle[prop] = p5_triangle[prop];
    }
}
//#endregion triangle()

//#region point()
const p5_point = point;
window.point = function point(...args) {
    try {
        const returnValue = p5_point.apply(this, args);
        canvasStatus.addShape(POINT, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_point) {
    if (p5_point.hasOwnProperty(prop)) {
        window.point[prop] = p5_point[prop];
    }
}
//#endregion point()

//#region text()
const p5_text = text;
window.text = function text(...args) {
    try {
        const returnValue = p5_text.apply(this, args);
        canvasStatus.addShape(TEXT, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_text) {
    if (p5_text.hasOwnProperty(prop)) {
        window.text[prop] = p5_text[prop];
    }
}
//#endregion text()

//#region image()
const p5_image = image;
window.image = function image(...args) {
    try {
        const returnValue = p5_image.apply(this, args);
        canvasStatus.addShape(IMAGE, ...args);
        return returnValue;
    }
    catch (e) { throw e; }
}
for (const prop in p5_image) {
    if (p5_image.hasOwnProperty(prop)) {
        window.image[prop] = p5_image[prop];
    }
}
//#endregion image()

//#endregion P5.JS MOCKS

//#region MOCK SHAPES
/**
 * How shapes are processed:
 * The code in the draw function is evaluated line by line and settings for stroke, fill, rectMode
 * and ellipseMode are stored.
 * When a shape function is encountered, the shape is created with the previously stored settings
 * for stroke, fill and position. To make comparison easier, the coordinates for all rectangles and 
 * squares are converted to CORNER mode and the coordinates for all ellipses and circles are converted
 * to CENTER mode. 
 */
class TestShape {
    drawMode;
    type;
    x;
    y;
    w;
    h;
    hasStroke;
    hasFill;
    strokeColour;
    strokeWeight;
    fillColour;

    constructor(type, x, y, w, h, hasStroke, hasFill, drawMode, fillColour, strokeColour, strokeWeight) {
        this.type = type;
        this.drawMode = drawMode;
        this.hasStroke = hasStroke;
        this.hasFill = hasFill;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fillColour = fillColour;
        this.strokeColour = strokeColour;
        this.strokeWeight = strokeWeight;
    }

    isEqualTo(otherShape, ignoreColour = false) {
        if (!(otherShape instanceof TestShape)) return false;
        const positionsMatch = this.x === otherShape.x && this.y === otherShape.y;
        const dimensionsMatch = this.w === otherShape.w && this.h === otherShape.h;
        if (!positionsMatch || !dimensionsMatch) return false;
        if (ignoreColour) return true;
        const strokeMatch = this.hasStroke ?
                                otherShape.hasStroke && coloursMatch(this.strokeColour, otherShape.strokeColour) && this.strokeWeight === otherShape.strokeWeight
                                : otherShape.hasStroke === this.hasStroke;
        const fillMatch = this.hasFill ?
                        otherShape.hasFill && coloursMatch(this.fillColour, otherShape.fillColour)
                        : otherShape.hasFill === this.hasFill;
        return strokeMatch && fillMatch;
    }
}

export class TestTriangle extends TestShape {
    x1;
    y1;
    x2;
    y2;
    x3;
    y3;

    constructor(x1, y1, x2, y2, x3, y3, hasStroke = true, hasFill = true, fillColour = color(255), strokeColour = color(0), strokeWeight = 1) {
        super(TRIANGLE, x1, y1, x2, y2, hasStroke, hasFill, "", fillColour, strokeColour, strokeWeight);
        // Sort coordinates ascending by x then y
        this.#putCoordsInOrder(x1, y1, x2, y2, x3, y3);
    }

    #putCoordsInOrder(x1, y1, x2, y2, x3, y3) {
        const coords = [{x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}];
        coords.sort((a, b) => {
            if (a.x < b.x) return -1;
            else if (a.x > b.x) return 1;
            else {
                if (a.y < b.y) return -1;
                else if (a.y > b.y) return 1;
                return 0;
            }
        });
        this.x1 = coords[0].x;
        this.y1 = coords[0].y;
        this.x2 = coords[1].x;
        this.y2 = coords[1].y;
        this.x3 = coords[2].x;
        this.y3 = coords[2].y;
    }

    isEqualTo(otherShape, ignoreColour = false) {
        if (!(otherShape instanceof TestTriangle)) return false;
        const positionsMatch = this.x1 === otherShape.x1 && this.y1 === otherShape.y1
                                && this.x2 === otherShape.x2 && this.y2 === otherShape.y2
                                && this.x3 === otherShape.x3 && this.y3 === otherShape.y3;
        if (!positionsMatch) return false;
        if (ignoreColour) return true;
        const strokeMatch = this.hasStroke ?
                                otherShape.hasStroke && coloursMatch(this.strokeColour, otherShape.strokeColour) && this.strokeWeight === otherShape.strokeWeight
                                : otherShape.hasStroke === this.hasStroke;
        const fillMatch = this.hasFill ?
                        otherShape.hasFill && coloursMatch(this.fillColour, otherShape.fillColour)
                        : otherShape.hasFill === this.hasFill;
        return strokeMatch && fillMatch;
    }
}

export class TestLine extends TestShape {
    x1;
    y1;
    x2;
    y2;
    constructor(x1, y1, x2, y2, strokeColour = color(0), strokeWeight = 1, hasStroke = true) {
        // Order so smallest coordinates are x1, y1
        let tempX, tempY;
        if (x2 < x1 || (x1 === x2 && y2 < y1)) {
            tempX = x1;
            tempY = y1;
            x1 = x2;
            y1 = y2;
            x2 = tempX;
            y2 = tempY;
        }
        super(LINE, x1, y1, x2, y2, hasStroke, false, "", color(255), strokeColour, strokeWeight);
        this.x1 = this.x;
        this.y1 = this.y;
        this.x2 = this.w;
        this.y2 = this.h;
    }

    isEqualTo(otherShape, ignoreColour = false) {
        if (!(otherShape instanceof TestLine)) return false;
        const pointsMatch = (this.x === otherShape.x && this.y === otherShape.y && this.w === otherShape.w && this.h === otherShape.h)
                            || (this.x === otherShape.w && this.y === otherShape.h && this.w === otherShape.x && this.h === otherShape.y);
        if (pointsMatch) {
            if (ignoreColour) return true;
            if (this.hasStroke && otherShape.hasStroke) {
                return this.strokeWeight === otherShape.strokeWeight && coloursMatch(this.strokeColour, otherShape.strokeColour);
            }
        }
        return false;
    }
}

export class TestEllipse extends TestShape {
    constructor(x, y, w, h = w, drawMode = CENTER, hasStroke = true, hasFill = true, fillColour = color(255), strokeColour = color(0), strokeWeight = 1) {
        super(ELLIPSE, x, y, w, h, hasStroke, hasFill, drawMode, fillColour, strokeColour, strokeWeight);
        this.#checkDimensions(drawMode);
    }

    #checkDimensions(drawMode) {
        // If not center, convert coords to center mode
        switch (drawMode) {
            case CORNER: 
                this.x = this.x + this.w / 2;
                this.y = this.y + this.h / 2;
                break;
            case CORNERS:
                this.w = this.w - this.x;
                this.h = this.h - this.y;
                break;
            case RADIUS:
                this.w *= 2;
                this.h *= 2;
            default:
                break;
        }
    }

    isEqualTo(otherShape, ignoreColour = false) {
        return super.isEqualTo(otherShape, ignoreColour) && (otherShape.type === ELLIPSE || otherShape.type === CIRCLE);
    }
}

export class TestCircle extends TestEllipse {
    constructor(x, y, w, drawMode = CENTER, hasStroke = true, hasFill = true, fillColour = color(255), strokeColour = color(0), strokeWeight = 1) {
        super(x, y, w, w, drawMode, hasStroke, hasFill, fillColour, strokeColour, strokeWeight);
        this.type = CIRCLE;
    }
}

export class TestPoint extends TestShape {
    constructor(x, y, hasStroke = true, strokeColour = color(0), strokeWeight = 1) {
        super(POINT, x, y, strokeWeight, strokeWeight, hasStroke, false, "", undefined, strokeColour, strokeWeight);
    }

    isEqualTo(otherShape, ignoreColour = false) {
        return otherShape.type === POINT && otherShape.x === this.x && otherShape.y === this.y 
                && otherShape.strokeWeight === this.strokeWeight && (ignoreColour || (!ignoreColour && otherShape.strokeColour === this.strokeColour));
    }
}

export class TestRectangle extends TestShape {
    constructor(x, y, w, h = w, drawMode = CORNER, hasStroke = true, hasFill = true, fillColour = color(255), strokeColour = color(0), strokeWeight = 1) {
        super(RECT, x, y, w, h, hasStroke, hasFill, drawMode, fillColour, strokeColour, strokeWeight);
        this.#checkDimensions(drawMode);
    }

    #checkDimensions(drawMode) {
        // If not corner, convert coords to corner mode
        switch (drawMode) {
            case CENTER: 
                this.x = this.x - this.w / 2;
                this.y = this.y - this.h / 2;
                break;
            case CORNERS:
                this.w = this.w - this.x;
                this.h = this.h - this.y;
                break;
            case RADIUS:
                this.x = this.x - this.w;
                this.y = this.y - this.h;
                this.w *= 2;
                this.h *= 2;
            default:
                break;
        }
    }

    isEqualTo(otherShape, ignoreColour = false) {
        return super.isEqualTo(otherShape, ignoreColour) && (otherShape.type === "rect" || otherShape.type === "square");
    }
}

export class TestSquare extends TestRectangle {
    constructor(x, y, w, drawMode = "CORNER", hasStroke = true, hasFill = true, fillColour = color(255), strokeColour = color(0), strokeWeight = 1) {
        super(x, y, w, w, drawMode, hasStroke, hasFill, fillColour, strokeColour, strokeWeight);
        this.type = "square";
    }
}

export class TestText extends TestShape {
    msg;
    textSize;
    textAlign;

    constructor(msg, x, y, w = -1, h = -1, textSize = -1, textAlign = { horizontal: LEFT, vertical: TOP}, drawMode = "CORNER", hasStroke = false, hasFill = true, fillColour = color(0), strokeColor = color(0), strokeWeight = 1) {
        super(TEXT, x, y, w, h, hasStroke, hasFill, drawMode, fillColour, strokeColor, strokeWeight);
        this.msg = msg;
        this.textSize = textSize;
        this.textAlign = textAlign;
        this.#checkDimensions(drawMode);
    }

    #checkDimensions(drawMode) {
        // If not corner, convert coords to corner mode
        switch (drawMode) {
            case CENTER: 
                this.x = this.x - this.w / 2;
                this.y = this.y - this.h / 2;
                break;
            case CORNERS:
                this.w = this.w - this.x;
                this.h = this.h - this.y;
                break;
            case RADIUS:
                this.x = this.x - this.w;
                this.y = this.y - this.h;
                this.w *= 2;
                this.h *= 2;
            default:
                break;
        }
    }

    isEqualTo(otherShape, ignoreColour = false) {
        return super.isEqualTo(otherShape, ignoreColour) && this.msg === otherShape.msg;
    }
}

export class TestImage extends TestShape {
    origW;
    origH;
    img;
    constructor(x, y, w, h, origW, origH, drawMode = CORNER, hasStroke = true, hasFill = true, fillColour = color(255), strokeColour = color(0), strokeWeight = 1, img = undefined) {
        super(IMAGE, x, y, w, h, hasStroke, hasFill, drawMode, fillColour, strokeColour, strokeWeight);
        this.origW = origW;
        this.origH = origH;
        this.img = img;
        this.#checkDimensions(drawMode);
    }

    #checkDimensions(drawMode) {
        // If not corner, convert coords to corner mode
        switch (drawMode) {
            case CENTER: 
                this.x = this.x - this.w / 2;
                this.y = this.y - this.h / 2;
                break;
            case CORNERS:
                this.w = this.w - this.x;
                this.h = this.h - this.y;
                break;
            default:
                break;
        }
    }

    isEqualTo(otherShape, ignoreColour = true) {
        return super.isEqualTo(otherShape, true);
    }
}

export class TestResults {

    static passed = [];
    static failed = [];
    static warnings = [];

    constructor() {}


    static #createTestOutput(iconName, message) {
        const element = document.createElement("p");
        element.classList.add("test-result");
        // element.innerHTML = `<i class="fa-solid ${iconName}"></i> ${message}`;
        element.innerHTML = `${iconName} ${message}`;
        return element;
    }

    static #clearResultOutput(div) {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }

    static #createResultSection(div, results, heading, icon) {
        if (results.length > 0) {
            const h3 = document.createElement("h3");
            h3.innerText = heading;
            div.appendChild(h3);
            for (const result of results) {
                div.appendChild(this.#createTestOutput(icon, result));
            }
        }
    }

    static display(div) {
        this.#clearResultOutput(div);
        this.#createResultSection(div, this.passed, "Checks passed:", "&#x2713;"); // fa-check
        this.#createResultSection(div, this.failed, "Checks failed:", "&#215;"); // fa-xmark
        this.#createResultSection(div, this.warnings, "Warnings:", "&#x26A0;"); // fa-triangle-exclamation
    }

    static addPass(message) {
        this.passed.push(message);
    }

    static addFail(message) {
        this.failed.push(message);
    }

    static addWarning(message) {
        this.warnings.push(message);
    }
}
//#endregion MOCK SHAPES

//#region GENERAL PURPOSE FUNCTIONS

/**
 * Simulates a p5.js keyboard event function by setting the values of key and keyCode 
 * and calling the event function
 * @param {Function} eventFunc The p5.js event function to call
 * @param {string} keyVal The value of the key
 * @param {number} code The keyCode
 */
export function simulateKeyboardEvent(eventFunc, keyVal = "", code = 0) {
    key = keyVal;
    keyCode = keyVal.length > 0 ? keyVal.charCodeAt(0) : code;
    eventFunc();
}

/**
 * Runs all mouse event functions that have been implemented and would 
 * run on mouse click.
 * @returns {boolean} True if at least one mouse event function (mousePressed, mouseReleased, or mouseClicked) has been implemented, false otherwise.
 */
export function runMouseClick() {
    let mouseEventImplemented = false;
    if (window.hasOwnProperty("mousePressed")) {
        mouseEventImplemented = true;
        mousePressed();
    }
    if (window.hasOwnProperty("mouseReleased")) {
        mouseEventImplemented = true;
        mouseReleased();
    }
    if (window.hasOwnProperty("mouseClicked")) {
        mouseEventImplemented = true;
        mouseClicked();
    }
    return mouseEventImplemented;
}

/**
 * Calls redraw repeatedly to reach the specified frame number.
 * @param {number} frameNumber 
 */
export function advanceToFrame(frameNumber) {
    for (let i = frameCount; i < frameNumber; i++) {
        canvasStatus.randomCalls = [];
        canvasStatus.errors = [];
        canvasStatus.imageObjects = [];
        redraw();
    }
}

/**
 * Gets the 1d pixel array of a canvas.
 * IMPORTANT: The width and height of a p5js canvas are double the width and height passed
 * to createCanvas() 
 * @param {HTMLCanvasElement} canvasElement The canvas HTML element
 * @returns {number[]}
 */
export function getCanvasPixelValues(canvasElement) {
    const ctx = canvasElement.getContext("2d");
    const data = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height).data;
    return Array.from(data);
}

/**
 * Gets the 1d pixel array of an image. Asynchronous.
 * @param {string} imgSrc The image URL
 * @param {number} imgWidth The width of the image in pixels
 * @param {number} imgHeight The height of the image in pixels
 * @returns {Promise} A Promise containing the 1d pixel array
 */
export async function getImagePixelValues(imgSrc, imgWidth, imgHeight) {
    const image = new Image();
    image.src = imgSrc;
    await image.decode();
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = imgWidth;
    tempCanvas.height = imgHeight;
    const ctx = tempCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(0, 0, imgWidth, imgHeight).data;
    return Array.from(data);
}

/**
 * Checks if two pixel arrays contain the same values. Use to compare snapshots
 * of the canvas.
 * @param {number[]} pixelArr1 The pixel data from one snapshot of the canvas
 * @param {number[]} pixelArr2 The pixel data from another snapshot of the canvas
 * @returns {boolean}
 */
export function pixelValuesMatch(pixelArr1, pixelArr2) {
    if (pixelArr1.length !== pixelArr2.length) {
        return false;
    }
    for (let i = 0; i < pixelArr1.length; i++) {
        if (pixelArr1[i] !== pixelArr2[i]) return false;
    }
    return true;
}


/**
 * Gets the content of a function (e.g. setup()) as an array of strings. The function contents
 * are split by line breaks and comments are removed.
 * IMPORTANT NOTE: Assumes the function body is surrounded by {}. This means that the contents 
 * of one-line arrow functions will not be returned if they use the shorthand syntax.
 * @param {Function} func The function of interest
 * @returns {string[]} The code in the body of the function, as an array of strings.
 * @throws Throws an error if the function is undefined or not a function.
 */
export function getFunctionContents(func) {
    if (func === undefined || typeof func !== "function") {
        throw new Error("The specified function is undefined or not a function!");
    }
    const funcString = func.toString();
    const openBraceIndex = funcString.indexOf("{");
    const closeBraceIndex = funcString.lastIndexOf("}");
    if (openBraceIndex === -1 || closeBraceIndex === -1 || closeBraceIndex < openBraceIndex) {
        throw new Error("The function string is not properly formed."); // Shouldn't ever happen?
    }
    const lines = funcString.slice(openBraceIndex + 1, closeBraceIndex).split("\n");
    const linesWithoutComments = removeComments(lines);
    return linesWithoutComments;
}


/**
 * Helper function that removes comments in an array containing lines of code in string form.
 * @param {string[]} funcLines 
 * @return {string[]}
 */
function removeComments(funcLines) {
    let multiLineInProgress = false;
    for (let i in funcLines) {
        const indexOfLineComment = funcLines[i].indexOf("//");
        const indexOfOpenMultilineComment = funcLines[i].indexOf("/*");
        const indexOfCloseMultilineComment = funcLines[i].indexOf("*/");
        if (multiLineInProgress) {
            if (indexOfCloseMultilineComment >= 0) {
                // remove the end of the comment, check the line again
                funcLines[i] = funcLines[i].substring(indexOfCloseMultilineComment + 2);
                multiLineInProgress = false;
                i--;
            } else {
                funcLines[i] = "";
            }
        } 
        else {
            // Line comment is first /only on line - remove rest of line
            if (indexOfLineComment >= 0 && (indexOfLineComment < indexOfOpenMultilineComment || indexOfOpenMultilineComment === -1)) {
                funcLines[i] = funcLines[i].substring(0, indexOfLineComment);
            }
            // Start of multiline comment is first / only on line.
            else if (indexOfOpenMultilineComment >= 0 && (indexOfOpenMultilineComment < indexOfLineComment || indexOfLineComment === -1)) {
                if (indexOfCloseMultilineComment >= 0) {
                    const toRemove = funcLines[i].substring(indexOfOpenMultilineComment, indexOfCloseMultilineComment + 2);
                    funcLines[i] = funcLines[i].replace(toRemove, "");
                    i--; // check the remaining string again
                } else {
                    funcLines[i] = funcLines[i].substring(0, indexOfOpenMultilineComment);
                    multiLineInProgress = true;
                }
            }
        }
    }
    return funcLines;
}

/**
 * Attempts to create a p5js color object from the an argument string extracted from the student's code.
 * IMPORTANT: This will only work for valid literal values (e.g. hex codes, RGBA numbers), not function
 * calls or local variables. If the arguments contain calls to the p5js random function, random numbers 
 * will be generated. 
 * @param {string} argString The arguments the student passed to a p5js color function as a string. E.g.
 * If the student wrote background(200, 0, 75), argString would be "200, 0, 75".
 * @returns {Color}
 */
export function convertArgStringToColor(argString) {
    // Catch ReferenceError to handle cases where a variable is in the arg string
    return eval(`color(${argString})`);
}

/**
 * Checks if two p5js color object have equal r, g, b, and a values.
 * @param {Color} col1 
 * @param {Color} col2 
 * @returns {boolean}
 */
export function coloursMatch(col1, col2) {
    return red(col1) === red(col2) && green(col1) === green(col2) && blue(col1) === blue(col2) && alpha(col1) === alpha(col2);
}
//#endregion GENERAL PURPOSE FUNCTIONS
/**
 * The following regular expressions search for common p5js functions. In each match,
 * index 0 is the complete text of the match, index 1 is the argument string (a single 
 * string containing all text between the parentheses of the function call. 
 */
export const CREATE_CANVAS = /createCanvas\(/g; // /createCanvas\(([^)]*)\)/g;
export const BACKGROUND = /background\(/g; // /background\(([^)]*)\)/g;
export const STROKE = /stroke\(/g; // /stroke\(([^)]*)\)/g;
export const STROKE_WEIGHT = /strokeWeight\(/g; // /strokeWeight\(([^)]*)\)/g;
export const NO_STROKE = /noStroke\(/g; // /noStroke\(([^)]*)\)/g;
export const FILL = /fill\(/g; // /fill\(([^)]*)\)/g;
export const NO_FILL = /noFill\(/g; // /noFill\(([^)]*)\)/g;
export const CIRCLE_RE = /circle\(/g; // /circle\(([^)]*)\)/g;
export const ELLIPSE_RE = /ellipse\(/g; // /ellipse\(([^)]*)\)/g;
export const SQUARE_RE = /square\(/g; // /square\(([^)]*)\)/g;
export const RECT_RE = /rect\(/g; // /rect\(([^)]*)\)/g;
export const LINE_RE = /line\(/g; // /line\(([^)]*)\)/g;
export const TRIANGLE_RE = /triangle\(/g;
export const RECT_MODE = /rectMode\(/g; // /rectMode\(([^)]*)\)/g;
export const ELLIPSE_MODE = /ellipseMode\(/g; // /ellipseMode\(([^)]*)\)/g;
export const ANY_SHAPE = /circle\(|ellipse\(|square\(|rect\(|line\(|triangle\(/g;
export const RANDOM_RE = /random\(/g;
export const LOAD_FONT = /loadFont\(/g;
export const LOAD_IMAGE = /loadImage\(/g;
export const LOAD_SOUND = /loadSound\(/g;


/**
 * GENERIC TESTS THAT MIGHT BE USEFUL. PLEASE READ THE COMMENTS BEFORE USING EACH FUNCTION.
 * Pure test functions (beginning with "test") return true (passed) or false (failed). Functions 
 * beginning with "check" call the test functions and add pre-defined messages to the test 
 * results.
 */

/**
 * Checks if the draw() function has been implemented. If not, adds an empty draw() function. This is useful 
 * for anything tracked in canvasStatus that is not called from draw() e.g. loadSound().
 * 
 * THIS SHOULD BE A TEMPORARY FIX. The long term fix should have separate tracking for preloaded functionality.
 */
export function substituteDraw() {
    if (!window.hasOwnProperty("draw")) {
        window["draw"] = () => {};
        advanceToFrame(1);
    }
}

/**
 * Tests if the canvas is the expected size. 
 * @param {number} expectedWidth The width that should be passed to createCanvas()
 * @param {number} expectedHeight The height that should be passed to createCanvas()
 * @returns {boolean} True if the canvas is the expected size, false if it is not.
 */
export function testCanvasSize(expectedWidth, expectedHeight) {
    return canvasStatus.canvasWidth === expectedWidth && canvasStatus.canvasHeight === expectedHeight;
}

/**
 * Tests if the canvas is the expected size and updates the TestResults
 * @param {number} expectedWidth The width that should be passed to createCanvas().
 * @param {number} expectedHeight The height that should be passed to createCanvas().
 */
export function checkCanvasSize(expectedWidth, expectedHeight) {
    if (testCanvasSize(expectedWidth, expectedHeight)) {
        TestResults.addPass("Your canvas is the expected size.");
    }
    else {
        TestResults.addFail(`The canvas should be ${expectedWidth} by ${expectedHeight}. Your canvas is ${canvasStatus.canvasWidth} by ${canvasStatus.canvasHeight}. Check that you have called <code>createCanvas()</code> inside the <code>setup</code> function, and that you have passed it two numbers—one number for the width, and one number for the height.`);
        
    }
}

/**
 * Finds the index of the closing bracket that matches openBracket.
 * @param {string} codeStr The string to search in
 * @param {string} openBracket The open bracket to match
 * @param {number} openIndex The index of openBracket in codeStr
 * @returns {number} The index of the matching closing bracket or -1 if not found
 */
function findClosingBracket(codeStr, openBracket, openIndex) {
    const counts = { "(": 0, "{": 0, "]": 0};
    const openingSymbol = { "}": "{", ")": "(", "]": "["};
    counts[openBracket] = 1;
    for (let i = openIndex + 1; i < codeStr.length; i++) {
        if (codeStr[i] === ")" || codeStr[i] === "}" || codeStr[i] === "]") {
            counts[openingSymbol[codeStr[i]]]--;
            if (counts[openBracket] === 0) return i;
        }
        else if (counts.hasOwnProperty(codeStr[i])) {
            counts[codeStr[i]]++;
        }
    }
    return -1;
}

/**
 * Gets the complete text of a function call.
 * @param {string} codeStr The full string that the matching text was found in.
 * @param {object} match A single match object from the iterator returned by the string matchAll function.
 * @returns {string} The complete text of the function call
 */
function getCompleteFunctionCall(codeStr, match) {
    const openIndex = match.index + match[0].length - 1;
    const closeIndex = findClosingBracket(codeStr, codeStr[openIndex], openIndex);
    return codeStr.slice(match.index, closeIndex + 1);
}

/**
 * NOT NEEDED? Gets the text containing just the arguments passed to a function call (the text between parentheses).
 * @param {string} functionCall 
 * @returns {string}
 */
export function getArgString(functionCall) {
    const openIndex = functionCall.indexOf("(");
    return functionCall.slice(openIndex + 1, functionCall.length - 1);
}

export function getLastBackgroundCallBeforeShapes() {
    const setupContents = window.hasOwnProperty("setup") ? getFunctionContents(setup).join("\n") : "";
    const drawContents = window.hasOwnProperty("draw") ? getFunctionContents(draw).join("\n") : "";
    const allContents = setupContents + drawContents;
    const shapes = [...allContents.matchAll(ANY_SHAPE)];
    const backgrounds = [...allContents.matchAll(BACKGROUND)];
    const firstShape = shapes.length > 0 ? shapes[0]: null;
    if (firstShape === null) {
        if (backgrounds.length > 0)
            return getCompleteFunctionCall(allContents, backgrounds[backgrounds.length - 1]);
    }
    else {
        for (let b = backgrounds.length - 1; b >= 0; b--) {
            if (backgrounds[b].index < firstShape.index) {
                return getCompleteFunctionCall(allContents, backgrounds[b]);
            }
        }
    }
    return null;
}

/**
 * Tests that the background colour at the current frame is the expected colour.
 * @param {Color} expectedColour 
 * @returns {boolean} True if the background is the expected colour, false if it is not.
 */
export function testBackgroundIsColour(expectedColour) {
    return coloursMatch(expectedColour, canvasStatus.backgroundColour);
}

/**
 * Checks that the background colour at the current frame is the expected colour.
 * @param {Color} expectedColour A p5js color object representing the expected background colour.
 * @param {string} colourName The text name of the colour to display in the test result message.
 */
export function checkBackground(expectedColour, colourName) {
    if (testBackgroundIsColour(expectedColour)) {
        TestResults.addPass(`Your sketch has the expected background colour.`);
    } else {
        const isTransparent = testBackgroundIsColour(color(...TRANSPARENT));
        TestResults.addFail(`The background colour of the canvas should be ${colourName}. ${isTransparent ? "Make sure that <code>background()</code> is explicitly called, even if the background is white." : "Check the value(s) passed to <code>background()</code>."}`);
    }
}

/**
 * Checks that the background function is called in draw() before any shapes are drawn.
 */
export function checkBackgroundIsCalledInDraw() {
    try {
        const backgroundIsCalledInDraw = testSettingIsCalled(BACKGROUND, false, true);
        const backgroundIsCalledInSetup = testSettingIsCalled(BACKGROUND, true, false);
        if (backgroundIsCalledInDraw) {
            checkSettingCalledBeforeShapes(BACKGROUND, false, true);
        } else if (backgroundIsCalledInSetup) {
            TestResults.addFail("<code>background()</code> should be called in <code>draw()</code>, not <code>setup()</code>. Otherwise, every rectangle drawn will remain visible on screen.");
        } else {
            TestResults.addFail("<code>background()</code> is not set. <code>background()</code> should be called at the start of <code>draw()</code>.");
        }
    } catch (e) {
        TestResults.addFail("Unable to test if the background has been set. This can happen if <code>setup()</code> or <code>draw()</code> is missing.");
    }
}

/**
 * Tests if the stroke is the expected colour.
 * @param {Color} expectedColour The expected stroke colour.
 * @returns {boolean} True if the stroke is the expected colour, false otherwise.
 */
export function testStrokeIsColour(expectedColour) {
    return canvasStatus.hasStroke && coloursMatch(canvasStatus.strokeColour, expectedColour);
}

/**
 * Checks that the stroke colour is set and that it is the expected colour at the end of the 
 * draw function in the current frame.
 * @param {Color} expectedColour A p5js color object representing the expected background colour.
 * @param {string} colourName The text name of the colour to display in the test result message.
 */
export function checkStrokeColour(expectedColour, colourName) {
    if (testStrokeIsColour(expectedColour)) {
        TestResults.addPass(`Your sketch has the expected stroke colour.`);
    } else {
        TestResults.addFail(`The stroke colour should be ${colourName}. Check the value(s) passed to <code>stroke()</code>.`);
    }
}

/**
 * Uses a regular expression to determine if the given setting function has been called in either setup or draw, as appropriate.
 * @param {RegExp} setting The regular expression representing the setting function
 * @param {boolean} allowedInSetup Whether or not to search in setup()
 * @param {boolean} allowedInDraw Whether or not to search in draw()
 * @param {boolean} allowedInPreload Whether or not to search in preload()
 * @returns {boolean} True if the setting function is called, false otherwise.
 */
export function testSettingIsCalled(setting, allowedInSetup = true, allowedInDraw = true, allowedInPreload = false) {
    if (!window.hasOwnProperty("setup")) {
        return false;
    }
    // reg ex matches have an index
    const setupContents = window.hasOwnProperty("setup") ? getFunctionContents(setup).join("\n") : "";
    const drawContents = window.hasOwnProperty("draw") ? getFunctionContents(draw).join("\n") : "";
    const allContents = `${allowedInSetup ? setupContents : ''}${allowedInDraw ? drawContents : ''}`;
    // create a reg ex that will find all shapes, make the shape checkers more efficient
    const settingMatches = [...allContents.matchAll(setting)];
    if (allowedInPreload && canvasStatus.preloadContents !== "") {
        const preloadContents = canvasStatus.preloadContents.join("\n");
        settingMatches.push(...preloadContents.matchAll(setting));
    }
    return settingMatches.length > 0;
}

/**
 * Uses a regular expression to determine if the given setting function has been called before any shapes are drawn
 * @param {RegExp} setting The regular expression representing the setting function
 * @param {boolean} allowedInSetup 
 * @param {boolean} allowedInDraw 
 * @returns {boolean}
 */
export function testSettingCalledBeforeShapes(setting, allowedInSetup = true, allowedInDraw = true) {
    const setupContents = window.hasOwnProperty("setup") ? getFunctionContents(setup).join("\n") : "";
    const drawContents = window.hasOwnProperty("draw") ? getFunctionContents(draw).join("\n") : "";
    const allContents = `${allowedInSetup ? setupContents : ''}${allowedInDraw ? drawContents : ''}`;
    const settingMatches = [...allContents.matchAll(setting)];
    const shapeMatches = [...allContents.matchAll(ANY_SHAPE)];
    return shapeMatches.length === 0 || shapeMatches[0].index > settingMatches[0].index;
}

/**
 * Checks that given setting function (e.g. noStroke, fill, rectMode) is called before any
 * shapes are called.
 * @param {RegExp} setting The regular expression representing the setting function
 * @param {boolean} allowedInSetup Whether the setting function can be called in setup
 * @param {boolean} allowedInDraw Whether the setting function can be called in draw
 */
export function checkSettingCalledBeforeShapes(setting, allowedInSetup = true, allowedInDraw = true) {
    // reg ex matches have an index
    const settingStr = setting.toString().slice(0, setting.toString().length - 2).replace("/", "").replace("\\", "");
    try {
        const settingFound = testSettingIsCalled(setting, allowedInSetup, allowedInDraw);
        if (!settingFound) {
            TestResults.addFail(`The <code>${settingStr})</code> function should be called before drawing any shapes. <code>${settingStr})</code> is not called.`);
        } else {
            const calledBeforeShapes = testSettingCalledBeforeShapes(setting, allowedInSetup, allowedInDraw);
            if (calledBeforeShapes) {
                TestResults.addPass(`The <code>${settingStr})</code> function is called before drawing any shapes.`);
            } else {
                TestResults.addFail(`The <code>${settingStr})</code> function should be called before drawing any shapes. <code>${settingStr})</code> is called after drawing at least one shape.`);
            }
        }
    } catch (e) {
        TestResults.addFail(`Unable to test if ${settingStr} was called. This can happen if <code>setup()</code> or <code>draw()</code> is missing.`);
    }
}

/**
 * Gets shapes (ellipses, rectangles, and lines) drawn on the canvas. This will get the shapes
 * that are actually drawn after background() in the current frame.
 * 
 * It should be able to handle shapes created with different draw modes.
 * It does NOT currently handle the triangle() function or PShape.
 * @returns {TestShape[]} An array of shape objects in order.
 */
export function getShapes() {
    return canvasStatus.shapes;
}

/**
 * Checks that the shapes drawn on the canvas match the expected shapes. For use with problems that have 
 * only one potential solution. The feedback will not contain detailed information. To provide more detail,
 * use detailedCheckShapes.
 * @param {TestShape[]} expected An array containing the expected shapes, including colour and position information
 * @param {TestShape[]} actual An array containing the shapes in the student's sketch.
 * @param {boolean} orderMatters Whether of not the order that the shapes are drawn in matters to the test.
 * @param {boolean} colourMatters Whether or not the colour (stroke, fill) of shapes should be taken into account
 */
export function checkShapes(expected, actual, orderMatters, colourMatters) {
    let incorrect = `Expected ${expected.length} shape(s)`;
    if (actual.length !== expected.length) {
        TestResults.addFail(`${incorrect}. Your sketch contains ${actual.length} shapes.`);
    }
    else if (orderMatters) {
        checkShapesInOrder(expected, actual, colourMatters);
    }
    else {
        checkShapesWithoutOrder(expected, actual, colourMatters);
    }
}

/**
 * Checks that two specific shapes appear in the expected order. 
 * @param {TestShape} expectedFirst The shape that should be drawn first
 * @param {TestShape} expectedSecond The shape that should be drawn second
 * @param {TestShape[]} actual All actual shapes drawn
 * @param {boolean} fillMatters Whether or not the fill colour matters
 */
export function checkOrderedPairOfShapes(expectedFirst, expectedSecond, actual, fillMatters) {
    let firstShape = -1;
    let secondShape = -1;
    for (const i in actual) {
        if (actual[i].isEqualTo(expectedFirst, true)) {
            if (!fillMatters || fillsMatch(expectedFirst, actual[i])) {
                firstShape = i;
            }
        }
        if (actual[i].isEqualTo(expectedSecond, true)) {
            if (!fillMatters || fillsMatch(expectedSecond, actual[i])) {
                secondShape = i;
            }
        }
    }
    if (firstShape > -1 && firstShape < secondShape) {
        TestResults.addPass(`The ${expectedFirst.type} at ${expectedFirst.x}, ${expectedFirst.y}${expectedFirst.type === SQUARE || expectedFirst.type === RECT || expectedFirst.type === CIRCLE || expectedFirst.type === ELLIPSE ? " (" + expectedFirst.drawMode + " mode)" : ""} is drawn before the ${expectedSecond.type} at ${expectedSecond.x}, ${expectedSecond.y}${expectedSecond.type === SQUARE || expectedSecond.type === RECT || expectedSecond.type === CIRCLE || expectedSecond.type === ELLIPSE ? " (" + expectedSecond.drawMode + " mode)" : ""}.`);
    } else if (secondShape > -1 && firstShape > secondShape) {
        TestResults.addFail(`The following shapes are drawn in reverse order: the ${expectedFirst.type} at ${expectedFirst.x}, ${expectedFirst.y}${expectedFirst.type === SQUARE || expectedFirst.type === RECT || expectedFirst.type === CIRCLE || expectedFirst.type === ELLIPSE ? " (" + expectedFirst.drawMode + " mode)" : ""} and the ${expectedSecond.type} at ${expectedSecond.x}, ${expectedSecond.y}${expectedSecond.type === SQUARE || expectedSecond.type === RECT || expectedSecond.type === CIRCLE || expectedSecond.type === ELLIPSE ? " (" + expectedSecond.drawMode + " mode)" : ""}.`);
    } else {
        if (firstShape === -1) {
            TestResults.addFail(`The following shape is missing: the ${expectedFirst.type} at ${expectedFirst.x}, ${expectedFirst.y}${expectedFirst.type === SQUARE || expectedFirst.type === RECT || expectedFirst.type === CIRCLE || expectedFirst.type === ELLIPSE ? " (" + expectedFirst.drawMode + " mode)" : ""}.`);
        }
        if (secondShape === -1) {
            TestResults.addFail(`The following shape is missing: the ${expectedSecond.type} at ${expectedSecond.x}, ${expectedSecond.y}${expectedSecond.type === SQUARE || expectedSecond.type === RECT || expectedSecond.type === CIRCLE || expectedSecond.type === ELLIPSE ? " (" + expectedSecond.drawMode + " mode)" : ""}.`);
        }
    }
}

function fillsMatch(shape, other) {
    return shape.hasFill === other.hasFill && (!shape.hasFill || coloursMatch(shape.fillColour, other.fillColour));
}

/**
 * Checks that the shapes drawn on the canvas match the expected shapes. For use with problems that have 
 * only one potential solution.
 * @param {TestShape[][]} allSolutions An array of arrays. Each nested array containing the expected shapes for one possible solution, including colour and position information
 * @param {Color[]} requiredBackgrounds An array of colour objects representing the expected background colour, which should be drawn before the shapes. If no particular background colour is required for a given solution, the element should be null.
 * @param {TestShape[]} actual An array containing the shapes in the student's sketch.
 * @param {boolean} orderMatters Whether of not the order that the shapes are drawn in matters to the test.
 * @param {boolean} colourMatters Whether or not the colour (stroke, fill) of shapes should be taken into account
 */
export function checkShapesWithMultipleSolutions(allSolutions, requiredBackgrounds, actual, orderMatters, colourMatters) {
    let matchFound = false;
    for (let s in allSolutions) {
        matchFound = orderMatters ? testShapesMatchInOrder(allSolutions[s], actual, colourMatters) : testShapesMatchWithoutOrder(allSolutions[s], actual, colourMatters);
        if (matchFound) {
            TestResults.addPass("All shapes match.");
            if (requiredBackgrounds[s] !== null) {
                const lastBackgroundCall = getLastBackgroundCallBeforeShapes();
                if (lastBackgroundCall === null) {
                    TestResults.addFail("A background colour must be set to create the expected output with the shapes you have used. If the sketch is supposed to have a white background but you haven't called <code>background()</code>, try explicitly setting the background to white. The default background is transparent, which will appear white against a white page, but the pixels won't match a sketch created with a white background.");
                } else {
                    const colourArgs = getArgString(lastBackgroundCall);
                    const backgroundColour = convertArgStringToColor(colourArgs);
                    if (coloursMatch(requiredBackgrounds[s], backgroundColour)) {
                        TestResults.addPass("The background colour has been set to the expected colour.");
                    } else {
                        TestResults.addFail("The background colour has been set, but it is not the expected colour.");
                    }
                }
            }
            break;
        }
    }
    if (!matchFound) {
        TestResults.addFail(`The expected output can be created in at least ${allSolutions.length} different ways. Your shapes don't match any of the known approaches. This could be due to the type of the shapes, their positions, or their dimensions.${orderMatters ? " The order of the shapes are draw in matters for this exercise so check if your shape functions are called in an appropriate order." : ""}${colourMatters ? " The colour(s) of the shapes matters in this exercise so check that your shapes have the expected fill and stroke.": ""}`);
    }
}

/**
 * Helper function for the checkShapesInOrder function. Checks that the shapes drawn on the canvas match the expected shapes and are drawn in the same order.
 * @param {TestShape[]} expected An array containing the expected shapes, including colour and position information
 * @param {TestShape[]} actual An array containing the shapes in the student's sketch.
 * @param {boolean} colourMatters Whether or not the colour (stroke, fill) of shapes should be taken into account 
 * @returns {boolean}
 */
export function testShapesMatchInOrder(expected, actual, colourMatters) {
    if (expected.length !== actual.length) return false;
    for (const i in expected) {
        if (!expected[i].isEqualTo(actual[i], !colourMatters)) return false;
    }
    return true;
}

/**
 * Checks that the shapes drawn on the canvas match the expected shapes and are drawn in the same order, and adds feedback.
 * @param {TestShape[]} expected An array containing the expected shapes, including colour and position information
 * @param {TestShape[]} actual An array containing the shapes in the student's sketch.
 * @param {boolean} colourMatters Whether or not the colour (stroke, fill) of shapes should be taken into account
 */
function checkShapesInOrder(expected, actual, colourMatters) {
    if (testShapesMatchInOrder(expected, actual, colourMatters)) {
        TestResults.addPass("All expected shapes are drawn on the canvas.");
    } else {
        TestResults.addFail(`At least one of your shapes does not match. This could mean a shape is missing, is the wrong type of shape, is in the wrong place, has the wrong dimensions, or possibly even the wrong colour.`);
    }
}

/**
 * Helper function for checkShapesWithoutOrder. Checks that the shapes drawn on the canvas match the expected shapes, regardless of the draw order.
 * @param {TestShape[]} expected An array containing the expected shapes, including colour and position information
 * @param {TestShape[]} actual An array containing the shapes in the student's sketch.
 * @param {boolean} colourMatters Whether or not the colour (stroke, fill) of shapes should be taken into account
 * @returns {boolean}
 */
export function testShapesMatchWithoutOrder(expected, actual, colourMatters) {
    if (expected.length !== actual.length) return false;
    const eSet = new Set(expected);
    const aSet = new Set(actual);
    for (const e of eSet) {
        for (const a of aSet) {
            if (a.isEqualTo(e, !colourMatters)) {
                aSet.delete(a);
                break;
            }
        }
    }
    if (aSet.size === 0) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Checks that the shapes drawn on the canvas match the expected shapes, regardless of the draw order. Adds feedback.
 * @param {TestShape[]} expected An array containing the expected shapes, including colour and position information
 * @param {TestShape[]} actual An array containing the shapes in the student's sketch.
 * @param {boolean} colourMatters Whether or not the colour (stroke, fill) of shapes should be taken into account
 */
function checkShapesWithoutOrder(expected, actual, colourMatters) {
    if (testShapesMatchWithoutOrder(expected, actual, colourMatters)) {
        TestResults.addPass("All expected shapes are drawn on the canvas.");
    }
    else {
        TestResults.addFail(`At least one of your shapes does not match. This could mean a shape is missing, is the wrong type of shape, is in the wrong place, has the wrong dimensions, or possibly even the wrong colour. If your shapes appear identical to the expected output, check the stroke.`);
    }
}

/**
 * Checks that all rects / squares drawn on the canvas were drawn in the expected mode.
 * @param {string} mode The draw mode
 * @param {TestShape[]} actual An array containing the shapes in the student's sketch.
 */
export function checkAllRectsHaveMode(mode, actual) {
    const rects = actual.filter(shape => shape.type === RECT || shape.type === SQUARE);
    if (rects.length === 0) {
        TestResults.addFail(`Unable to check if rectangles / squares are drawn in ${mode} mode because no rectangles / squares were found.`);
    } else {
        let modeFound = true;
        for (const rect of rects) {
            if (rect.drawMode !== mode) {
                modeFound = false;
                break;
            }
        }
        if (modeFound) {
            TestResults.addPass(`All rectangles / squares are drawn in ${mode} mode.`);
        } else {
            TestResults.addFail(`At least one rectangle / square is not drawn in ${mode} mode. Make sure that <code>rectMode()</code> is called before the shapes are drawn.`);
        }
    }
}

/**
 * Tests if the given shape is present.
 * @param {TestShape} testShape The shape to look for
 * @param {boolean} ignoreColour 
 * @returns {boolean}
 */
export function testHasShape(testShape, ignoreColour = false) {
    const actual = getShapes();
    for (const s of actual) {
        if (testShape.isEqualTo(s, ignoreColour)) {
            return true;
        }
    }
    return false;
}

/**
 * Checks if a particular class has been defined (constructor is required).
 * @param {string} className The class to look for e.g. String
 * @returns {boolean}
 */
export function testClassIsDefined(className) {
    return eval(`typeof ${className}`) === "function" && eval(`${className}.prototype.hasOwnProperty("constructor")`);
}


/**
 * Checks if a class (childClassName) has a particular parent in its prototype chain. 
 * This method does not test if the child class has been defined, so that should be checked 
 * before calling this function, otherwise an error may be thrown.
 * @param {string} childClassName The name of the class to test
 * @param {string} parentClassName The name of the parent class (can be any parent, not just the immediate parent)
 * @returns {boolean}
 */
export function testClassExtends(childClassName, parentClassName) {
    return eval(`${childClassName}.prototype instanceof ${parentClassName}`);
}


/**
 * Checks if the given class constructor takes the expected number of arguments.
 * @param {Object} className The class to test
 * @param {number} numExpected 
 * @returns {boolean}
 */
export function testExpectedClassConstructorArgs(className, numExpected) {
    return className.length === numExpected;
}

/**
 * Checks if the given class has a method of the given name.
 * @param {Object} className 
 * @param {string} methodName 
 * @returns {boolean}
 */
export function testClassMethodIsDefined(className, methodName) {
    return className.prototype.hasOwnProperty(methodName) && typeof className.prototype[methodName] === "function";
}

/**
 * Checks if the given method takes the expected number of arguments.
 * @param {Object} className The class to test
 * @param {string} methodName
 * @param {number} numExpected 
 * @returns {boolean}
 */
export function testExpectedClassMethodArgs(className, methodName, numExpected) {
    return testClassMethodIsDefined(className, methodName) && className.prototype[methodName].length === numExpected;
}

/**
 * Checks if a global variable with the given name exists
 * @param {string} variableName 
 * @returns {boolean} True if the variable exists, false otherwise.
 */
export function globalVariableExists(variableName) {
    try {
        eval(variableName);
        return true;
    } catch (e) {
        return false;
    }
}