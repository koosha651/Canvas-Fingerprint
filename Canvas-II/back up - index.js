addEventListener("load", (event) => { });

onload = (event) => {
    // var result = [];
    // Very simple now, need to make it more complex (geo shapes etc)
    var canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 200;
    // canvas.style.display = "inline";
    var ctx = canvas.getContext("2d");
    // detect browser support of canvas winding
   
    // ctx.rect(0, 0, 10, 10);
    // ctx.rect(2, 2, 6, 6);
    // result.push("canvas winding:" + ((ctx.isPointInPath(5, 5, "evenodd") === false) ? "yes" : "no"));

    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";

    // if(this.options.dontUseFakeFontInCanvas) {        //choos fake or real
    //   ctx.font = "11pt Arial";
    // } else {
    //   ctx.font = "11pt no-real-font-123";
    // }

    ctx.font = "11pt Arial";
    // ctx.font = "11pt no-real-font-123";

    ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
    ctx.font = "18pt Arial";
    ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);

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

    // result.push("canvas fp:" + canvas.toDataURL());
    // return result.join("~");

    document.body.appendChild(canvas); // or another element of your choice

    var dataURL = canvas.toDataURL();
    document.getElementById("withCanvasDrawing").textContent = dataURL;
};
