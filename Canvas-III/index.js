addEventListener("load", (event) => { });


onload = async (event) => {
    console.log('toBlob proxy applied 1');
    
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    // Drawing operations
   
    ctx.fillStyle = 'rgba(150, 150, 150, 1)';    
    // ctx.fillStyle = 'rgba(20, 20, 20, 1)';    

    ctx.fillRect(0, 0, 1, 1);
    // ctx.fillRect(10, 10, 1, 1);
    // ctx.fillRect(0, 0, canvas.height, canvas.width);
   
    ctx.fillStyle = 'rgba(120, 15, 50, 1)';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = 'rgba(10, 220, 50, 1)';
    ctx.fillRect(50, 150, 62, 20);

    // ctx.textBaseline = "alphabetic";  // affects lines : 18, 22
    // ctx.font = "11pt no-real-font-123"; // affects lines : 18 
    // ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 35);

    // ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
    // ctx.font = "18pt Arial";
    // ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 75);

    document.body.appendChild(canvas);

    // After the extension manipulated

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var refPixel = { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] };  
    console.log("reference pixel RGB value",refPixel);


    // var refPixel2 = { r: imageData.data[100], g: imageData.data[101], b: imageData.data[102] };  
    // console.log("reference 2 pixel RGB value",refPixel2);

    // Calculate the difference

    // var diff = { r: 150 - refPixel.r, g: 150 - refPixel.g, b: 150 - refPixel.b };
    var diff = { r: refPixel.r - 150, g:refPixel.g - 150, b: refPixel.b - 150 };
    console.log("amount of difference",diff);  // using it for debugging 

    values=""
    // 116 15 55
    for (let i = 0; i < imageData.data.length; i += 4) {  
        values += (imageData.data[i] - diff.r);
        values += (imageData.data[i + 1] - diff.g);
        values += (imageData.data[i + 2] - diff.b);
      }

      console.log(values);

    const buffer = new Uint8Array(imageData.data.buffer);

    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    // Take the first 16 bytes of the hash
    const hashArray = new Uint8Array(hashBuffer.slice(0, 16));

    // Convert bytes to hex string
    const hashHex = Array.from(hashArray).map(b => b.toString(16).padStart(2, '0')).join('');

    // Display the hash
    document.getElementById('withCanvasDrawing').innerHTML = hashHex;
    console.log('Hash displayed:', hashHex);
};
