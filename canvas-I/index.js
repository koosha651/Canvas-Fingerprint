addEventListener("load", (event) => { });

onload = (event) => {

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  // https://www.browserleaks.com/canvas#how-does-it-work

  canvas.width = 200; 
  canvas.height = 200;
  var txt = 'CANVAS_FINGERPRINT';
  ctx.textBaseline = "top";
  ctx.font = "9px 'Arial'";


  // Add a reference pixel
  ctx.fillStyle = 'rgba(150, 150, 150, 1)';
  ctx.fillRect(0, 0, canvas.height, canvas.width);
  ctx.fillStyle = 'rgba(120, 15, 50, 1)';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = 'rgba(10, 220, 50, 1)';
  ctx.fillRect(50, 150, 62, 20);

  document.body.appendChild(canvas);

  // After noisify()
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var refPixel = { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] };  
  
 
  // Calculate the difference
  var diff = { r: 150 - refPixel.r, g: 150 - refPixel.g, b: 150 - refPixel.b };
  console.log(diff);  // using it for debugging 
  let values = "";

  // Apply the inverse difference to RGB pixels
  for (let i = 0; i < imageData.data.length; i += 4) {  
    values += (imageData.data[i] + diff.r);
    values += (imageData.data[i + 1] + diff.g);
    values += (imageData.data[i + 2] + diff.b);
  }

  console.log(values);

  var hash = 0, i, chr;
  for (i = 0; i < values.length; i++) {
    chr = values.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  document.getElementById('withCanvasDrawing').innerHTML = hash;
};



