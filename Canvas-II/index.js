onload = async (event) => {
    console.log('toBlob proxy applied 1');

    // Ensure the port element exists and set the data-mode attribute
    let port = document.getElementById('cc-blck-fp');
    if (!port) {
        port = document.createElement('div');
        port.id = 'cc-blck-fp';
        document.documentElement.appendChild(port);
    }
    port.dataset.mode = 'random'; // Set data-mode to 'random' or 'session'
    
    // Rest of your code follows...
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    // Drawing operations
    ctx.fillStyle = 'rgba(150, 150, 150, 1)';
    ctx.fillRect(10, 10, 1, 1);
   
    ctx.fillStyle = 'rgba(120, 15, 50, 1)';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = 'rgba(10, 220, 50, 1)';
    ctx.fillRect(50, 150, 62, 20);

    document.body.appendChild(canvas);

    // ////////////////////////////////////////////////////////////////////////////
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var refPixel = { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] };  
    
    // Calculate the difference
    var diff = { r: 150 - refPixel.r, g: 150 - refPixel.g, b: 150 - refPixel.b };
    console.log(diff);  // using it for debugging 

    let values = "";

    for (let i = 0; i < imageData.data.length; i += 4) {  
        values += (imageData.data[i] + diff.r);
        values += (imageData.data[i + 1] + diff.g);
        values += (imageData.data[i + 2] + diff.b);
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
