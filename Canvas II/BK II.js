addEventListener("load", (event) => { });

onload = async (event) => {

    var canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 200;
    // canvas.style.display = "inline";
    var ctx = canvas.getContext("2d");
    // detect browser support of canvas winding

    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";

    ctx.font = "11pt Arial";
    // ctx.font = "11pt no-real-font-123";

    // ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
    // ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
    // ctx.font = "18pt Arial";
    // ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);

    // canvas blending

    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(0,255,255)";
    ctx.beginPath();
    ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.beginPath();
    ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(255,0,255)";
    // canvas winding

    ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
    ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
    ctx.fill("evenodd");

    document.body.appendChild(canvas);
    var dataURL = canvas.toDataURL();

    // document.getElementById("withCanvasDrawing").textContent = dataURL;

    const hashBuffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(dataURL));

    // Convert the first 4 bytes of the SHA-256 hash to a 32bit integer
    const hashArray = new Uint8Array(hashBuffer.slice(0, 4)); // Get only the first 4 bytes
    var hash = 0;
    for (var i = 0; i < hashArray.length; i++) {
        hash = (hash << 8) | hashArray[i];
    }

        // Set the hash value as HTML inside the 'withCanvasDrawing' element
        document.getElementById('withCanvasDrawing').innerHTML = hash;

    };
