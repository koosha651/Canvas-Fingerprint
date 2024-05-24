// Create a new canvas element
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

// Set the size of the canvas
canvas.width = 200; // Set the width of the canvas
canvas.height = 50; // Set the height of the canvas

// Drawing code
var txt = 'CANVAS_FINGERPRINT';
ctx.textBaseline = "top";
ctx.font = "14px 'Arial'";
ctx.fillStyle = "#f60";
ctx.fillRect(125, 1, 62, 20);
ctx.fillStyle = "#069";
ctx.fillText(txt, 2, 15);
ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
ctx.fillText(txt, 4, 17);

ctx.fillStyle = 'rgba(150, 150, 150, 1)'; // Using 1 for full opacity
ctx.fillRect(0, 0, 1, 1); // Draws a 1x1 pixel at the top-left corner of the canvas


// Append the canvas element to the document's body
// You can change `document.body` to another element if you want to place it elsewhere
document.body.appendChild(canvas);
