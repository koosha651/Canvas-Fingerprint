addEventListener("load", (event) => { });

onload = async (event) => {
    
    console.log('toBlob proxy applied 1');
    var canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    // canvas.style.display = "inline";
    var ctx = canvas.getContext("2d");
    // detect browser support of canvas winding


    // Colored Rectangles
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    // ctx.fillRect(425, 1, 62, 20);
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = "#069";

    // ctx.font = "11pt Arial";
    ctx.font = "11pt no-real-font-123";

    ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
    ctx.font = "18pt Arial";
    ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);

    // canvas blending

    // ctx.globalCompositeOperation = "multiply";

    // ctx.fillStyle = "rgb(255,0,255)";
    // ctx.beginPath();
    // ctx.arc(50, 350, 50, 0, Math.PI * 2, true);
    // // ctx.closePath();
    // ctx.fill();
    // ctx.fillStyle = "rgb(0,255,255)";
    // // ctx.beginPath();
    // ctx.arc(160, 350, 50, 0, Math.PI * 2, true);
    // // ctx.closePath();
    // ctx.fill();
    // ctx.fillStyle = "rgb(255,255,0)";
    // // ctx.beginPath();
    // ctx.arc(275, 350, 50, 0, Math.PI * 2, true);
    // // ctx.closePath();
    // ctx.fill();
    // ctx.fillStyle = "rgb(255,0,255)";

    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.arc(50, 350, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(0,255,255)";
    ctx.beginPath();
    ctx.arc(160, 350, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.beginPath();
    ctx.arc(275, 350, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(255,0,255)";

    // canvas winding
  
    // ctx.arc(55, 75, 75, 0, Math.PI * 2, true);
    // ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
    // ctx.fill("evenodd");
  


    document.body.appendChild(canvas);

    console.log('toBlob proxy applied 2');

    var dataURL = canvas.toDataURL();

    console.log('toBlob proxy applied 3');

  

    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(dataURL));

    // Take the first 16 bytes of the hash
    const hashArray = new Uint8Array(hashBuffer.slice(0, 16)); 

    // Convert bytes to hex string
    const hashHex = Array.from(hashArray).map(b => b.toString(16).padStart(2, '0')).join('');

    // Display the hash
    document.getElementById('withCanvasDrawing').innerHTML = hashHex;

    };
